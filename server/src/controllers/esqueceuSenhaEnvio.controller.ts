import type { Request, Response } from 'express';
import { EsqueceuSenhaEnvioService } from '../services/esqueceuSenhaEnvio.service';

const service = new EsqueceuSenhaEnvioService();

export class EsqueceuSenhaEnvioController {
    async create(req: Request, res: Response) {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: "O e-mail é obrigatório." });
        }

        try {
            await service.execute(email);
            return res.status(200).json({ 
                message: "Se o e-mail estiver cadastrado, um link de recuperação será enviado." 
            });
        } catch (error) {
            console.log("--- ERRO DETALHADO ---");
            console.error(error);
            return res.status(500).json({ message: "Erro interno do servidor." });
        }
    }
}