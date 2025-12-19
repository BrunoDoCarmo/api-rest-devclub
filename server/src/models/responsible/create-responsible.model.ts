import z from "zod";
import { isValidCNPJ, isValidCPF } from "../../utils/document";

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

    email: z.email({
      message: "Formato de e-mail inválido"
    }).min(1, "E-mail é obrigatório"),
})
  .superRefine((data, ctx) => {
    const cpf = data.cpf?.replace(/\D/g, "") || null;
    const cnpj = data.cnpj?.replace(/\D/g, "") || null;

    if (!cpf && !cnpj) {
      ctx.addIssue({
        code: "custom",
        path: ["cpf"],
        message: "CPF ou CNPJ é obrigatório",
      });
    }

    if (cpf && cnpj) {
      ctx.addIssue({
        code: "custom",
        path: ["cpf"],
        message: "Informe apenas CPF ou apenas CNPJ",
      });
    }

    if (cpf && !isValidCPF(cpf)) {
      ctx.addIssue({
        code: "custom",
        path: ["cpf"],
        message: "CPF inválido",
      });
    }

    if (cnpj && !isValidCNPJ(cnpj)) {
      ctx.addIssue({
        code: "custom",
        path: ["cnpj"],
        message: "CNPJ inválido",
      });
    }
  });

export type CreateResponsibleModel = z.infer<typeof createResponsibleModel>