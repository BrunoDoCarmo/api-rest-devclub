import { Router } from "express";
import { prisma } from "../../../lib/prisma";

const router = Router();

router.get("/list-user", async (req, res) => {
  try {
    const users = await prisma.user.findMany( { omit: { password: true } })

    res.status(200).json({
      message: 'Usuários listados com sucesso',
      users
    })
  } catch (error) {
    return res.status(500).json({
      error: "Erro interno no servidor.",
    });
  }
});

export default router;
