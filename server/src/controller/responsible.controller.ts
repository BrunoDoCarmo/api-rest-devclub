import type { Request, Response } from 'express';
import { createResponsibleService } from '../services/responsible.service';
import { createResponsibleSchema } from '../models/responsible.model';

export async function createResponsibleController(req: Request, res: Response) {
  try {
    const parsed = createResponsibleSchema.parse(req.body);
    const responsible = await createResponsibleService({ ...parsed, tenantId: (req as any).tenant.id });
    res.status(201).json(responsible);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
}
