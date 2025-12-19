import { z } from "zod";

const RoleEnum = ["ADMIN", "USER"] as const;

export const createUserModel = z.object({
  name: z.string({
    error: "Nome do usuário é obrigatório",
  }),
  email: z.email({
    message: "Formato de e-mail inválido"
  }).min(1, "E-mail é obrigatório"),
  username: z.string({
    error: "Login do usuário é obrigatório",
  }),
  password: z.string({
    error: "Senha do usuário é obrigatório",
  }).min(6, "A senha deve de conter no minímo 6 caracteres"),
  role: z.enum(RoleEnum).default("USER"),
});

export type CreateUserModel = z.infer<typeof createUserModel>;