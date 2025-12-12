export interface ReturnResponsibleDTO {
    id: string;
    type: string
    name: string;
    cpf: string | null;
    cnpj: string | null;
    public_place: string;
    number: string;
    neighborhood: string;
    complement: string | null;
    cep: string;
    city: string;
    uf: string;
    telephone1: string | null;
    telephone2: string | null;
    cell_phone1: string;
    cell_phone2: string | null;
    email: string;
    tenantId: string;
    state: string;
    createAt: Date;
    updateAt: Date
}