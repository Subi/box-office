/*
  Warnings:

  - You are about to drop the column `EntryId` on the `Entry` table. All the data in the column will be lost.
  - Added the required column `entreyId` to the `Entry` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Entry" DROP COLUMN "EntryId",
ADD COLUMN     "entreyId" INTEGER NOT NULL;
