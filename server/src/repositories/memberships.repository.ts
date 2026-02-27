import { prisma } from "../lib/prisma";
import type { CreateMembershipsModel } from "../models/memberships/create-memberships.model";

export class MembershipsRepository {
    async create(data: CreateMembershipsModel, tenantId: string, userId: string) {
        // 1. Limpeza rigorosa
        const tId = tenantId.trim();
        const uId = userId.trim();

        // 2. Busca com findFirst (mais tolerante)
        const [ tenant, memberships] = await Promise.all([
            prisma.tenant.findFirst({ where: { id: tId } }),
            prisma.memberships.findFirst({ where: { id: uId } })

        ]) 

        if (!tenant) throw new Error("A empresa informada não existe.");
        if (!memberships) throw new Error("O usuário informado não existe.");

        return prisma.memberships.create({
            data: {
                ...data,
                tenantId: tId,
                userId: uId,
            }
        })
    }
}