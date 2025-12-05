import { Router } from "express";
import { prisma } from "../../../lib/prisma";
import { State } from "../../../generated/prisma/client";

import bcrypt from "bcryptjs";

const router = Router();

router.patch("alterar_state/:id", async (req, res) => {
  const { id } = req.params;
  const { state } = req.body;

  // 🔍 Validação correta usando o ENUM do Prisma
  if (!Object.values(State).includes(state)) {
    return res.status(400).json({
      error: `O estado '${state}' é inválido. Utilize: ${Object.values(
        State
      ).join(", ")}`,
    });
  }

  try {
    const updateUser = await prisma.user.update({
      where: { id },
      data: { state },
    });

    return res.status(200).json({
      message: "Usuário atualizado com sucesso!",
      user: updateUser,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Erro interno no servidor.",
    });
  }
});

export default router;
