import type { Request, Response } from "express";
import { AuthService } from "../services/auth.service";

const authService = new AuthService();

export async function authLoginController(req: Request, res: Response): Promise<Response> {
  try {
    const { identifier, password } = req.body;

    const result = await authService.login(identifier, password);

    return res.status(200).json({
      success: true,
      accessToken: result.token,
      user: result.user,
    });
  } catch (error: any) {
    console.error("Erro no Processo de Login:", error);
    if (error.code?.startsWith("P")) {
      return res.status(503).json({
        success: false,
        message: "Banco de Dados ocupado ou offline. Tente novamente em instantes.",
      });
    }

    const status = error.message.includes("Credenciais inválidas") || error.message.includes("verificado") ? 401: 500;

    return res.status(status).json({
      success: false,
      message: error.message || "Erro interno no servidor",
    });
  }
}
