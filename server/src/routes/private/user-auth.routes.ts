import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { prisma } from "../../lib/prisma"; // Ou sua conexão com banco

const router = Router();

router.get("/me", authMiddleware, async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ 
                message: "Não autorizado",
                debug: "O req.userId veio vazio" 
            });
        }

        const user = await prisma.user.findUnique({
            // Use o casting 'as string' ou garanta a existência acima
            where: { id: req.user.id}, 
            select: {
                name: true,
                email: true,
                tenant: {
                    select: {
                        name: true,
                        type: true,
                    }
                }
            }
        });

        if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado" });
        }

        return res.json(user);
    } catch (error) {
        return res.status(500).json({ message: "Erro interno no servidor" });
    }
});
export default router;

