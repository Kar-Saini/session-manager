/*
  Warnings:

  - Added the required column `userId` to the `IP` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "IP" ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "IP" ADD CONSTRAINT "IP_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
