import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import AppError from "../utils/AppError";

const JWT_SECRET = process.env.JWT_SECRET || "changeme";

interface TokenPayload {
    sub: string; // user id
    tenantId?: string; // optional tenant
    iat?: number;
    exp?: number;
}

/**
 * Auth middleware expects header:
 * Authorization: Bearer <token>
 *
 * After verification sets:
 * req.userId = token.sub
 * req.tenantId = token.tenantId (if present in token)
 */
export default function authMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        throw new AppError("JWT token is missing", 401);
    }

    const [scheme, token] = authHeader.split(" ");

    if (!scheme || scheme !== "Bearer" || !token) {
        throw new AppError("Invalid Authorization header", 401);
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as TokenPayload;

        if (!decoded || !decoded.sub) {
            throw new AppError("Invalid token payload", 401);
        }

        // attach to request (declared in express.d.ts)
        req.userId = decoded.sub;
        if (decoded.tenantId) req.tenantId = decoded.tenantId;

        return next();
    } catch (err) {
        console.error("Auth error:", err);
        throw new AppError("Invalid or expired token", 401);
    }
}
