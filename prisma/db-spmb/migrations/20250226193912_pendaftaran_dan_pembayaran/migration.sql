/*
  Warnings:

  - You are about to drop the column `tsv` on the `sekolah` table. All the data in the column will be lost.
  - You are about to drop the column `tsv_no_stemming` on the `sekolah` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[npsn]` on the table `sekolah` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "Agama" AS ENUM ('Islam', 'Protestan', 'Katolik', 'Hindu', 'Buddha', 'Konghucu', 'Lainnya');

-- CreateEnum
CREATE TYPE "JenisKelamin" AS ENUM ('LakiLaki', 'Perempuan');

-- CreateEnum
CREATE TYPE "JenjangPendidikan" AS ENUM ('SD', 'SMP', 'SMA', 'D1', 'D2', 'D3', 'D4', 'S1', 'S2', 'S3', 'Lainnya');

-- CreateEnum
CREATE TYPE "JenjangDikdasmen" AS ENUM ('SD', 'SMP', 'SMA', 'Lainnya');

-- -- DropIndex
-- DROP INDEX "idx_gin_trgm_alamat";

-- -- DropIndex
-- DROP INDEX "idx_gin_trgm_nama";

-- -- DropIndex
-- DROP INDEX "idx_tsvector";

-- -- DropIndex
-- DROP INDEX "idx_tsvector_no_stemming";

-- -- AlterTable
-- ALTER TABLE "sekolah" DROP COLUMN "tsv",
-- DROP COLUMN "tsv_no_stemming";

-- CreateTable
CREATE TABLE "Siswa" (
    "id" TEXT NOT NULL,
    "nama" VARCHAR NOT NULL,
    "nisn" VARCHAR,
    "nis" VARCHAR,
    "kewarganegaraan" VARCHAR,
    "nik" VARCHAR,
    "paspor" VARCHAR,
    "tempat_lahir" VARCHAR,
    "tanggal_lahir" TIMESTAMP(6) NOT NULL,
    "jenis_kelamin" VARCHAR NOT NULL,
    "agama" "Agama",
    "map_coordinates" VARCHAR,
    "wilayah_administratif_id" VARCHAR NOT NULL,
    "alamat" VARCHAR NOT NULL,
    "rt" VARCHAR,
    "rw" VARCHAR,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Siswa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "spmb" (
    "id" TEXT NOT NULL,
    "sekolahId" TEXT NOT NULL,
    "tahun" INTEGER NOT NULL,
    "tahunAjaran" VARCHAR NOT NULL,
    "nama" VARCHAR NOT NULL,
    "tanggal_mulai" DATE NOT NULL,
    "tanggal_selesai" DATE NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "spmb_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "jalur_pendaftaran_spmb" (
    "id" TEXT NOT NULL,
    "spmb_id" VARCHAR NOT NULL,
    "jalur_pendaftaran_id" VARCHAR NOT NULL,
    "kuota" INTEGER NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "jalur_pendaftaran_spmb_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "jalur_pendaftaran" (
    "id" TEXT NOT NULL,
    "nama" VARCHAR NOT NULL,
    "deskripsi" VARCHAR,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "jalur_pendaftaran_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pendaftaran" (
    "id" TEXT NOT NULL,
    "user_id" VARCHAR NOT NULL,
    "siswa_id" VARCHAR NOT NULL,
    "sekolah_id" VARCHAR NOT NULL,
    "spmb_id" VARCHAR NOT NULL,
    "jalur_id" VARCHAR NOT NULL,
    "faktur_id" VARCHAR,
    "pesan" VARCHAR NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pendaftaran_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "biaya_pendaftaran" (
    "id" TEXT NOT NULL,
    "jalur_pendaftaran_spmb_id" TEXT NOT NULL,
    "nama" VARCHAR NOT NULL,
    "keterangan" VARCHAR,
    "wajib" BOOLEAN NOT NULL DEFAULT false,
    "jenis" VARCHAR NOT NULL,
    "nominal" DECIMAL NOT NULL,
    "tanggal_jatuh_tempo" DATE,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "biaya_pendaftaran_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pembayaran" (
    "id" TEXT NOT NULL,
    "faktur_id" VARCHAR NOT NULL,
    "nominal" DECIMAL NOT NULL,
    "metode_pembayaran" VARCHAR NOT NULL,
    "status" VARCHAR NOT NULL,
    "gpn_parameter_transaksi" JSON,
    "gpn_respon_transaksi" JSON,
    "gpn_status_transaksi" JSON,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pembayaran_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "faktur" (
    "id" TEXT NOT NULL,
    "pendaftaran_id" TEXT NOT NULL,
    "nomor" VARCHAR NOT NULL,
    "tanggal_terbit" DATE NOT NULL,
    "tanggal_jatuh_tempo" DATE NOT NULL,
    "nominal" DECIMAL NOT NULL,
    "status" VARCHAR NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "faktur_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "detil_faktur" (
    "id" TEXT NOT NULL,
    "faktur_id" TEXT NOT NULL,
    "biaya_id" TEXT NOT NULL,
    "nominal" DECIMAL NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "detil_faktur_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "faktur_pendaftaran_id_key" ON "faktur"("pendaftaran_id");

-- CreateIndex
CREATE UNIQUE INDEX "sekolah_npsn_key" ON "sekolah"("npsn");

-- AddForeignKey
ALTER TABLE "jalur_pendaftaran_spmb" ADD CONSTRAINT "jalur_pendaftaran_spmb_spmb_id_fkey" FOREIGN KEY ("spmb_id") REFERENCES "spmb"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "jalur_pendaftaran_spmb" ADD CONSTRAINT "jalur_pendaftaran_spmb_jalur_pendaftaran_id_fkey" FOREIGN KEY ("jalur_pendaftaran_id") REFERENCES "jalur_pendaftaran"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pendaftaran" ADD CONSTRAINT "pendaftaran_siswa_id_fkey" FOREIGN KEY ("siswa_id") REFERENCES "Siswa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pendaftaran" ADD CONSTRAINT "pendaftaran_sekolah_id_fkey" FOREIGN KEY ("sekolah_id") REFERENCES "sekolah"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pendaftaran" ADD CONSTRAINT "pendaftaran_spmb_id_fkey" FOREIGN KEY ("spmb_id") REFERENCES "spmb"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pendaftaran" ADD CONSTRAINT "pendaftaran_jalur_id_fkey" FOREIGN KEY ("jalur_id") REFERENCES "jalur_pendaftaran"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "biaya_pendaftaran" ADD CONSTRAINT "biaya_pendaftaran_jalur_pendaftaran_spmb_id_fkey" FOREIGN KEY ("jalur_pendaftaran_spmb_id") REFERENCES "jalur_pendaftaran_spmb"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pembayaran" ADD CONSTRAINT "pembayaran_faktur_id_fkey" FOREIGN KEY ("faktur_id") REFERENCES "faktur"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "faktur" ADD CONSTRAINT "faktur_pendaftaran_id_fkey" FOREIGN KEY ("pendaftaran_id") REFERENCES "pendaftaran"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "detil_faktur" ADD CONSTRAINT "detil_faktur_faktur_id_fkey" FOREIGN KEY ("faktur_id") REFERENCES "faktur"("id") ON DELETE CASCADE ON UPDATE CASCADE;
