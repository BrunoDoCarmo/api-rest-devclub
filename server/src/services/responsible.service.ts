import { createResponsibleRepository } from '../repositories/responsible.repository';

export async function createResponsibleService(data: any) {
  return createResponsibleRepository(data);
}
