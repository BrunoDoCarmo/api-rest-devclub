import type { Request, Response } from "express";
import { findUserByIdService } from "../services/find-user-by-id.service";
import type { idUserParams } from "../interfaces/id-user.interface";

export async function findUserByIdController(req: Request<idUserParams>, res: Response) {
    try {
        const { id } = req.params;

        const user = await findUserByIdService(id);

        return res.status(200).json({
            user,
        });
    } catch (error) {
        if (error instanceof Error && error.message === "NOT_FOUND") {
            return res.status(404).json({ message: "Usuário não encontrado!" });
        }

        return res.status(500).json({ error: "Erro ao buscar usuário!" });
    }
}