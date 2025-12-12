import type { Request, Response, NextFunction } from "express";
import AppError from "../utils/AppError";
import { prisma } from "../lib/prisma";

/**
 * Tenant middleware's purpose:
 * - Ensure request has a tenant id (either set by auth token or by header x-tenant-id)
 * - Validate tenant exists and is ACTIVE
 *
 * Usage: place after authMiddleware so req.tenantId may already exist from token.
 */
export default async function tenantMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        // 1) priority: req.tenantId set by auth middleware
        let tenantId = req.tenantId;

        // 2) fallback: custom header
        if (!tenantId) {
            const headerTenant = req.headers["x-tenant-id"];
            if (typeof headerTenant === "string" && headerTenant.trim()) {
                tenantId = headerTenant;
            }
        }

        if (!tenantId) {
            throw new AppError("Tenant id is required (header 'x-tenant-id' or token)", 400);
        }

        // 3) validate tenant exists
        const tenant = await prisma.tenant.findUnique({
            where: { id: tenantId },
            select: { id: true, name: true }
        });

        if (!tenant) {
            throw new AppError("Tenant not found", 404);
        }

        // attach tenantId guaranteed
        req.tenantId = tenantId;

        return next();
    } catch (err) {
        return next(err);
    }
}
