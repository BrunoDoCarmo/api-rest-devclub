import bcrypt from "bcryptjs";
import { prisma } from "../lib/prisma";
import { generateEmailToken } from "../utils/email-token";
import { mailer } from "../lib/mail";

export class TenantResponsibleUserService {
  async create(tenant: any, responsible: any, user: any) {
    
    const cpf = responsible.cpf ? responsible.cpf.replace(/\D/g, "") : null;
    const cnpj = responsible.cnpj ? responsible.cnpj.replace(/\D/g, "") : null;
    
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(user.password, salt);

    const { token, tokenHash } = generateEmailToken()

    const result = await prisma.$transaction(async (tx) => {
      // 🔎 Valida duplicidades
      if (await tx.responsible.findFirst({ where: { email: responsible.email } }))
        throw new Error("Email do responsável já cadastrado");

      if (cpf && await tx.responsible.findUnique({ where: { cpf } }))
        throw new Error("CPF do responsável já cadastrado");

      if (cnpj && await tx.responsible.findUnique({ where: { cnpj } }))
        throw new Error("CNPJ do responsável já cadastrado");

      if (await tx.user.findUnique({ where: { email: user.email } }))
        throw new Error("Email do usuário já cadastrado");

      if (await tx.user.findUnique({ where: { username: user.username } }))
        throw new Error("Login já cadastrado");

      const createdTenant = await tx.tenant.create({
        data: {
          type: tenant.type ?? "PHYSICAL",
          name: tenant.name,
          size: tenant.size ?? 'SMALL',
          cnpj: tenant.cnpj,
        },
      });

      const createdResponsible = await tx.responsible.create({
        data: {
          ...responsible,
          cpf,
          cnpj,
          tenantId: createdTenant.id,
        },
      });
            
      const createdUser = await tx.user.create({
        data: {
          name: user.name,
          email: user.email,
          username: user.username,
          password: hashPassword,
          role: "ADMIN",
          tenantId: createdTenant.id,
          responsibleId: createdResponsible.id
        }
      })
    
      await tx.emailVerification.create({
        data: {
          email: createdUser.email,
          tokenHash,
          type: "RESPONSIBLE",
          userId: createdUser.id,
          expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24)
        }
      })

      // 7️⃣ Retorno final
      return {
        createdTenant,
        createdResponsible,
        createdUser,
      };
    });

    const verificationLink = `${process.env.APP_URL}/verify-email?token=${token}&type=responsible`;
    await mailer.sendMail({
      from: `"Equipe do Sistema" <${process.env.MAIL_FROM}>`,
      to: result.createdUser.email,
      subject: "Confirme seu email",
      text: `
        CONFIRMAÇÃO DE CADASTRO

        Olá,

        Um cadastro foi realizado em nosso sistema utilizando este e-mail.

        Para confirmar seu acesso, copie e cole o link abaixo no navegador:

        ${verificationLink}

        Se você não realizou este cadastro, ignore este e-mail.

        Equipe do Sistema
      `,
      html: `
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f6f8;padding:20px;">
          <tr>
            <td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:8px;padding:24px;">
                <tr>
                  <td align="center" style="padding-bottom:16px;">
                    <h2 style="margin:0;color:#333;font-family:Arial,Helvetica,sans-serif;">
                      Confirmação de cadastro
                    </h2>
                  </td>
                </tr>
                <tr>
                  <td style="color:#555;font-size:15px;line-height:1.6;font-family:Arial,Helvetica,sans-serif;">
                    <p>Olá,</p>
                    <p>
                      Você está recebendo este e-mail porque um cadastro foi realizado
                      em nosso sistema utilizando este endereço de e-mail.
                    </p>
                    <p>
                      Para concluir seu acesso e confirmar seu e-mail, clique no botão abaixo:
                    </p>
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding:24px 0;">
                    <a href="${verificationLink}"
                      style="
                        background-color:#4f46e5;
                        color:#ffffff;
                        text-decoration:none;
                        padding:14px 28px;
                        border-radius:6px;
                        font-weight:bold;
                        font-family:Arial,Helvetica,sans-serif;
                        display:inline-block;
                      ">
                      Confirmar meu e-mail
                    </a>
                  </td>
                </tr>
                <tr>
                  <td style="color:#555;font-size:14px;line-height:1.6;font-family:Arial,Helvetica,sans-serif;">
                    <p>
                      Caso você não tenha realizado este cadastro, basta ignorar este e-mail.
                    </p>
                    <p style="margin-top:24px;">
                      Atenciosamente,<br />
                      <strong>Equipe do Sistema</strong>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="border-top:1px solid #eee;padding-top:16px;font-size:12px;color:#999;font-family:Arial,Helvetica,sans-serif;">
                    Este é um e-mail automático, por favor não responda.
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>  
      `
    });

    return {
      ...result,
    }
  }
}
