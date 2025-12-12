import type { Request, Response } from "express";
import { deleteUserService } from "../../services/user/delete-user.service";
import type { idUserParams } from "../../interfaces/user/id-user.interface";

export async function deleteUserController(req: Request<idUserParams>, res: Response) {
    try {
        const { id } = req.params

        await deleteUserService(id)

        return res.status(200).json({
            message: "Usuário deletadp com sucesso."
        })
    } catch(error: unknown) {
        if (error instanceof Error) {
            return res.status(500).json({
                error: error.message
            })
        }
        return res.status(500).json({
            error: "Erro interno no servidor"
        })
    }
}