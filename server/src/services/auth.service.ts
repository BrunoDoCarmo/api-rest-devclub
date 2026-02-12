import { prisma } from "../lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

interface LoginResult {
  user: {
    id: string;
    name: string;
    email: string;
    type?: string;
    role: string;
  };
  token: string;
}

export class AuthService {
  async login(identifier: string, password: string): Promise<LoginResult> {
    if (!identifier || !password) {
      throw new Error("Credenciais inválidas");
    }

    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email: identifier }, { username: identifier }],
      },
      include: {
        emailVerifications: true,
        responsible: true, 
        tenant: true,       
      }
    }).catch(err => {
      console.error("Falha ao conectar no banco:", err.message);
      throw new Error("O banco de dados demorou a responder. Por favor, tente novamente.");
    });

    if (!user) {
      throw new Error("Usuário ou senha inválidos");
    }
    const isEmailVerified = user.emailVerifications.some(v => v.verified === true); 
    // Ou: const isEmailVerified = user.emailVerifications.some(v => v.verifiedAt !== null);

    if (!isEmailVerified) {
      throw new Error("E-mail não verificado. Por favor, valide seu e-mail para acessar.");
    }

    const responsible = user.responsible;
    if (responsible && responsible.state === "DISABLED") {
      throw new Error("Acesso negado. O responsável associado a este usuário está desativado.");
    }

    const userState = user.state;
    if(userState === "DISABLED") {
      throw new Error("Acesso negado. Usuário desativado.");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Usuário ou senha inválidos");
    }

    if (!process.env.JWT_ACCESS_SECRET) {
      throw new Error("JWT_ACCESS_SECRET não configurado");
    }

    // No seu AuthService.ts
    const secret = process.env.JWT_ACCESS_SECRET || "fallback_para_teste_apenas";

    const token = jwt.sign(
      { sub: user.id, email: user.email, name: user.name, tenantId: user.tenantId, type: user.tenant.type, role: user.role },
      secret,
    );

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        type: user.tenant?.type,
        role: user.role,
      },
      token,
    };
  }
}
