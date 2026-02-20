import { createUserModel } from "../models/user/create-user.model";
import { updateUserCreateAccountModel } from "../models/user/update-user-create-account.model";
import { UserService } from "../services/user.service";
import type { Request, Response } from "express";

const userService = new UserService();

export async function listUsersController(req: Request, res: Response) {
  try {
    const tenantId = req.user?.tenantId; 
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit);

    if (!tenantId) {
      return res.status(400).json({ message: "Tenant não identificado." });
    }

    const users = await userService.listUsers(tenantId, page, limit);
    
    return res.status(200).json(users);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}

export async function createUserController(req: Request, res: Response) {
  try {
    const tenantId = String(req.body.tenantId).trim();
    const responsibleId = String(req.body.responsibleId).trim();

    if (!tenantId || !responsibleId) {
      return res.status(401).json({ message: "Empresa ou responsável não identificado." });
    }
    const result = createUserModel.safeParse(req.body);

    if( !result.success) {
      return res.status(400).json({
        message: "Dados inválidos",
        errors: result.error
      })
    }

    const user = await userService.createUser(result.data, tenantId, responsibleId)

    return res.status(201).json({
      message: "Membro criado com sucesso",
      user: {id: user.id, name: user.name, email: user.email}
    })
  } catch (error: any) {
    if(error.code === 'P2002') {
      return res.status(409).json({ message: "E-mail ou usuário já cadastrado." });
    }

    if (error.message.includes("timeout") || error.code === 'P2024') {
      return res.status(503).json({ message: "O servidor está sobrecarregado. Tente novamente em instantes." });
    }

    return res.status(500).json({ message: error.message});
  }
}

export async function updateUserCreateAccountController(req: Request, res: Response) {
  try  {
    const { email } = req.params;
    const { tenantId } = req.body
    const { responsibleId } = req.body

    if(!tenantId|| !email || !responsibleId) {
      return res.status(401).json({
        message: "Empresa ou usuário não identificado.",
      })
    }

    const result = updateUserCreateAccountModel.safeParse(req.body)

    if(!result.success) {
      return res.status(400).json({
        message: "Dados inválidos",
        errors: result.error
      })
    }
    
    const updateUserAccount = await userService.updateUserCreateAccount(result.data, email)

    return res.status(201).json({
      message: "Usuário e senha criado com sucesso.",
      user: {
        username: updateUserAccount.username,
      }
    })
  } catch {
    return res.status(500).json({ message: "Erro interno no servidor."})
  }
}