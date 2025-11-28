-- CreateEnum
CREATE TYPE "State" AS ENUM ('ACTIVE', 'DISABLED', 'DELETED');

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "state" "State" NOT NULL DEFAULT 'ACTIVE';
