import type { Request, Response } from "express";
import { loginService } from "../../services/user/login.service";

export async function loginController(req: Request, res: Response) {
  try {
    const { identifier, password } = req.body;
    const result = await loginService(identifier, password);
    return res.status(200).json(result);
  } catch (error: any) {
    if (error.message === "Usuário não encontrado ou inativo!" || error.message === "Senha inválida") {
        return res.status(400).json({ message: error.message });
    }
    return res.status(500).json({
      error: "Erro interno no servidor.",
    });
  }
}