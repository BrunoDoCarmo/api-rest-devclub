"use server";

import { z } from "zod";

const loginSchema = z.object({
  identifier: z.string().min(1),
  password: z.string().min(1),
});

interface LoginSuccess {
  success: true;
  accessToken: string;
  refreshToken: string;
}

interface LoginError {
  success: false;
  message: string;
}

export async function userLoginAction(
  data: unknown
): Promise<LoginSuccess | LoginError> {
  const parsed = loginSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      message: "Dados inválidos",
    };
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/public/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(parsed.data),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      return {
        success: false,
        message: error.message || "Erro ao fazer login",
      };
    }

    const json = await response.json();

    return {
      success: true,
      accessToken: json.accessToken,
      refreshToken: json.refreshToken,
    };
  } catch {
    return {
      success: false,
      message: "Erro de conexão com o servidor",
    };
  }
}
