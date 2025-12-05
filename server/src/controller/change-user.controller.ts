import type { Request, Response } from "express";
import { changeUserServices } from "../services/change-user.service";
import type { idUserParams } from "../interfaces/id-user.interface";

export async function changeUserController(req: Request<idUserParams>, res: Response) {
    const { id } = req.params
    const body = req.body

    const result = await changeUserServices(id, body)

    return res.json(result)
}