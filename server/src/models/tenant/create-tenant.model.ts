import { z } from "zod";

const SizeEnum = ["SMALL", "MEDIUM", "LARGE"] as const;

const typeEnum = ["PHYSICAL", "LEGAL"] as const

export const createTenantModel = z.object({
  type: z.enum(typeEnum).default("PHYSICAL"),
  name: z
    .string({
      error: "Nome do tenant é obrigatório",
    }).min(2, "Nome deve ter ao menos 2 caracteres"),

  size: z.enum(SizeEnum).optional(),
  cnpj: z
    .string({
      error: "CNPJ do tenant é obrigatório",
    })
});

export type CreateTenantModel = z.infer<typeof createTenantModel>;