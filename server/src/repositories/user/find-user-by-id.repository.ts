import { prisma } from "../../lib/prisma";

export async function findUserByIdRepository(id: string) {
    return await prisma.user.findUnique({
        where: { id },
        select: {
            name: true,
        }
    })
}