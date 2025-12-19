/*
  Warnings:

  - The values [RESPONSIBLE] on the enum `EmailVerificationType` will be removed. If these variants are still used in the database, this will fail.
  - A unique constraint covering the columns `[email]` on the table `emailverification` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `responsible` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "EmailVerificationType_new" AS ENUM ('USER');
ALTER TABLE "emailverification" ALTER COLUMN "type" TYPE "EmailVerificationType_new" USING ("type"::text::"EmailVerificationType_new");
ALTER TYPE "EmailVerificationType" RENAME TO "EmailVerificationType_old";
ALTER TYPE "EmailVerificationType_new" RENAME TO "EmailVerificationType";
DROP TYPE "public"."EmailVerificationType_old";
COMMIT;

-- CreateIndex
CREATE UNIQUE INDEX "emailverification_email_key" ON "emailverification"("email");

-- CreateIndex
CREATE UNIQUE INDEX "responsible_email_key" ON "responsible"("email");
