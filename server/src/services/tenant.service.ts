import { createTenantRepository } from '../repositories/tenant.repository';

export async function createTenantService(data: any) {
  return createTenantRepository(data);
}
