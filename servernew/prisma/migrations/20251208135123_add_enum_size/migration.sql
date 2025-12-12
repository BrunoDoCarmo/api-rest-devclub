/*
  Warnings:

  - Changed the type of `size` on the `Tenant` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Size" AS ENUM ('SMALL', 'MEDIUM', 'LARGE');

-- AlterTable
ALTER TABLE "Tenant" DROP COLUMN "size",
ADD COLUMN     "size" "Size" NOT NULL;
