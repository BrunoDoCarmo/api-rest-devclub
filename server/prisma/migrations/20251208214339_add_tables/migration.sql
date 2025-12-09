/*
  Warnings:

  - Added the required column `updatedAt` to the `tenant` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Type_Responsible" AS ENUM ('PHYSICAL', 'LEGAL');

-- CreateEnum
CREATE TYPE "Regime" AS ENUM ('ICMS_TAXPAYER', 'EXEMPT_FROM_REGISTRATION', 'NON_TAXPAYER');

-- AlterTable
ALTER TABLE "tenant" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "responsible" (
    "id" TEXT NOT NULL,
    "type" "Type_Responsible" NOT NULL,
    "name" TEXT NOT NULL,
    "cpf" TEXT,
    "cnpj" TEXT,
    "public_place" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "complement" TEXT,
    "cep" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "uf" TEXT NOT NULL,
    "telephone1" TEXT,
    "telephone2" TEXT,
    "cell_phone1" TEXT NOT NULL,
    "cell_phone2" TEXT,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "tenantId" TEXT NOT NULL,
    "state" "State" NOT NULL DEFAULT 'ACTIVE',

    CONSTRAINT "responsible_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "empresa_dados" (
    "id" TEXT NOT NULL,
    "company_name" TEXT NOT NULL,
    "fantasy" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "ie" TEXT,
    "public_place" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "complement" TEXT,
    "cep" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "uf" TEXT NOT NULL,
    "telephone1" TEXT,
    "telephone2" TEXT,
    "cell_phone1" TEXT NOT NULL,
    "cell_phone2" TEXT,
    "email" TEXT NOT NULL,
    "site" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "responsibleId" TEXT NOT NULL,
    "state" "State" NOT NULL DEFAULT 'ACTIVE',

    CONSTRAINT "empresa_dados_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "customer" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cpf" TEXT,
    "cnpj" TEXT,
    "ie" TEXT,
    "regime" "Regime" NOT NULL DEFAULT 'ICMS_TAXPAYER',
    "public_place" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "complement" TEXT,
    "cep" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "uf" TEXT NOT NULL,
    "telephone1" TEXT,
    "telephone2" TEXT,
    "cell_phone1" TEXT NOT NULL,
    "cell_phone2" TEXT,
    "email" TEXT NOT NULL,
    "contact" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "responsibleId" TEXT NOT NULL,
    "state" "State" NOT NULL DEFAULT 'ACTIVE',

    CONSTRAINT "customer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "responsible_tenantId_key" ON "responsible"("tenantId");

-- CreateIndex
CREATE UNIQUE INDEX "customer_cpf_key" ON "customer"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "customer_cnpj_key" ON "customer"("cnpj");

-- AddForeignKey
ALTER TABLE "responsible" ADD CONSTRAINT "responsible_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "empresa_dados" ADD CONSTRAINT "empresa_dados_responsibleId_fkey" FOREIGN KEY ("responsibleId") REFERENCES "responsible"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customer" ADD CONSTRAINT "customer_responsibleId_fkey" FOREIGN KEY ("responsibleId") REFERENCES "responsible"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
