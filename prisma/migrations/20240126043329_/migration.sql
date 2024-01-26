/*
  Warnings:

  - The primary key for the `Koleksipribadi` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[koleksi_id]` on the table `Koleksipribadi` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Koleksipribadi" DROP CONSTRAINT "Koleksipribadi_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "koleksi_id" DROP DEFAULT,
ADD CONSTRAINT "Koleksipribadi_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Koleksipribadi_koleksi_id_seq";

-- CreateIndex
CREATE UNIQUE INDEX "Koleksipribadi_koleksi_id_key" ON "Koleksipribadi"("koleksi_id");
