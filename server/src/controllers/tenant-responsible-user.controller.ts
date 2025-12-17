import type { Request, Response } from 'express';
import { z } from "zod"
import { TenantResponsibleUserService } from '../services/tenant-responsible-user.service';
import { createTenantModel } from '../models/tenant/create-tenant.model';
import { createResponsibleModel } from '../models/responsible/create-responsible.model';
import { createUserModel } from '../models/user/create-user.model';

const service = new TenantResponsibleUserService();

export class TenantResponsibleUserController {
  async create(req: Request, res: Response) {
    try {
      const { tenant, responsible, user } = req.body;

      if(!tenant || !responsible || !user) {
        return res.status(400).json({ error: "Objeto tenant, responsible e user é obrigatório"})
      }

      const tenantParsed = createTenantModel.parse(req.body.tenant)
      const responsibleParsed = createResponsibleModel.parse(req.body.responsible)
      const userParsed = createUserModel.parse(req.body.user)
      
      const result = await service.create(
        tenantParsed,
        responsibleParsed,
        userParsed
      )

      return res.status(201).json(result);
    } catch (error: any) {
      // Erro de validação Zod
      if (error instanceof z.ZodError) {
        return res.status(422).json({
          error: "Dados inválidos",
          issues: error.issues,
        });
      }

      // Email duplicado
      if (error.message?.includes("Email")) {
        return res.status(409).json({ error: error.message });
      }
      // Username duplicado
      if (error.message?.includes("Username")) {
        return res.status(409).json({ error: error.message });
      }

      return res.status(400).json({ error: error.message });
    }
  }
}