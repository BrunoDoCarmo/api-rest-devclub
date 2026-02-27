import { prisma } from "../lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export class AuthService {
  async login(identifier: string, password: string) {
    if (!identifier || !password) {
      throw new Error("Credenciais inválidas");
    }

    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email: identifier }, { username: identifier }],
      },
      include: {
        emailVerifications: true,
        memberships: {
          where: { state: "ACTIVE"},
          include: {
            tenant: {
              include: { responsible: true }
            }
          }
        },
      }
    });

    if (!user || !user.password) {
      throw new Error("Usuário ou senha inválidos");
    }

    // 1. Verificação de Senha (melhor fazer antes das checagens de estado)
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Usuário ou senha inválidos");
    }

    // 2. Validação de E-mail
    const isEmailVerified = user.emailVerifications.some(v => v.verified === true);
    if (!isEmailVerified) {
      throw new Error("E-mail não verificado.");
    }

    // 3. Pega a primeira assinatura (membership) para determinar o acesso
    const activeMembership = user.memberships.find(m => m.state === "ACTIVE");

    if (!activeMembership) {
      throw new Error("Acesso negado. Seu vínculo com a empresa anterior foi desativado ou você não possui empresas ativas.");
    }

    // 4. Validação do Responsável da Empresa (Tenant)
    const responsible = activeMembership.tenant.responsible;
    if (responsible && responsible.state === "DISABLED") {
      throw new Error("Acesso negado. O responsável pela empresa está desativado.");
    }
    
    const secret = process.env.JWT_ACCESS_SECRET || "fallback_para_teste_apenas";

    // 6. Geração do Token
    const token = jwt.sign(
      { 
        sub: user.id, 
        name: activeMembership.name,
        email: user.email, 
        tenantId: activeMembership.tenantId,
        tenantName: activeMembership.tenant.name,         
        type: activeMembership.tenant.type, 
        role: activeMembership.role 
      },
      secret,
      { expiresIn: '1d' }
    );

    return {
      user: {
        id: user.id,
        name: activeMembership.name,
        email: user.email,
        type: activeMembership.tenant.type,
        role: activeMembership.role,
        tenantName: activeMembership.tenant.name
      },
      token,
    };
  }
}