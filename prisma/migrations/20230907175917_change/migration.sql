/*
  Warnings:

  - You are about to drop the column `image` on the `Entry` table. All the data in the column will be lost.
  - The primary key for the `List` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `authorId` on the `List` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `List` table. All the data in the column will be lost.
  - You are about to drop the column `private` on the `List` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `List` table. All the data in the column will be lost.
  - The `createdAt` column on the `List` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to alter the column `title` on the `List` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `description` on the `List` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(1000)`.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `username` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(30)`.
  - You are about to drop the `Profile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_EntryToList` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `poster_image` to the `Entry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `creatorId` to the `List` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "List" DROP CONSTRAINT "List_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_userId_fkey";

-- DropForeignKey
ALTER TABLE "_EntryToList" DROP CONSTRAINT "_EntryToList_A_fkey";

-- DropForeignKey
ALTER TABLE "_EntryToList" DROP CONSTRAINT "_EntryToList_B_fkey";

-- AlterTable
ALTER TABLE "Entry" DROP COLUMN "image",
ADD COLUMN     "listId" TEXT,
ADD COLUMN     "poster_image" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "List" DROP CONSTRAINT "List_pkey",
DROP COLUMN "authorId",
DROP COLUMN "image",
DROP COLUMN "private",
DROP COLUMN "updatedAt",
ADD COLUMN     "creatorId" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
DROP COLUMN "createdAt",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "title" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "description" SET DATA TYPE VARCHAR(1000),
ADD CONSTRAINT "List_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "List_id_seq";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "username" SET DATA TYPE VARCHAR(30),
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- DropTable
DROP TABLE "Profile";

-- DropTable
DROP TABLE "_EntryToList";

-- CreateTable
CREATE TABLE "UserProfile" (
    "id" TEXT NOT NULL,
    "avatar" TEXT NOT NULL,
    "banner" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "UserProfile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserProfile_userId_key" ON "UserProfile"("userId");

-- AddForeignKey
ALTER TABLE "UserProfile" ADD CONSTRAINT "UserProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "List" ADD CONSTRAINT "List_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Entry" ADD CONSTRAINT "Entry_listId_fkey" FOREIGN KEY ("listId") REFERENCES "List"("id") ON DELETE SET NULL ON UPDATE CASCADE;
