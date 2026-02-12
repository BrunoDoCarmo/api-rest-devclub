import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface IPayload {
  sub: string;
  tenantId: string;
  type: string;
}

export function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Token ausente." });
  }

  // O formato é "Bearer TOKEN_AQUI"
  const token = authHeader.split(" ")[1];

  try {
    const secret = process.env.JWT_ACCESS_SECRET || "fallback_secret";
    const decoded = jwt.verify(token, secret) as any;
    // Injetando os dados no Request para o Controller usar
    req.user = {
      id: decoded.sub,
      tenantId: decoded.tenantId,
      type: decoded.type as "LEGAL" | "INDIVIDUAL"
    };

    return next();
  } catch (err) {
    return res.status(401).json({ message: "Token inválido ou expirado." });
  }
}