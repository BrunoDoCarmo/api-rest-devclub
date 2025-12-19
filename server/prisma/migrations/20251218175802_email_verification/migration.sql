/*
  Warnings:

  - You are about to drop the column `emailVerified` on the `responsible` table. All the data in the column will be lost.
  - You are about to drop the `emailVerification` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "emailVerification" DROP CONSTRAINT "emailVerification_userId_fkey";

-- AlterTable
ALTER TABLE "responsible" DROP COLUMN "emailVerified";

-- DropTable
DROP TABLE "emailVerification";

-- CreateTable
CREATE TABLE "emailverification" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "tokenHash" TEXT NOT NULL,
    "type" "EmailVerificationType" NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "emailverification_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "emailverification" ADD CONSTRAINT "emailverification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
