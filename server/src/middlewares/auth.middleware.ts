import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";


export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: "Token não fornecido" });
    }

    const token = authHeader.split(" ")[1];

    const secret = process.env.JWT_ACCESS_SECRET;

    if (!secret) {
        console.error("Erro: JWT_ACCESS_SECRET não definido no .env");
        return res.status(500).json({ message: "Erro interno de configuração" });
    }

    try {

        const decoded = jwt.verify(token, secret) as any;
        
        if (!decoded || (!decoded.id && !decoded.sub)) {
            return res.status(401).json({ message: "Token não contém ID" });
        }

        req.user = decoded.id || decoded.sub; // Tenta as duas chaves comuns
        // console.log("ID injetado no middleware:", req.user); // Adicione esse log para testar
        // console.log("CONTEÚDO DO DECODED:", decoded);
        next();
    } catch (error) {
        return res.status(401).json({ message: "Token inválido ou expirado" });
    }
};
