import z from "zod";

export const updateResponsibleSchema = z.object({
    type: z.enum(["PHYSICAL", "LEGAL"]).optional(),
    name: z.string().optional(),

    cpf: z.string().optional().nullable(),
    cnpj: z.string().optional().nullable(),

    public_place: z.string().optional(),
    number: z.string().optional(),
    neighborhood: z.string().optional(),
    complement: z.string().optional().nullable(),

    cep: z.string().optional(),
    city: z.string().optional(),
    uf: z.string().optional(),

    telephone1: z.string().optional().nullable(),
    telephone2: z.string().optional().nullable(),

    cell_phone1: z.string().optional(),
    cell_phone2: z.string().optional().nullable(),

    email: z.string().optional(),

    state: z.enum(["ACTIVE", "DISABLED", "DELETED"]).optional()
});

export type UpdateResponsibleDTO = z.infer<typeof updateResponsibleSchema>;