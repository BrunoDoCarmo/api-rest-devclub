import { prisma } from "../lib/prisma";
import type { CreateMembershipsModel } from "../models/memberships/create-memberships.model";
import type { CreateUserModel } from "../models/user/create-user.model";
import type { UpdateUserCreateAccountModel } from "../models/user/update-user-create-account.model";

export class UserRepository {
    async create(dataUser: CreateUserModel, dataMemberships: CreateMembershipsModel, tenantId: string, userId: string) {
        const newUser = await prisma.$transaction(async (tx) => {
            const user = await tx.user.create({
                data: {
                    email: dataUser.email,
                }
            })
            const member = await tx.memberships.create({
                data: {
                    name: dataMemberships.name,
                    state: "ACTIVE",
                    tenantId: tenantId,
                    userId: user.id
                }
            })
            return {user, member}
        })
        return newUser
    }
    
    async updateAccountCreate(data: UpdateUserCreateAccountModel, email: string,) {
        return prisma.user.update({
            where: {
                email: email,
            },
            data: {
                username: data.username,
                password: data.password
            }
        })
    }
    
    async findAllByTenant(tenantId: string, page: number = 1, limit: number = 20) {
        const skip = (page - 1 ) * limit;

        const [total, users] = await Promise.all([
            prisma.memberships.count({ where: { tenantId } }),
            prisma.memberships.findMany({
                where: { tenantId },
                include: {
                    user: {
                        select: {
                            id: true,
                            username: true,
                            email: true,
                        },
                    }
                },
                orderBy: {
                    name: "asc"
                },
                skip,
                take: limit
            })
        ]);

        return {
            data: users,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit)
            }
        };
    }
}