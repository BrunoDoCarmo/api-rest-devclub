import { prisma } from '../lib/prisma';

export async function createResponsibleRepository(data: any) {
  return prisma.responsible.create({ data });
}

export async function findResponsibleById(id: string) {
  return prisma.responsible.findUnique({ where: { id } });
}
