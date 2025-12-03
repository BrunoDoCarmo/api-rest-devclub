import { Router } from "express";
import { prisma } from "../../../lib/prisma";
import { State } from "../../../generated/prisma/client";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = Router();

const JWT_SECRET = process.env.JWT_SECRET!;

router.post("/cadastro", async (req, res) => {
  const { name, email, username } = req.body;

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
      where: { username },
    });

    //Se o usuário estiver já cadastrado, retorna uma mensagem de erro.
    if (existingUser) {
      return res.status(409).json({
        error: `O usuário ${username} já está cadastrado!`,
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    //Realiza o cadastro do usuário.
    const newUser = await prisma.user.create({
      data: {
        name: req.body.name,
        password: hashPassword,
        email: req.body.email,
        username: req.body.username,
      },
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
  const { name, email, user, state } = req.query;
  try {
    const filters: any = {
      ...(name && { name: { contains: String(name), mode: "insensitive" } }),
      ...(email && { email: String(email) }),
      ...(user && { user: String(user) }),
      ...(state && { state: String(state) as State }),
    };

    const users = await prisma.user.findMany({
      where: Object.keys(filters).length > 0 ? filters : undefined,
    });

    if (users.length === 0) {
      return res.status(404).json({
        message:
          Object.keys(filters).length === 0
            ? "Nenhum usuário cadastrado!"
            : "Nenhum usuário encontrado com o filtro informado!",
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

router.post("/login", async (req, res) => {
  try {
    const { identifier, password } = req.body;

    const user = await prisma.user.findFirst({
      where: { 
        OR: [
          { email: identifier },
          { username: identifier },
        ]
      }
    });

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Senha inválida" });
    }

    const token = jwt.sign({ id: user.id }, JWT_SECRET, {
      expiresIn: "1m",
    });

    return res.status(200).json({
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    return res.status(500).json({
      error: "Erro interno no servidor.",
    });
  }
});

router.post("/logout", async (req, res) => {
  try {
    return res.status(200).json({
      message: "Logout realizado com sucesso!"
    });
  } catch (error) {
    return res.status(500).json({
      error: "Erro interno no servidor."
    });
  }
});

export default router;
