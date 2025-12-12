import { prisma } from "../lib/prisma";
import type { CreateResponsibleDTO } from "../models/responsible/create-responsible.model";
import type { UpdateResponsibleDTO } from "../models/responsible/update-responsible.model";

export class ResponsibleRepository {
    async create(data: CreateResponsibleDTO) {
        return prisma.responsible.create({
            data
        })
    }

    async findAll(tenantId: string) {
        return prisma.responsible.findMany({
            where: { tenantId }
        }) 
    }

    async findById(id: string) {
        return prisma.responsible.findUnique({
            where: { id }
        })
    }

    async update(id: string, data: UpdateResponsibleDTO) {
        return prisma.responsible.update({
            where: { id },
            data
        })
    }

    async delete(id: string) {
        return prisma.responsible.delete({
            where: { id },
            data: { state: "DELETED"}
        })
    }
}