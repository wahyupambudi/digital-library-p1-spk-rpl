-- CreateEnum
CREATE TYPE "role" AS ENUM ('administrator', 'petugas', 'peminjam');

-- CreateEnum
CREATE TYPE "status" AS ENUM ('pinjam', 'selesai');

-- CreateTable
CREATE TABLE "users" (
    "userid" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "namalengkap" TEXT NOT NULL,
    "alamat" TEXT NOT NULL,
    "role" "role" NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMPTZ,

    CONSTRAINT "users_pkey" PRIMARY KEY ("userid")
);

-- CreateTable
CREATE TABLE "buku" (
    "bukuid" SERIAL NOT NULL,
    "judul" TEXT NOT NULL,
    "penulis" TEXT NOT NULL,
    "penerbit" TEXT NOT NULL,
    "tahun_terbit" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMPTZ,

    CONSTRAINT "buku_pkey" PRIMARY KEY ("bukuid")
);

-- CreateTable
CREATE TABLE "kategoribuku" (
    "kategoriid" SERIAL NOT NULL,
    "nama_kategori" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMPTZ,

    CONSTRAINT "kategoribuku_pkey" PRIMARY KEY ("kategoriid")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
