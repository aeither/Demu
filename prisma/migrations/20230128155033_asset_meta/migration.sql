/*
  Warnings:

  - Added the required column `author` to the `Asset` table without a default value. This is not possible if the table is not empty.
  - Added the required column `thumb` to the `Asset` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Asset` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Asset" ADD COLUMN     "author" TEXT NOT NULL,
ADD COLUMN     "thumb" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;
