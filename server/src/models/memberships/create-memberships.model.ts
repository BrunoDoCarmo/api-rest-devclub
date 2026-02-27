import { z } from "zod";

const RoleEnum = ["ADMIN", "USER"] as const;

export const createMembershipsModel = z.object({
  name: z.string().min(2, "Nome do usuário é obrigatório"),
  role: z.enum(RoleEnum).default("USER"),
});

export type CreateMembershipsModel = z.infer<typeof createMembershipsModel>;