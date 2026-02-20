import bcrypt from "bcryptjs";
import type { CreateUserModel } from "../models/user/create-user.model";
import { UserRepository } from "../repositories/user.repository";
import { generateEmailToken } from "../utils/email-token";
import { mailer } from "../lib/mail";
import { prisma } from "../lib/prisma";
import type { UpdateUserCreateAccountModel } from "../models/user/update-user-create-account.model";

export class UserService {
  private userRepository = new UserRepository();

  async listUsers(tenantId: string, page: number, limit: number) {
    const { data: users, meta: { total } } = await this.userRepository.findAllByTenant(tenantId, page, limit);
    
    return {
      data: users, 
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    };
  }

  async createUser(data: CreateUserModel, tenantId: string, responsibleId: string) {
    const tenant = await prisma.tenant.findUnique({
      where: { id: tenantId },
      select: { name: true }
    });

    if(!tenant) throw new Error("A empresa informada não existe")

    const { token, tokenHash } = generateEmailToken();

    const newUser = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create(
        {
          data: {
            name: data.name,
            email: data.email,
            role: data.role,
            tenantId: tenantId.trim(),
            responsibleId: responsibleId.trim(),
            emailVerified: false // Usuário começa como não verificado
          }
        },

      );

      // Cria o registro na tabela de verificação
      await tx.emailVerification.create({
        data: {
          email: user.email,
          tokenHash,
          type: "USER", // Tipo diferente para diferenciar do Responsible se necessário
          userId: user.id,
          expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24) // 24 horas
        }
      });

      return user;
    });

    const tenantName = tenant?.name || "Nossa Plataforma";
    const verificationLink = `${process.env.APP_URL}/verify-email?token=${token}&type=user&email=${newUser.email}&tenant=${tenantId}&responsible=${responsibleId}`;

    try {
      await mailer.sendMail({
        from: `"Equipe do Sistema" <${process.env.MAIL_FROM}>`,
        to: newUser.email,
        subject: "Convite para a Plataforma",
        html: `
          <div style="background-color: #f8fafc; padding: 40px 20px; font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
            <div style="max-width: 550px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); border: 1px solid #e2e8f0;">
              <div style="padding: 30px 40px 10px 40px; text-align: left;">
                <h1 style="color: #1e293b; font-size: 22px; font-weight: 700; margin: 0;">Olá, ${newUser.name}! 👋</h1>
              </div>
              <div style="padding: 0 40px 30px 40px;">
                <p style="color: #475569; font-size: 16px; line-height: 1.6;">
                  Temos o prazer de informar que você foi convidado para colaborar com a equipe da 
                  <strong style="color: #1e293b;">${tenantName}</strong> em nossa plataforma.
                </p>
                <p style="color: #475569; font-size: 16px; line-height: 1.6; margin-bottom: 30px;">
                  Para começar a explorar o sistema e configurar seu perfil, basta ativar sua conta clicando no botão abaixo:
                </p>
                <div style="text-align: center; margin: 35px 0;">
                  <a href="${verificationLink}" 
                    style="background-color: #00a63e; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; display: inline-block; box-shadow: 0 4px 10px rgba(79, 70, 229, 0.2);">
                    Ativar minha conta agora
                  </a>
                </div>
                <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 30px 0;">
                <p style="color: #94a3b8; font-size: 13px; line-height: 1.5;">
                  Se o botão acima não funcionar, copie e cole o link abaixo no seu navegador:
                  <br>
                  <span style="color: #00a63e; word-break: break-all;">${verificationLink}</span>
                </p>
              </div>
              <div style="background-color: #f1f5f9; padding: 20px 40px; text-align: center;">
                <p style="color: #64748b; font-size: 12px; margin: 0;">
                  Este convite foi enviado por <strong>${tenantName}</strong>. <br>
                  Se você não esperava este e-mail, pode ignorá-lo com segurança.
                </p>
              </div>
            </div>
          </div>
        `
      });
    } catch (mailError) {
      console.error("Erro ao enviar e-mail:", mailError)
    }
    
    return newUser;
  }

  async updateUserCreateAccount(data: UpdateUserCreateAccountModel, email: string) {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(data.password, salt);

    const result = await prisma.$transaction(async (tx) => {
      const currentUser = await tx.user.findUnique({
            where: { email },
            include: { 
                tenant: true,
                responsible: true // Certifique-se que a relação existe no seu schema.prisma
            }
        });

        if (!currentUser) throw new Error("Usuário não encontrado.");
      
      const updateUserAccount = await tx.user.update({
        where: {email: email},
        data: {
          username: data.username,
          password: hashPassword,
          emailVerified: true
        }
      });

      const emailVerification = await tx.emailVerification.update({
        where: {
          email: email,
          type: "USER"
        },
        data: {
          verified: true
        }
      });
      
      await tx.notificationEmail.create({
        data: {
          tenantId: updateUserAccount.tenantId,
          content: `O usuário ${updateUserAccount.name} acabou de ativar a conta!`
        }
      })

      return {
        user: updateUserAccount,
        responsibleEmail: currentUser.responsible?.email,
        tenantName: currentUser.tenant?.name || "Nossa Plataforma",
        verificationEmail: emailVerification?.verified || false
      }
    });

    try {
      await mailer.sendMail({
        from: `"Equipe do Sistema" <${process.env.MAIL_FROM}>`,
        to: result.responsibleEmail,
        subject: "Notificação: Novo usuário ativado",
        html: `
          <div style="background-color: #52525c; border-radius: 20px; padding: 20px; font-family: 'Segoe UI', Helvetica, Arial, sans-serif;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.05); border: 1px solid #eeeeee;">
              <div style="background-color: #00a63e; padding: 20px; text-align: center;">
                <span style="color: #ffffff; font-size: 14px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase;">Notificação do Sistema</span>
              </div>
              <div style="padding: 40px 30px; text-align: center;">
                <div style="font-size: 48px; margin-bottom: 20px;">🚀</div>
                <h2 style="color: #111827; margin: 0 0 16px 0; font-size: 24px; font-weight: 700;">Novo membro ativado!</h2>
                <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 0;">
                  O usuário <strong style="color: #111827; text-transform: uppercase;">${result.user.name}</strong> 
                  <br>
                  <span style="color: #9ca3af; font-size: 14px;">(${email})</span>
                </p>
                <div style="margin-top: 30px; padding: 20px; background-color: #f3f4f6; border-radius: 6px;">
                  <p style="margin: 0; color: #374151; font-size: 14px;">
                    O cadastro foi finalizado com sucesso e o acesso ao sistema da empresa já está liberado.
                  </p>
                </div>
              </div>
              <div style="padding: 20px; background-color: #fafafa; text-align: center; border-top: 1px solid #eeeeee;">
                <p style="color: #9ca3af; font-size: 12px; margin: 0;">
                  Este é um e-mail automático. Por favor, não responda.
                </p>
              </div>
            </div>
          </div>
        `
      });
    } catch(mailError) {
      console.error("Erro ao enviar notificação de email:", mailError)
    }

    return result.user;
  }
}