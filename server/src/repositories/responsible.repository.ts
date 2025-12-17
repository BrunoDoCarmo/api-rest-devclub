import { prisma } from '../lib/prisma';
import type { CreateResponsibleModel } from '../models/responsible/create-responsible.model';

export class ResponsibleRepository {
  async create(data: CreateResponsibleModel & {tenantId: string}) {

    return prisma.responsible.create({
        data: {
          ...data,
          cpf: data.cpf ?? null,
          cnpj: data.cnpj ?? null,

          complement: data.complement ?? null,

          telephone1: data.telephone1 ?? null,
          telephone2: data.telephone2 ?? null,

          cell_phone2: data.cell_phone2 ?? null,
        }
    });
  }
}
