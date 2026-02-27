import crypto from "crypto";
import { prisma } from "../lib/prisma";
import type { Request, Response } from "express";
import { EmailVerificationType } from "../generated/prisma/enums";

export async function verifyEmailAdminController(req: Request, res: Response) {
  const { token, type } = req.query;

  if (!token || !type) {
    return res.status(400).json({ error: "Token inválido" });
  }

  const tokenHash = crypto
    .createHash("sha256")
    .update(token as string)
    .digest("hex");

  const normalizedType = (type as string).toUpperCase() as keyof typeof EmailVerificationType;
  const enumType = EmailVerificationType[normalizedType];

  if (!enumType) {
    return res.status(400).json({ error: "Tipo de verificação inválido" });
  }

  // 1. Busca a verificação
  const verification = await prisma.emailVerification.findFirst({
    where: {
      tokenHash,
      type: enumType,
      verified: false,
      expiresAt: { gt: new Date() },
    },
  });

  if (!verification) {
    return res.status(400).json({ error: "Token inválido ou expirado" });
  }

  try {
    // 2. Inicia a transação com a correção do updateMany
    await prisma.$transaction(async (tx) => {
      if (verification.userId) {
        // Buscamos na tabela memberships onde o userId coincide
        const updateResult = await tx.memberships.updateMany({
          where: {
            userId: verification.userId, 
          },
          data: {
            emailVerified: true,
            state: "ACTIVE",
          },
        });

        // Se count for 0, significa que o ID existe na verificação mas não na tabela de membros
        if (updateResult.count === 0) {
          throw new Error("Nenhum membro encontrado para este usuário");
        }
      }

      // 3. Marca o token como utilizado
      await tx.emailVerification.update({
        where: { id: verification.id },
        data: { verified: true },
      });
    });

    return res.json({ message: "Email confirmado com sucesso" });

  } catch (error) {
    console.error("Erro na transação de verificação:", error);
    return res.status(500).json({ error: "Erro interno ao processar verificação" });
  }
}