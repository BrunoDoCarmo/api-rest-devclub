import { prisma } from '../lib/prisma';

export async function createTenantRepository(data: any) {
  return prisma.tenant.create({ data });
}

export async function findTenantById(id: string) {
  return prisma.tenant.findUnique({ where: { id } });
}
