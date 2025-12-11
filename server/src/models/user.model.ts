import { z } from 'zod';

export const createUserSchema = z.object({
  name: z.string().min(1),
  username: z.string().min(3),
  email: z.string(),
  password: z.string().min(6),
  tenantId: z.string().uuid().optional()
});
