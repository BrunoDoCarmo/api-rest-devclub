import type { State } from "../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";

export async function changeUserStateRepository(id: string, state: State) {
    return await prisma.user.update({
        where: { id },
        data: { state }
    });
}