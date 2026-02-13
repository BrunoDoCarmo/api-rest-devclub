import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken';
import { prisma } from '../lib/prisma';

interface MyTokenPayload {
    email: string
}

export class EsqueceuSenhaResetService {
    async execute(token: string, password: string) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET as string) as MyTokenPayload;
            const email = decoded.email;

            const user = await prisma.user.findUnique({
                where: { email }
            });

            if (!user) {
                throw new Error("Usuário não encontrado.");
            }

            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(password, salt);

            await prisma.user.update({
                where: { email },
                data: { 
                    password: hashPassword,
                }
            });

            return { message: "Senha atualizada com sucesso" };
            
        } catch (error) {
            throw new Error("Token inválido ou expirado.");
        }
    }
}