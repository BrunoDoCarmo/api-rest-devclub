/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `emailverification` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "emailverification_email_key" ON "emailverification"("email");
