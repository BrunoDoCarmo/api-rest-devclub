import { prisma } from "../lib/prisma";
import type { CreateUserModel } from "../models/user/create-user.model";

export class UserRepository {
    async create(data: CreateUserModel, tenantId: string, responsibleId: string) {
        // 1. Limpeza rigorosa
        const tId = tenantId.trim();
        const rId = responsibleId.trim();

        // 2. Busca com findFirst (mais tolerante)
        const tenant = await prisma.tenant.findFirst({ where: { id: tId } });
        const responsible = await prisma.responsible.findFirst({ where: { id: rId } });

        console.log("Busca Tenant:", tenant ? "Encontrado" : "Nulo");
        console.log("Busca Responsible:", responsible ? "Encontrado" : "Nulo");

        if (!tenant) throw new Error("A empresa informada não existe.");
        if (!responsible) throw new Error("O responsável informado não existe.");

        return prisma.user.create({
            data: {
                ...data,
                tenantId,
                responsibleId,
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