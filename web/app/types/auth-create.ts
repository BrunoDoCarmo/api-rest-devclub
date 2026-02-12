// Interface para o Tenant (Empresa)
export interface TenantData {
  name: string;
  type: string;
  size: string;
  cnpj?: string;
}

// Interface para o Responsible (Responsável)
export interface ResponsibleData {
  name: string;
  cpf: string;
  cnpj: string;
  public_place: string;
  number: string;
  neighborhood: string;
  complement: string;
  cep: string;
  city: string;
  uf: string;
  telephone1: string;
  telephone2: string;
  cell_phone1: string;
  cell_phone2: string;
  email: string;
}

// Interface para o User (Usuário)
export interface UserData {
  name: string;
  email: string;
  username: string;
  password: string;
}