import z from "zod";

export const createResponsibleModel = z.object({
    name: z.string({
        error: "Nome do responsavel é obrigatório"
    }).min(2, "Nome deve ter ao menos 2 caracteres"),

    cpf: z.string().optional().nullable(),
    cnpj: z.string().optional().nullable(),

    public_place: z.string({
        error: "Logradouro do responsavel é obrigatório"
    }),
    number: z.string({
        error: "Número predial responsavel é obrigatório"
    }),
    neighborhood: z.string({
        error: "Bairro responsavel é obrigatório"
    }),
    complement: z.string().optional().nullable(),

    cep: z.string({
        error: "C.E.P responsavel é obrigatório"
    }),
    city: z.string({
        error: "Cidade responsavel é obrigatório"
    }),
    uf: z.string({
        error: "Estado responsavel é obrigatório"
    }).min(2, "Estado deve ter ao menos 2 caracteres"),

    telephone1: z.string().optional().nullable(),
    telephone2: z.string().optional().nullable(),

    cell_phone1: z.string({
        error: "Celular 1 responsavel é obrigatório"
    }),
    cell_phone2: z.string().optional().nullable(),

    email: z.string(),
})

export type CreateResponsibleModel = z.infer<typeof createResponsibleModel>