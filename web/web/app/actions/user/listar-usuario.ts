"use server"

import axios from "axios";
import apiServer from "../../services/apiServer"

export async function userListarUsuarioAction(token: string) {
  try {
    const { data } = await apiServer.get("/private/user/list-user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return {
      success: true,
      users: data.users ?? [],
    };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        message:
          error.response?.data?.message ||
          error.response?.data?.error ||
          "Erro ao tentar listar usuários",
      };
    }

    return {
      success: false,
      message: "Erro inesperado no servidor",
    };
  }
}
