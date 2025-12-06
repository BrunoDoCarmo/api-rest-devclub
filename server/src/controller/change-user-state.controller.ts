import type { Request, Response } from "express";
import { changeUserStateService } from "../services/change-user-list.service";
import type { idUserParams } from "../interfaces/id-user.interface";
import type { changeUserStateParams } from "../interfaces/change-user-state.interface";

export async function changeUserStateController(req: Request<idUserParams, any, changeUserStateParams>, res: Response) {
    const { id } = req.params;
    const { state } = req.body;

    try {
        const result = await changeUserStateService(id, state)

        return res.status(200).json({
            message: "Estado do usuário alterado com sucesso!",
            user: result
        });
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