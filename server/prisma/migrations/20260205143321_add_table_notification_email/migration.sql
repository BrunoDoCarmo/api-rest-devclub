-- CreateTable
CREATE TABLE "NotificationEmail" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "tenantId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "NotificationEmail_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "NotificationEmail" ADD CONSTRAINT "NotificationEmail_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
