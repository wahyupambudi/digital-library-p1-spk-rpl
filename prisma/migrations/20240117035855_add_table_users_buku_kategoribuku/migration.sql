/*
  Warnings:

  - The primary key for the `buku` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `kategoribuku` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[bukuid]` on the table `buku` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[kategoriid]` on the table `kategoribuku` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userid]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "buku" DROP CONSTRAINT "buku_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "bukuid" DROP DEFAULT,
ADD CONSTRAINT "buku_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "buku_bukuid_seq";

-- AlterTable
ALTER TABLE "kategoribuku" DROP CONSTRAINT "kategoribuku_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "kategoriid" DROP DEFAULT,
ADD CONSTRAINT "kategoribuku_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "kategoribuku_kategoriid_seq";

-- AlterTable
ALTER TABLE "users" DROP CONSTRAINT "users_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "userid" DROP DEFAULT,
ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "users_userid_seq";

-- CreateIndex
CREATE UNIQUE INDEX "buku_bukuid_key" ON "buku"("bukuid");

-- CreateIndex
CREATE UNIQUE INDEX "kategoribuku_kategoriid_key" ON "kategoribuku"("kategoriid");

-- CreateIndex
CREATE UNIQUE INDEX "users_userid_key" ON "users"("userid");
