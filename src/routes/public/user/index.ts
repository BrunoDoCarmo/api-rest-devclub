import { Router } from "express";
import { prisma } from "../../../lib/prisma";
import { State } from "../../../generated/prisma/client";

const router = Router();

router.post("/", async (req, res) => {
  const { name, password, email, user } = req.body;
  try {
    // Verifica se o email já está cadastrado!
    const existingEmail = await prisma.user.findUnique({
      where: { email },
    });

    //Se o email estiver já cadastrado, retorna uma mensagem de erro.
    if (existingEmail) {
      return res.status(409).json({
        error: `O email ${email} já está cadastrado!`,
      });
    }

    // Verifica se o usuário já está cadastrado!
    const existingUser = await prisma.user.findUnique({
      where: { user },
    });

    //Se o usuário estiver já cadastrado, retorna uma mensagem de erro.
    if (existingUser) {
      return res.status(409).json({
        error: `O usuário ${user} já está cadastrado!`,
      });
    }

    //Realiza o cadastro do usuário.
    const newUser = await prisma.user.create({
      data: { name, password, email, user },
    });

    return res.status(201).json({
      message: "Usuário criado com sucesso!",
      user: newUser,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Erro interno no servidor.",
    });
  }
});

router.get("/", async (req, res) => {
  const user = await prisma.user.findMany();
  res.status(201).json(user);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deleteUser = await prisma.user.delete({
      where: { id },
    });

    return res.status(200).json({
      message: "Usuário deletado com sucesso!",
      user: deleteUser,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Erro interno no servidor.",
    });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, password, email, user } = req.body;

  try {
    const updateUser = await prisma.user.update({
      where: { id },
      data: { name, password, email, user },
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

router.patch("/:id", async (req, res) => {
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

router.get("/filter", async (req, res) => {
  const { name, email, user, state } = req.query;

  try {
    const users = await prisma.user.findMany({
      where: {
        ...(name && { name: { contains: String(name), mode: "insensitive" } }),
        ...(email && { email: String(email) }),
        ...(user && { user: String(user) }),
        ...(state && { state: String(state) as State }),
      },
    });

    if (users.length === 0) {
      return res.status(404).json({
        message: "Nenhum usuário entrado com o filtro informado!",
      });
    }

    return res.status(200).json({
      message: "Usuário(os) encontrado(os)!",
      count: users.length,
      data: users,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Erro interno no servidor.",
    });
  }
});
export default router;
