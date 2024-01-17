-- CreateTable
CREATE TABLE "Kategori_buku_relasi" (
    "id" SERIAL NOT NULL,
    "kategori_buku_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMPTZ,
    "kategoriid" INTEGER NOT NULL,
    "bukuid" INTEGER NOT NULL,

    CONSTRAINT "Kategori_buku_relasi_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Kategori_buku_relasi_kategori_buku_id_key" ON "Kategori_buku_relasi"("kategori_buku_id");

-- AddForeignKey
ALTER TABLE "Kategori_buku_relasi" ADD CONSTRAINT "Kategori_buku_relasi_kategoriid_fkey" FOREIGN KEY ("kategoriid") REFERENCES "Kategoribuku"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Kategori_buku_relasi" ADD CONSTRAINT "Kategori_buku_relasi_bukuid_fkey" FOREIGN KEY ("bukuid") REFERENCES "Buku"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
