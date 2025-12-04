import { Router } from "express";
import { prisma } from "../../../lib/prisma";
import { State } from "../../../generated/prisma/client";

import bcrypt from "bcryptjs";

const router = Router();

router.get("/list-user", async (req, res) => {
  try {
    const users = await prisma.user.findMany({ omit: { password: true } });

    res.status(200).json({
      message: "Usuários listados com sucesso",
      users,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Erro interno no servidor.",
    });
  }
});

router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;

  const loggedUserId = req.body.userId;

  if (id !== loggedUserId) {
    return res.status(403).json({
      error:
        "Você não pode excluir este usuário",
    });
  }

  try {
    const deleteUser = await prisma.user.delete({
      where: { id },
    });

    return res.status(200).json({
      message: "Usuário deletado com sucesso!",
      deleteUser,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Erro interno no servidor.",
    });
  }
});

router.put("alterar/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    //Realiza o cadastro do usuário.
    const updateUser = await prisma.user.update({
      where: { id },
      data: {
        name: req.body.name,
        password: hashPassword,
        email: req.body.email,
        username: req.body.username,
      },
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
