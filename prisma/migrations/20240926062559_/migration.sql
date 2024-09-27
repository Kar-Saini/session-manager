/*
  Warnings:

  - A unique constraint covering the columns `[ip]` on the table `IP` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `ip` to the `IP` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `IP` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expiresAt` to the `Session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Session` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Location" AS ENUM ('WFO', 'WFH');

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_ipId_fkey";

-- AlterTable
ALTER TABLE "IP" ADD COLUMN     "ip" TEXT NOT NULL,
ADD COLUMN     "location" "Location" NOT NULL;

-- AlterTable
ALTER TABLE "Session" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "expiresAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "lastActiveAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "ipId" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "IP_ip_key" ON "IP"("ip");

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_ipId_fkey" FOREIGN KEY ("ipId") REFERENCES "IP"("id") ON DELETE SET NULL ON UPDATE CASCADE;
