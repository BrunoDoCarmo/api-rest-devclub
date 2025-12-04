"use server"

import axios from "axios"
import apiServer from "../../services/apiServer"

export async function userCadastroAction(formData: FormData) {
  const name = formData.get("name")
  const username = formData.get("username")
  const password = formData.get("password")
  const email = formData.get("email")

  try {
    const cadastro = await apiServer.post("/public/user/cadastro",{
      name,
      username,
      password,
      email
    })

    return {
      success: true,
      name: cadastro.data.name,
      username: cadastro.data.username,
      password: cadastro.data.password,
      email: cadastro.data.email,
    }
  } catch (error) {
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