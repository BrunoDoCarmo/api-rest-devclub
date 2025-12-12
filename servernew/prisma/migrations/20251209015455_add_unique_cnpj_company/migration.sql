/*
  Warnings:

  - A unique constraint covering the columns `[cnpj]` on the table `company_data` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "company_data_cnpj_key" ON "company_data"("cnpj");
