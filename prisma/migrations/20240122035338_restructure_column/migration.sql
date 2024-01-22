-- CreateTable
CREATE TABLE "Kategori_buku_relasi" (
    "id" SERIAL NOT NULL,
    "kategori_buku_id" INTEGER NOT NULL,
    "bukuid" INTEGER NOT NULL,
    "kategoriid" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMPTZ,

    CONSTRAINT "Kategori_buku_relasi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ulasanbuku" (
    "id" SERIAL NOT NULL,
    "ulasan_id" INTEGER NOT NULL,
    "userid" INTEGER NOT NULL,
    "bukuid" INTEGER NOT NULL,
    "ulasan" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMPTZ,

    CONSTRAINT "Ulasanbuku_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Peminjaman" (
    "peminjaman_id" SERIAL NOT NULL,
    "userid" INTEGER NOT NULL,
    "bukuid" INTEGER NOT NULL,
    "tanggal_peminjaman" DATE NOT NULL,
    "tanggal_pengembalian" DATE NOT NULL,
    "status_peminjaman" "status" NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMPTZ,

    CONSTRAINT "Peminjaman_pkey" PRIMARY KEY ("peminjaman_id")
);

-- CreateTable
CREATE TABLE "Koleksipribadi" (
    "koleksi_id" SERIAL NOT NULL,
    "userid" INTEGER NOT NULL,
    "bukuid" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMPTZ,

    CONSTRAINT "Koleksipribadi_pkey" PRIMARY KEY ("koleksi_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Kategori_buku_relasi_kategori_buku_id_key" ON "Kategori_buku_relasi"("kategori_buku_id");

-- CreateIndex
CREATE UNIQUE INDEX "Ulasanbuku_ulasan_id_key" ON "Ulasanbuku"("ulasan_id");

-- AddForeignKey
ALTER TABLE "Kategori_buku_relasi" ADD CONSTRAINT "Kategori_buku_relasi_bukuid_fkey" FOREIGN KEY ("bukuid") REFERENCES "Buku"("bukuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Kategori_buku_relasi" ADD CONSTRAINT "Kategori_buku_relasi_kategoriid_fkey" FOREIGN KEY ("kategoriid") REFERENCES "Kategoribuku"("kategoriid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ulasanbuku" ADD CONSTRAINT "Ulasanbuku_userid_fkey" FOREIGN KEY ("userid") REFERENCES "Users"("userid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ulasanbuku" ADD CONSTRAINT "Ulasanbuku_bukuid_fkey" FOREIGN KEY ("bukuid") REFERENCES "Buku"("bukuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Peminjaman" ADD CONSTRAINT "Peminjaman_userid_fkey" FOREIGN KEY ("userid") REFERENCES "Users"("userid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Peminjaman" ADD CONSTRAINT "Peminjaman_bukuid_fkey" FOREIGN KEY ("bukuid") REFERENCES "Buku"("bukuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Koleksipribadi" ADD CONSTRAINT "Koleksipribadi_userid_fkey" FOREIGN KEY ("userid") REFERENCES "Users"("userid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Koleksipribadi" ADD CONSTRAINT "Koleksipribadi_bukuid_fkey" FOREIGN KEY ("bukuid") REFERENCES "Buku"("bukuid") ON DELETE RESTRICT ON UPDATE CASCADE;
