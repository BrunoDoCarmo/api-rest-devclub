import { z } from "zod";

export const createUserModel = z.object({
  name: z.string().min(2, "Nome do usuário é obrigatório"),
  email: z.email("Formato de e-mail inválido").min(1, "E-mail é obrigatório").trim(),
  username: z.string().optional(),
  password: z.string().min(8, "A senha deve de conter no minímo 8 caracteres").optional()

});

export type CreateUserModel = z.infer<typeof createUserModel>;