-- AlterTable
ALTER TABLE "Issue" ADD COLUMN     "assigneeToUserId" VARCHAR(255);

-- AddForeignKey
ALTER TABLE "Issue" ADD CONSTRAINT "Issue_assigneeToUserId_fkey" FOREIGN KEY ("assigneeToUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
