import { prisma } from '../lib/prisma';

export class TenantResponsibleUserService {
  async create(tenant: any, responsible: any, user: any) {
    
    const cpf = responsible.cpf?.trim() || null;
    const cnpj = responsible.cnpj?.trim() || null;

    if (!cpf && !cnpj) {
      throw new Error('CPF ou CNPJ é obrigatório');
    }

    return prisma.$transaction(async (tx) => {
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

      const createUser = await tx.user.create({
        data: {
          name: user.name,
          email: user.email,
          username: user.username,
          password: user.password,
          role: "ADMIN",
          tenantId: createdTenant.id,
          responsibleId: createdResponsible.id
        }
      })
      
      return {
        tenant: createdTenant,
        responsible: createdResponsible,
        user: createUser,
      };
    });
  }
}
