import z from "zod";

export const createResponsibleSchema = z.object({
    type: z.enum(["PHYSICAL", "LEGAL"]),
    name: z.string(),

    cpf: z.string().optional().nullable(),
    cnpj: z.string().optional().nullable(),

    public_place: z.string(),
    number: z.string(),
    neighborhood: z.string(),
    complement: z.string().optional().nullable(),

    cep: z.string(),
    city: z.string(),
    uf: z.string(),

    telephone1: z.string().optional().nullable(),
    telephone2: z.string().optional().nullable(),

    cell_phone1: z.string(),
    cell_phone2: z.string().optional().nullable(),

    email: z.string(),
    tenantId: z.string()
})

export type CreateResponsibleDTO = z.infer<typeof createResponsibleSchema>