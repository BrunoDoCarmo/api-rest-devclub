import { ResponsibleData, TenantData, UserData, MembershipsData } from "../types/auth-create";

export interface SignupPayload {
  tenant: TenantData;
  responsible: ResponsibleData;
  user: UserData,
  memberships: MembershipsData
}

export const signup = async (payload: SignupPayload) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/public/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  
  if (!response.ok) {
    const errorData = await response.json();
    console.error("ERRO DO SERVIDOR", errorData)
    throw new Error(errorData.message || "Erro ao realizar o cadastro");
  }

  return response.json();
};