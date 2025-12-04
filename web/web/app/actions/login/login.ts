"use server"

import axios from "axios"
import apiServer from "../../services/apiServer"

export async function userLoginAction(formData: FormData) {
  const identifier = formData.get("identifier")
  const password = formData.get("password")

  try {
    const { data } = await apiServer.post("/public/user/login", {
      identifier,
      password,
    })

    return {
      success: true,
      token: data.token,
      userId: data.user.id
    }
  } catch (error: unknown) {
    if(axios.isAxiosError(error)){
        return {
          success: false,
          message:
            error?.response?.data?.message || 
            error?.response?.data?.error || 
            "Erro ao tentar fazer login"
        }
    }

    return {
        success: false,
        message: "Erro inesperado no servidor"
    }
  }
}