import type { Request, Response } from 'express';
import { z } from "zod"
import { TenantResponsibleUserMembershipsService } from '../services/tenant-responsible-user-memberships.service';
import { createTenantModel } from '../models/tenant/create-tenant.model';
import { createResponsibleModel } from '../models/responsible/create-responsible.model';
import { createUserModel } from '../models/user/create-user.model';
import { createMembershipsModel } from '../models/memberships/create-memberships.model';

const service = new TenantResponsibleUserMembershipsService();

export class TenantResponsibleUserMembershipsController {
  async create(req: Request, res: Response) {
    try {
      const { tenant, responsible, user, memberships } = req.body;

      if(!tenant || !responsible || !user || !memberships) {
        return res.status(400).json({ error: "Objeto tenant, responsible, user e memberships é obrigatório"})
      }

      const tenantParsed = createTenantModel.parse(req.body.tenant)
      const responsibleParsed = createResponsibleModel.parse(req.body.responsible)
      const userParsed = createUserModel.parse(req.body.user)
      const membershipsParsed = createMembershipsModel.parse(req.body.memberships)
      
      const result = await service.create(
        tenantParsed,
        responsibleParsed,
        userParsed,
        membershipsParsed
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

      return res.status(400).json({ error: error.message });
    }
  }
}