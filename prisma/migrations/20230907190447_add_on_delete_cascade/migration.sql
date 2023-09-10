-- DropForeignKey
ALTER TABLE "List" DROP CONSTRAINT "List_creatorId_fkey";

-- AddForeignKey
ALTER TABLE "List" ADD CONSTRAINT "List_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
