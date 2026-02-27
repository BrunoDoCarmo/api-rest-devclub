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
            include: {
                memberships: {
                    where: { state: "ACTIVE" }, // Pega apenas o vínculo ativo
                    include: {
                        tenant: true
                    }
                }
            }
        });

        if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado no banco de dados" });
        }

        const activeMembership = user.memberships[0];

        // Retornamos exatamente o que a interface MeResponse espera
        return res.json({
            user: { 
                id: user.id, 
                name: activeMembership?.name, 
                role: activeMembership?.role || "USER" 
            },
            tenant: { 
                name: activeMembership?.tenant?.name || "Sem Empresa", 
                type: activeMembership?.tenant?.type || "PHYSICAL" 
            }
        });
    } catch (error: any) {
        console.error("Erro no /me:", error.message);
        return res.status(500).json({ message: "Erro interno", error: error.message });
    }
});
export default router;