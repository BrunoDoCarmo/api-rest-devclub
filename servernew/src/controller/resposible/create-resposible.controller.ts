import { createResponsibleService } from "../../services/responsible/create-responsible.service";

export async function createResponsibleController(req: any, res: any) {
    try {
        const result = await createResponsibleService(req.body);

        res.status(201).json({
            message: "Responsável e Tenant criados com sucesso!",
            data: result,
        });
    } catch (error: unknown) {

        if (error instanceof Error) {
            return res.status(500).json({
                error: error.message
            })
        }

        return res.status(500).json({
            error: "Erro ao criar responsável e tenant.",
        });
    }
}