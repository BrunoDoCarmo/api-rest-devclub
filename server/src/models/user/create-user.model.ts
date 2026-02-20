import { z } from "zod";

const RoleEnum = ["ADMIN", "USER"] as const;

export const createUserModel = z.object({
  name: z.string().min(3, "Nome do usuário é obrigatório"),
  email: z.email("Formato de e-mail inválido").min(1, "E-mail é obrigatório").trim(),
  role: z.enum(RoleEnum).default("USER"),
});

export type CreateUserModel = z.infer<typeof createUserModel>;