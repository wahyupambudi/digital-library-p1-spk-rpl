/*
  Warnings:

  - The primary key for the `Peminjaman` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[peminjaman_id]` on the table `Peminjaman` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Peminjaman" DROP CONSTRAINT "Peminjaman_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "peminjaman_id" DROP DEFAULT,
ADD CONSTRAINT "Peminjaman_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Peminjaman_peminjaman_id_seq";

-- CreateIndex
CREATE UNIQUE INDEX "Peminjaman_peminjaman_id_key" ON "Peminjaman"("peminjaman_id");
