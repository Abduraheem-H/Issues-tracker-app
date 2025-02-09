/*
  Warnings:

  - You are about to drop the column `assigneeToUserId` on the `Issue` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Issue" DROP CONSTRAINT "Issue_assigneeToUserId_fkey";

-- AlterTable
ALTER TABLE "Issue" DROP COLUMN "assigneeToUserId",
ADD COLUMN     "assignedToUserId" VARCHAR(255);

-- AddForeignKey
ALTER TABLE "Issue" ADD CONSTRAINT "Issue_assignedToUserId_fkey" FOREIGN KEY ("assignedToUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
