import type { Request, Response } from "express";
import { ResponsibleService } from "../services/responsible.service";
import { createResponsibleSchema } from "../models/responsible/create-responsible.model";
import handleError from "../utils/handleError";
import { updateResponsibleSchema } from "../models/responsible/update-responsible.model";

const service = new ResponsibleService()

export class ResponsibleController {
    async create(req: Request, res: Response) {
        try {
            const body = createResponsibleSchema.parse(req.body)
            const responsible = await service.create(body)
            return res.status(201).json(responsible)
        } catch (error) {
            return handleError(error, res)
        }
    }

    async findAll(req: Request, res: Response) {
        try {
            const tenantId = req.tenantId!;
            const responsible = await service.findAll(tenantId);
            return res.json(responsible);
        } catch (error) {
            return handleError(error, res);
        }
    }

    async findById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            if(!id) {
                return res.status(400).json({message: "ID is required"})
            }
            const responsible = await service.findById(id);
            return res.json(responsible);
        } catch (error) {
            return handleError(error, res);
        }
    }

    async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            if(!id) {
                return res.status(400).json({message: "ID is required"})
            }
            const body = updateResponsibleSchema.parse(req.body);
            const responsible = await service.update(id, body);
            return res.json(responsible);
        } catch (error) {
            return handleError(error, res);
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;
            if(!id) {
                return res.status(400).json({message: "ID is required"})
            }
            await service.delete(id);
            return res.status(204).send();
        } catch (error) {
            return handleError(error, res);
        }
    }
}