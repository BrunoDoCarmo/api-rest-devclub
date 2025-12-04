"use server"

import axios from "axios"
import apiServer from "../../services/apiServer"

export async function userLogoutAction() {
  try {
    await apiServer.post("/public/user/logout")

    return {
      success: true,
      message: "Logout realizado com sucesso!"
    }
  } catch (error: unknown) {
    if(axios.isAxiosError(error)){
          return {
            success: false,
            message:
              error?.response?.data?.message || 
              error?.response?.data?.error || 
              "Erro ao tentar fazer logout"
          }
      }

      return {
          success: false,
          message: "Erro inesperado no servidor"
      }
  }
}
