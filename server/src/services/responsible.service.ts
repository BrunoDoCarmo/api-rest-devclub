import type { CreateResponsibleDTO } from "../models/responsible/create-responsible.model";
import type { UpdateResponsibleDTO } from "../models/responsible/update-responsible.model";
import { ResponsibleRepository } from "../repositories/responsible.repository";
import AppError from "../utils/AppError";

export class ResponsibleService {
    private repo = new ResponsibleRepository()

    async create(data: CreateResponsibleDTO) {
        return await this.repo.create(data)
    }

    async findAll(tenantId: string) {
        return await this.repo.findAll(tenantId)
    }

    async findById(id: string) {
        const responsible = await this.repo.findById(id)
        if(!responsible) throw new AppError("Responsible not found", 404)
        return responsible
    }

    async update(id: string, data: UpdateResponsibleDTO) {
        await this.findById(id)
        return await this.repo.update(id, data)
    }

    async delete(id: string) {
        await this.findById(id)
        return await this.repo.delete(id)
    }
}