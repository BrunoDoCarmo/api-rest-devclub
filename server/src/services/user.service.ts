// services/user.service.ts
import bcrypt from "bcryptjs";
import type { CreateUserModel } from "../models/user/create-user.model";
import { UserRepository } from "../repositories/user.repository";
import { generateEmailToken } from "../utils/email-token";
import { mailer } from "../lib/mail";
import { prisma } from "../lib/prisma";

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
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(data.password, salt);

    const { token, tokenHash } = generateEmailToken();

    const tenant = await prisma.tenant.findUnique({
      where: { id: tenantId },
      select: { name: true }
    });

    const tenantName = tenant?.name || "Nossa Plataforma";

    const newUser = await prisma.$transaction(async (tx) => {
      const user = await this.userRepository.create(
        {...data, password: hashPassword},
        tenantId,
        responsibleId
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

    // 3. Envia o e-mail (fora da transação para não travar o banco se o provedor de e-mail demorar)
    const verificationLink = `${process.env.APP_URL}/verify-email?token=${token}&type=user`;

    await mailer.sendMail({
      from: `"Equipe do Sistema" <${process.env.MAIL_FROM}>`,
      to: newUser.email,
      subject: "Convite para a Plataforma",
      html: `
        <div style="font-family: sans-serif; color: #333;">
          <h2>Olá, ${newUser.name}!</h2>
          <p>Você foi convidado para participar do sistema da empresa <strong>${tenantName}</strong>.</p>
          <p>Para confirmar seu acesso e ativar sua conta, clique no botão abaixo:</p>
          <a href="${verificationLink}" 
            style="background-color: #4f46e5; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">
            Ativar minha conta
          </a>
        </div>
      `
    });

    await prisma.$transaction([
      // 1. Marca o usuário como verificado
      prisma.user.update({
        where: { id: newUser.id },
        data: { emailVerified: true }
      }),
      // 2. Cria a notificação para a empresa
      prisma.notificationEmail.create({
        data: {
          tenantId: newUser.tenantId,
          content: `O usuário ${newUser.name} acabou de ativar a conta!`
        }
      })
    ]);
    
    return newUser;
  }
}