/*
  Warnings:

  - You are about to drop the `Kategori_buku_relasi` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Koleksipribadi` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Peminjaman` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Ulasanbuku` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Kategori_buku_relasi" DROP CONSTRAINT "Kategori_buku_relasi_bukuid_fkey";

-- DropForeignKey
ALTER TABLE "Kategori_buku_relasi" DROP CONSTRAINT "Kategori_buku_relasi_kategoriid_fkey";

-- DropForeignKey
ALTER TABLE "Koleksipribadi" DROP CONSTRAINT "Koleksipribadi_bukuid_fkey";

-- DropForeignKey
ALTER TABLE "Koleksipribadi" DROP CONSTRAINT "Koleksipribadi_userid_fkey";

-- DropForeignKey
ALTER TABLE "Peminjaman" DROP CONSTRAINT "Peminjaman_bukuid_fkey";

-- DropForeignKey
ALTER TABLE "Peminjaman" DROP CONSTRAINT "Peminjaman_userid_fkey";

-- DropForeignKey
ALTER TABLE "Ulasanbuku" DROP CONSTRAINT "Ulasanbuku_bukuid_fkey";

-- DropForeignKey
ALTER TABLE "Ulasanbuku" DROP CONSTRAINT "Ulasanbuku_userid_fkey";

-- DropTable
DROP TABLE "Kategori_buku_relasi";

-- DropTable
DROP TABLE "Koleksipribadi";

-- DropTable
DROP TABLE "Peminjaman";

-- DropTable
DROP TABLE "Ulasanbuku";
