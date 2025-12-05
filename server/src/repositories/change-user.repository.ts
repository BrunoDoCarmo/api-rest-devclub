import { prisma } from "../lib/prisma";
import type { changeUserParams } from "../interfaces/charge-user.interface";
import { mapToPrismaState } from "../mappers/user-state.mapper";

export async function changeUserRepository(id: string, data: changeUserParams) {
    return await prisma.user.update({
        where: { id },
        data: {
            ...data,
            state: mapToPrismaState(data.state),
        }
    })   
}