import axios from "axios";
import apiClient from "../../services/apiClient"

export async function userListarUsuarioAction(token: string) {
  try {
    const { data } = await apiClient.get("/private/user/list-user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return {
      success: true,
      users: data.users ?? [],
    };
  } catch (error: unknown) {
    console.error("Erro ao listar usuários:", error);
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
