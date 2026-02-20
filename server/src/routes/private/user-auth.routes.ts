import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { prisma } from "../../lib/prisma"; // Ou sua conexão com banco

const router = Router();

router.get("/me", authMiddleware, async (req, res) => {
    try {
        // 1. Extrai o ID de forma segura (TS fix)
        const userId = req.user;

        if (!userId || typeof userId !== 'string') {
            return res.status(401).json({ message: "ID não encontrado no token" });
        }

        const user = await prisma.user.findUnique({
            where: { 
                id: userId 
            },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                tenant: {
                    select: { name: true, type: true }
                }
            },
        });

        if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado no banco de dados" });
        }

        return res.json({
            user: { id: user.id, name: user.name, email: user.email, role: user.role },
            tenant: user.tenant || { name: "Sem Empresa", type: "N/A" }
        });
    } catch (error: any) {
        console.error("Erro no /me:", error.message);
        return res.status(500).json({ message: "Erro interno", error: error.message });
    }
});
export default router;

