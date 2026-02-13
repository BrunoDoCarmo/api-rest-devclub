import type { Request, Response } from 'express';
import { EsqueceuSenhaResetService } from '../services/esqueceuSenhaReset.service';

export class EsqueceuSenhaResetController {
  async handle(req: Request, res: Response) {
    const { token, password } = req.body;

    // Validação básica de entrada
    if (!token || !password) {
      return res.status(400).json({ error: "Token e senha são obrigatórios." });
    }

    const esqueceuSenhaResetPasswordService = new EsqueceuSenhaResetService();

    try {
      const result = await esqueceuSenhaResetPasswordService.execute(token, password);
      return res.status(200).json(result);
    } catch (error: any) {
      return res.status(401).json({ error: error.message });
    }
  }
}