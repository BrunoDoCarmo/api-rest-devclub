import crypto from "crypto";
import { prisma } from "../lib/prisma";
import type { Request, Response } from "express";

export async function verifyEmailController(req: Request, res: Response) {
  const { token, type } = req.query;

  if (!token || !type) {
    return res.status(400).json({ error: "Token inválido" });
  }

  const tokenHash = crypto
    .createHash("sha256")
    .update(token as string)
    .digest("hex");

  const verification = await prisma.emailVerification.findFirst({
    where: {
      tokenHash,
      type: type === "user" ? "USER" : "RESPONSIBLE",
      verified: false,
      expiresAt: { gt: new Date() },
    },
  });

  if (!verification) {
    return res.status(400).json({ error: "Token inválido ou expirado" });
  }

  await prisma.$transaction(async (tx) => {
    if (verification.userId) {
      await tx.user.update({
        where: { id: verification.userId },
        data: { emailVerified: true },
      });
    }

    await tx.emailVerification.update({
      where: { id: verification.id },
      data: { verified: true },
    });
  });

  return res.json({ message: "Email confirmado com sucesso" });
}
