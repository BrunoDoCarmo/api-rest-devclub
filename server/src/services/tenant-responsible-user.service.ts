import bcrypt from "bcryptjs";
import { prisma } from '../lib/prisma';
import { signAccessToken, signRefreshToken } from "../utils/jwt";

export class TenantResponsibleUserService {
  async create(tenant: any, responsible: any, user: any) {
    
    const cpf = responsible.cpf ? responsible.cpf.replace(/\D/g, "") : null;
    const cnpj = responsible.cnpj ? responsible.cnpj.replace(/\D/g, "") : null;

    if (!cpf && !cnpj) {
      throw new Error('CPF ou CNPJ é obrigatório');
    }

    return prisma.$transaction(async (tx) => {
      // 1️⃣ Verifica se email já existe
      const existingResponsibleEmail = await tx.responsible.findFirst({
        where: { email: responsible.email },
      });

      if (existingResponsibleEmail) {
        throw new Error("Email do responsável já cadastrado");
      }

      if (cpf) {
        const existingCpf = await tx.responsible.findUnique({
          where: { cpf },
        });

        if (existingCpf) {
          throw new Error("CPF já cadastrado");
        }
      }

      if (cnpj) {
        const existingCnpj = await tx.responsible.findUnique({
          where: { cnpj },
        });

        if (existingCnpj) {
          throw new Error("CNPJ já cadastrado");
        }
      }

      const existingUserEmail = await tx.user.findUnique({
        where: { email: user.email },
      });

      if (existingUserEmail) {
        throw new Error("Email do usuário já cadastrado");
      }
      
      const existingUserUsername = await tx.user.findUnique({
        where: { username: user.username },
      });
      if (existingUserUsername) {
        throw new Error("Login já cadastrado");
      }

      const createdTenant = await tx.tenant.create({
        data: {
          type: tenant.type ?? "PHYSICAL",
          name: tenant.name,
          size: tenant.size ?? 'SMALL',
        },
      });

      const createdResponsible = await tx.responsible.create({
        data: {
          ...responsible,
          cpf,
          cnpj,
          tenantId: createdTenant.id,

          complement: responsible.complement ?? null,
          telephone1: responsible.telephone1 ?? null,
          telephone2: responsible.telephone2 ?? null,
          cell_phone2: responsible.cell_phone2 ?? null,
        },
      });
      
      
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(user.password, salt);

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
      
      // 6️⃣ LOGIN AUTOMÁTICO (JWT)
      const accessToken = signAccessToken({
        sub: createdUser.id,
        role: createdUser.role,
        tenantId: createdUser.tenantId,
      });

      const refreshToken = signRefreshToken({
        sub: createdUser.id,
      });

      // 7️⃣ Retorno final
      
      return {
        tenant: createdTenant,
        responsible: createdResponsible,
        user: createdUser,
        accessToken,
        refreshToken,
      };
    });
  }
}
