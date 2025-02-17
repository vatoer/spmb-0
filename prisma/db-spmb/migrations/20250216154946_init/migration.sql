-- CreateTable
CREATE TABLE "wilayah_administratif" (
    "id" TEXT NOT NULL,
    "nama" VARCHAR NOT NULL,
    "induk_id" VARCHAR,
    "tingkat" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "wilayah_administratif_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dapo_wilayah" (
    "kode_wilayah" VARCHAR NOT NULL,
    "nama" VARCHAR NOT NULL,
    "id_level_wilayah" INTEGER NOT NULL,
    "mst_kode_wilayah" VARCHAR,
    "induk_provinsi" VARCHAR,
    "kode_wilayah_induk_provinsi" VARCHAR,
    "induk_kabupaten" VARCHAR,
    "kode_wilayah_induk_kabupaten" VARCHAR,

    CONSTRAINT "dapo_wilayah_pkey" PRIMARY KEY ("kode_wilayah")
);

-- CreateTable
CREATE TABLE "sekolah" (
    "id" TEXT NOT NULL,
    "nama" VARCHAR NOT NULL,
    "npsn" CHAR(8),
    "status" VARCHAR,
    "bentuk_pendidikan" TEXT,
    "alamat" VARCHAR NOT NULL,
    "map_coordinates" VARCHAR,
    "kode_pos" VARCHAR,
    "dapo_wilayah_id" VARCHAR,
    "kelurahan_desa" VARCHAR,
    "telp" VARCHAR,
    "email" VARCHAR,
    "website" VARCHAR,
    "akreditasi" VARCHAR,
    "kurikulum" VARCHAR,
    "visi" VARCHAR,
    "misi" VARCHAR,
    "fasilitas" VARCHAR[],
    "logo" VARCHAR,
    "beranda_html" TEXT,
    "beranda_banner" VARCHAR,
    "beranda_plaintext" TEXT,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "sekolah_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "wilayah_administratif" ADD CONSTRAINT "wilayah_administratif_induk_id_fkey" FOREIGN KEY ("induk_id") REFERENCES "wilayah_administratif"("id") ON DELETE SET NULL ON UPDATE CASCADE;
