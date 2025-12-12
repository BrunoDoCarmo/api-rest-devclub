/*
  Warnings:

  - You are about to drop the `empresa_dados` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "empresa_dados" DROP CONSTRAINT "empresa_dados_responsibleId_fkey";

-- DropTable
DROP TABLE "empresa_dados";

-- CreateTable
CREATE TABLE "company_data" (
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

    CONSTRAINT "company_data_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "company_data" ADD CONSTRAINT "company_data_responsibleId_fkey" FOREIGN KEY ("responsibleId") REFERENCES "responsible"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
