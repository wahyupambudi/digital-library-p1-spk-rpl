-- CreateTable
CREATE TABLE "Koleksipribadi" (
    "koleksi_id" SERIAL NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMPTZ,
    "userid" INTEGER NOT NULL,
    "bukuid" INTEGER NOT NULL,

    CONSTRAINT "Koleksipribadi_pkey" PRIMARY KEY ("koleksi_id")
);

-- AddForeignKey
ALTER TABLE "Koleksipribadi" ADD CONSTRAINT "Koleksipribadi_userid_fkey" FOREIGN KEY ("userid") REFERENCES "Users"("userid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Koleksipribadi" ADD CONSTRAINT "Koleksipribadi_bukuid_fkey" FOREIGN KEY ("bukuid") REFERENCES "Buku"("bukuid") ON DELETE RESTRICT ON UPDATE CASCADE;
