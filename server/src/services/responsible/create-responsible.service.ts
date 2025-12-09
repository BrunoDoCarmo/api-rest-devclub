import { prisma } from "../../lib/prisma";

export async function createResponsibleService(data: any) {
    return await prisma.$transaction(async (tx) => {
        
        //1. Criar o tenant automaticamente
        const tenant = await tx.tenant.create({
            data: {
                name: `${data.name} - Tenant`, //pode ajustar
            },
        });

        const {cpf, cnpj} = data;
        const existingCpf = await tx.responsible.findUnique({
            where: { cpf }
        });
        if (existingCpf) {
            throw new Error("CPF já está em uso.");
        }
        const existingCnpj = await tx.responsible.findUnique({
            where: { cnpj }
        });
        if (existingCnpj) {
            throw new Error("CNPJ já está em uso.");
        }

        //2. Criar o responsável com tenantId
        const responsible = await tx.responsible.create({
            data: {
                type: data.type,
                name: data.name,
                cpf,
                cnpj,
                public_place: data.public_place,
                number: data.number,
                neighborhood: data.neighborhood,
                complement: data.complement,
                cep:data.cep,
                city: data.city,
                uf: data.uf,
                cell_phone1: data.cell_phone1,
                cell_phone2: data.cell_phone2,
                telephone1: data.telephone1,
                telephone2: data.telephone2,
                email: data.email,
                tenantId: tenant.id,
            }
        });

        return {tenant, responsible};
    })
}