import { prisma } from "../../lib/prisma";

export async function loginRepository(identifier: string) {
    return await prisma.user.findFirst({
        where: { 
            AND: [
                {
                    OR: [
                        {email: identifier},
                        {username: identifier},
                    ]
                },
                {state: "ACTIVE"},
            ]
        }
    })
}