import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";

export async function createUserService(data: any) {
    const {username, email, password, tenantId} = data;

    const existingUser =  await prisma.user.findUnique({
        where: { username }
    });
    if (existingUser) {
        throw new Error("Nome de usuário já está em uso.");
    }

    const existingEmail =  await prisma.user.findUnique({
        where: { email }
    });
    if (existingEmail) {
        throw new Error("Email já está em uso.");
    }
    
    const tenantExists =  await prisma.user.findUnique({
        where: { id: tenantId }
    });
    if (tenantExists) {
        throw new Error("Tenant informado não existe.");
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    return await prisma.user.create({
        data: {
            name: data.name,
            username,
            password: hashPassword,
            email,
            tenantId,
        }
    })
}