import { ResponsibleData, TenantData } from "../types/auth-create";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/public`;

export interface SignupPayload {
  tenant: TenantData;
  responsible: ResponsibleData;
}

export const signup = async (payload: SignupPayload) => {
  const response = await fetch(`${API_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  
  const data = await response.json();

  if (!response.ok) {
    // Tenta capturar a mensagem de erro do backend ou usa uma padrão
    throw new Error(data.message || data.error || "Erro ao realizar o cadastro");
  }

  return data;
};