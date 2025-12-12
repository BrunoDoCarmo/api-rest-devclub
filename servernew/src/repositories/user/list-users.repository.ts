import { prisma } from "../../lib/prisma";

export async function listUsersRepository() {
    return await prisma.user.findMany({
        omit: { password: true}
    })
}