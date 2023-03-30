/*
  Warnings:

  - You are about to drop the column `endDate` on the `Trip` table. All the data in the column will be lost.
  - You are about to drop the column `ownerId` on the `Trip` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `Trip` table. All the data in the column will be lost.
  - Added the required column `content` to the `Trip` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Trip" DROP COLUMN "endDate",
DROP COLUMN "ownerId",
DROP COLUMN "startDate",
ADD COLUMN     "content" TEXT NOT NULL;
