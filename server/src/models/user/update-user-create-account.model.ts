import { z } from "zod";

export const updateUserCreateAccountModel = z.object({
  username: z.string(),
  password: z.string().min(8, "A senha deve de conter no minímo 8 caracteres")
});

export type UpdateUserCreateAccountModel = z.infer<typeof updateUserCreateAccountModel>;