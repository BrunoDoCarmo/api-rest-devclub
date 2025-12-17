import { prisma } from '../lib/prisma';
import type { CreateTenantModel } from '../models/tenant/create-tenant.model';

export class TenantRepository {
  async create(data: CreateTenantModel) {
    return prisma.tenant.create({
      data: {
        type: data.type ?? 'PHYSICAL',
        name: data.name,
        size: data.size ?? 'SMALL',
      },
    });
  }
}
