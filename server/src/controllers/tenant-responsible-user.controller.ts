import type { Request, Response } from 'express';
import { TenantResponsibleUserService } from '../services/tenant-responsible-user.service';
import { createResponsibleModel } from '../models/responsible/create-responsible.model';
import { createUserModel } from '../models/user/create-user.model';

const service = new TenantResponsibleUserService();

export class TenantResponsibleUserController {
  async create(req: Request, res: Response) {
    try {
      const { tenant, responsible, user } = req.body;

      if(!tenant || !responsible) {
        return res.status(400).json({ error: "Objeto tenant e responsible é obrigatório"})
      }

      const responsibleParsed = createResponsibleModel.parse(req.body.responsible)
      const userParsed = createUserModel.parse(req.body.user)
      
      const result = await service.create(
        tenant,
        responsibleParsed,
        userParsed
      )

      return res.status(201).json(result);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}
