-- DropForeignKey
ALTER TABLE "Kategori_buku_relasi" DROP CONSTRAINT "Kategori_buku_relasi_bukuid_fkey";

-- DropForeignKey
ALTER TABLE "Kategori_buku_relasi" DROP CONSTRAINT "Kategori_buku_relasi_kategoriid_fkey";

-- AddForeignKey
ALTER TABLE "Kategori_buku_relasi" ADD CONSTRAINT "Kategori_buku_relasi_kategoriid_fkey" FOREIGN KEY ("kategoriid") REFERENCES "Kategoribuku"("kategoriid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Kategori_buku_relasi" ADD CONSTRAINT "Kategori_buku_relasi_bukuid_fkey" FOREIGN KEY ("bukuid") REFERENCES "Buku"("bukuid") ON DELETE RESTRICT ON UPDATE CASCADE;
