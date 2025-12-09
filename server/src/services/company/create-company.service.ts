import { prisma } from "../../lib/prisma";

export async function createCompanyService(data: any) {
    const {cnpj} = data;

    const existingCnpj = await prisma.company_Data.findUnique({
        where: { cnpj }
    });
    if (existingCnpj) {
        throw new Error("CNPJ já está em uso.");
    }

    return await prisma.company_Data.create({
        data: {
            company_name: data.company_name,
            fantasy: data.fantasy,
            cnpj,
            ie: data.ie,
            public_place: data.public_place,
            number: data.number,
            neighborhood: data.neighborhood,
            complement: data.complement,
            cep: data.cep,
            city: data.city,
            uf: data.uf,
            telephone1: data.telephone1,
            telephone2: data.telephone2,
            cell_phone1: data.cell_phone1,
            cell_phone2: data.cell_phone2,
            email: data.email,
            site: data.site,
            responsibleId: data.responsibleId,
        }
    })
}