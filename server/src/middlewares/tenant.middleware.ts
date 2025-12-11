import type { Request, Response, NextFunction } from 'express';
import { prisma } from '../lib/prisma';

export async function tenantMiddleware(req: Request, res: Response, next: NextFunction) {
  const tenantId = req.headers['x-tenant-id'] as string | undefined;
  if (!tenantId) return res.status(400).json({ message: 'x-tenant-id header required' });

  const tenant = await prisma.tenant.findUnique({ where: { id: tenantId } });
  if (!tenant) return res.status(404).json({ message: 'Tenant not found' });

  (req as any).tenant = tenant;
  next();
}
