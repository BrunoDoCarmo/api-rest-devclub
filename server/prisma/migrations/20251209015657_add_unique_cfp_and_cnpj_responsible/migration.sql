/*
  Warnings:

  - A unique constraint covering the columns `[cpf]` on the table `responsible` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[cnpj]` on the table `responsible` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "responsible_cpf_key" ON "responsible"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "responsible_cnpj_key" ON "responsible"("cnpj");
