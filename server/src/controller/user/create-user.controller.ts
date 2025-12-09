import { createUserService } from "../../services/user/create-user.service";

export async function createUserController(req: any, res: any) {
    try {
        const result = await createUserService(req.body);

        res.status(201).json({
            message: "Usuário criado com sucesso!",
            data: result,
        });
    } catch (error: unknown) {

        if (error instanceof Error) {
            return res.status(500).json({
                error: error.message
            })
        }

        return res.status(500).json({
            error: "Erro ao criar usuário.",
        });
    }
}