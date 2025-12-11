"use server"

import axios from "axios";
import apiClient from "../../services/apiClient"

export async function userDeletarUsuarioAction(id: string, token: string) {
  try {
    const { data } = await apiClient.delete(`/private/user/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: { userId: id}
    });

    return {
      success: true,
      message: data?.message ?? "Usuário deletado com sucesso",
    };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        message:
          error.response?.data?.message ||
          error.response?.data?.error ||
          "Erro ao tentar deletar usuários",
      };
    }

    return {
      success: false,
      message: "Erro inesperado no servidor",
    };
  }
}
