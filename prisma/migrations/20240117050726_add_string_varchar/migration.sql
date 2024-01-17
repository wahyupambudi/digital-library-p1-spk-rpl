/*
  Warnings:

  - You are about to alter the column `judul` on the `Buku` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `penulis` on the `Buku` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `penerbit` on the `Buku` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `nama_kategori` on the `Kategoribuku` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `username` on the `Users` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `password` on the `Users` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `email` on the `Users` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `namalengkap` on the `Users` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.

*/
-- AlterTable
ALTER TABLE "Buku" ALTER COLUMN "judul" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "penulis" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "penerbit" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "Kategoribuku" ALTER COLUMN "nama_kategori" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "Users" ALTER COLUMN "username" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "password" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "email" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "namalengkap" SET DATA TYPE VARCHAR(255);
