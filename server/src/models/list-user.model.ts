import { z } from "zod"

export const UserResponseModel = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    username: z.string(),
    state: z.enum(["ACTIVE", "INACTIVE", "PENDING"]),
})