import { createCompanyService } from "../../services/company/create-company.service";

export async function createCompanyController(req: any, res: any) {
    try {
        const result = await createCompanyService(req.body);

        res.status(201).json({
            message: "Empresa criada com sucesso!",
            data: result,
        });
    } catch (error: unknown) {

        if (error instanceof Error) {
            return res.status(500).json({
                error: error.message
            })
        }

        return res.status(500).json({
            error: "Erro ao criar empresa.",
        });
    }
}