import { prisma } from "../../lib/prisma";
import { compare } from "bcryptjs";

interface VerifyEmailDTO {
  token: string;
  type: "user" | "responsible";
}

export async function verifyEmailService({ token, type }: VerifyEmailDTO) {
  const now = new Date();

  if (type === "user") {
    const user = await prisma.user.findFirst({
      where: {
        emailVerificationTokenExpiresAt: {
          gt: now,
        },
      },
    });

    if (!user) {
      throw new Error("Token inválido");
    }

    const isValid = await compare(token, user.emailVerificationTokenHash);

    if (!isValid) {
      throw new Error("Token inválido");
    }

    await prisma.user.update({
      where: { id: user.id },
      data: {
        emailVerifiedAt: new Date(),
        emailVerificationTokenHash: null,
        emailVerificationTokenExpiresAt: null,
      },
    });
  }
}
