-- CreateTable
CREATE TABLE "Peminjaman" (
    "peminjaman_id" SERIAL NOT NULL,
    "tanggal_peminjaman" DATE NOT NULL,
    "tanggal_pengembalian" DATE NOT NULL,
    "status_peminjaman" "status" NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMPTZ,
    "userid" INTEGER NOT NULL,
    "bukuid" INTEGER NOT NULL,

    CONSTRAINT "Peminjaman_pkey" PRIMARY KEY ("peminjaman_id")
);

-- AddForeignKey
ALTER TABLE "Peminjaman" ADD CONSTRAINT "Peminjaman_userid_fkey" FOREIGN KEY ("userid") REFERENCES "Users"("userid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Peminjaman" ADD CONSTRAINT "Peminjaman_bukuid_fkey" FOREIGN KEY ("bukuid") REFERENCES "Buku"("bukuid") ON DELETE RESTRICT ON UPDATE CASCADE;
