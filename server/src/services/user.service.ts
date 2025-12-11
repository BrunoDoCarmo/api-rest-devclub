import bcrypt from 'bcryptjs'
import { createUserRepository, findUserByEmail } from "../repositories/user.repository"

export async function createUserService(data: any) {
    const existing = await findUserByEmail(data.email)
    if (existing) throw new Error('Email already in use')

    const hashed = await bcrypt.hash(data.password, 10)
    const user = await createUserRepository({ ...data, password: hashed })

    const { password, ...rest } = user as any
    return rest
}