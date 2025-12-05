import type { Request, Response } from "express"
import { listUsersService } from "../services/list-users.service"

export async function listUsersController(req: Request, res: Response) {
    try {
        const users = await listUsersService()

        return res.status(200).json({
            message: "Usuários listados com sucesso.",
            users,
        })
        
    } catch (error: unknown) {

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