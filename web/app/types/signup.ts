export type ResponsibleType = "PHYSICAL" | "LEGAL";

export interface SignupResponsibleDTO {
  type: ResponsibleType;
  name: string;
  cpf?: string | null;
  cnpj?: string | null;

  public_place: string;
  number: string;
  neighborhood: string;
  complement?: string | null;

  cep: string;
  city: string;
  uf: string;

  telephone1?: string | null;
  telephone2?: string | null;

  cell_phone1: string;
  cell_phone2?: string | null;

  email: string;
}

export interface SignupUserDTO {
  name: string;
  username: string;
  password: string;
  email: string;
}

export interface SignupDTO {
  responsible: SignupResponsibleDTO;
  user: SignupUserDTO;
}
