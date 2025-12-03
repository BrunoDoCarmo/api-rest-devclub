"use server"

import axios from "axios"
import api from "../services/api"

export async function userLoginAction(formData: FormData) {
  const identifier = formData.get("identifier")
  const password = formData.get("password")

  try {
    const { data } = await api.post("/public/user/login", {
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
export async function userLogoutAction() {
  try {
    await api.post("/public/user/logout")

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

export async function userCadastroAction(formData: FormData) {
  const name = formData.get("name")
  const username = formData.get("username")
  const password = formData.get("password")
  const email = formData.get("email")

  try {
    const cadastro = await api.post("/public/user/cadastro",{
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