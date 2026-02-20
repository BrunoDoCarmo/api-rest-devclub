import { prisma } from "../lib/prisma";
import type { CreateUserModel } from "../models/user/create-user.model";
import type { UpdateUserCreateAccountModel } from "../models/user/update-user-create-account.model";

export class UserRepository {
    async create(data: CreateUserModel, tenantId: string, responsibleId: string) {
        // 1. Limpeza rigorosa
        const tId = tenantId.trim();
        const rId = responsibleId.trim();

        // 2. Busca com findFirst (mais tolerante)
        const [ tenant, responsible] = await Promise.all([
            prisma.tenant.findFirst({ where: { id: tId } }),
            prisma.user.findFirst({ where: { id: rId } })

        ]) 

        if (!tenant) throw new Error("A empresa informada não existe.");
        if (!responsible) throw new Error("O responsável informado não existe.");

        return prisma.user.create({
            data: {
                ...data,
                tenantId: tId,
                responsibleId: rId,
            }
        })
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
            prisma.user.count({ where: { tenantId } }),
            prisma.user.findMany({
                where: { tenantId },
                select: {
                    id: true,
                    name: true,
                    username: true,
                    email: true,
                    state: true,
                    role: true,
                    emailVerified: true,
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