import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { loginRepository } from "../../repositories/user/login.repository";

const JWT_SECRET = process.env.JWT_SECRET || "DEFAULT_SECRET";

export async function loginService(identifier: string, password: string) {
    const user = await loginRepository(identifier);
    if(!user) {
        throw new Error("Usuário não encontrado ou inativo!");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) {
        throw new Error("Senha inválida");
    }

    const token = jwt.sign({ id: user.id, tenantId: user.tenantId }, JWT_SECRET, {
        expiresIn: "7d",
    });

    return {
        token,
        user: {
            id: user.id,
            username: user.username,
            email: user.email,
            name: user.name,
            tenantId: user.tenantId,
        },
    };
}