import { prisma } from "../../lib/prisma";

export async function deleteUserRepository(id: string) {
    return await prisma.user.delete({
        where: { id }
    })
}