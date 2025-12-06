import type { Request, Response } from "express";
import { logoutUserService } from "../../services/user/logout-user.service";

export async function logoutUserController(req: Request, res: Response) {
    try {
        const result = await logoutUserService();

        return res.status(200).json(result);
    } catch (error) {
    return res.status(500).json({
      error: "Erro interno no servidor."
    });
  }
}