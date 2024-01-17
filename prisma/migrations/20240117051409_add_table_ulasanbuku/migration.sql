-- CreateTable
CREATE TABLE "Ulasanbuku" (
    "id" SERIAL NOT NULL,
    "ulasan_id" INTEGER NOT NULL,
    "ulasan" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMPTZ,
    "userid" INTEGER NOT NULL,
    "bukuid" INTEGER NOT NULL,

    CONSTRAINT "Ulasanbuku_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Ulasanbuku_ulasan_id_key" ON "Ulasanbuku"("ulasan_id");

-- AddForeignKey
ALTER TABLE "Ulasanbuku" ADD CONSTRAINT "Ulasanbuku_userid_fkey" FOREIGN KEY ("userid") REFERENCES "Users"("userid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ulasanbuku" ADD CONSTRAINT "Ulasanbuku_bukuid_fkey" FOREIGN KEY ("bukuid") REFERENCES "Buku"("bukuid") ON DELETE RESTRICT ON UPDATE CASCADE;
