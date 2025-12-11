import type { Request, Response } from 'express';
import { createTenantService } from '../services/tenant.service';

export async function createTenantController(req: Request, res: Response) {
  try {
    const tenant = await createTenantService(req.body);
    res.status(201).json(tenant);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
}
