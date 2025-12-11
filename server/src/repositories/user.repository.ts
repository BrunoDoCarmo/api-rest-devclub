import { prisma } from '../lib/prisma'

export async function createUserRepository(data: any) {
    return prisma.user.create({ data })
}

export async function findUserByEmail(email:string) {
    return prisma.user.findUnique({ where: { email }})    
}