import { z } from 'zod';

export const createResponsibleSchema = z.object({
  type: z.enum(['PHYSICAL','LEGAL']),
  name: z.string().min(1),
  cpf: z.string().optional(),
  cnpj: z.string().optional(),
  public_place: z.string().min(1),
  number: z.string().min(1),
  neighborhood: z.string().min(1),
  complement: z.string().optional(),
  cep: z.string().min(1),
  city: z.string().min(1),
  uf: z.string().min(1),
  cell_phone1: z.string().min(1),
  email: z.string()
});
