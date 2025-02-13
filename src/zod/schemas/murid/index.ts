import { z } from "zod";

export enum JenisKelamin {
  LakiLaki = "Laki-laki",
  Perempuan = "Perempuan",
}

export const jenisKelaminSchema = z.nativeEnum(JenisKelamin, {
  errorMap: () => ({ message: "Pilih jenis kelamin" }),
});

export enum JenjangDikdasmen {
  "SD" = "SD",
  "SMP" = "SMP",
  "SMA" = "SMA",
}

export const jenjangDikdasmenSchema = z.nativeEnum(JenjangDikdasmen, {
  errorMap: () => ({ message: "Pilih Jenjang" }),
});

export enum JenjangPendidikan {
  SD = "SD",
  SMP = "SMP",
  SMA = "SMA",
  D1 = "D1",
  D2 = "D2",
  D3 = "D3",
  D4 = "D4",
  S1 = "S1",
  S2 = "S2",
  S3 = "S3",
  Lainnya = "Lainnya",
}

export const jenjangPendidikanSchema = z.nativeEnum(JenjangPendidikan, {
  errorMap: () => ({ message: "Pilih pendidikan" }),
});

export enum Pekerjaan {
  "Petani" = "Petani",
  "Pedagang" = "Pedagang",
  "Sopir" = "Sopir",
  "Nelayan" = "Nelayan",
  "Buruh" = "Buruh",
  "Wiraswasta" = "Wiraswasta",
  "Wirausaha" = "Wirausaha",
  "PegawaiSwasta" = "Pegawai Swasta",
  "PegawaiBUMN" = "Pegawai BUMN",
  "PNS" = "PNS",
  "TNI" = "TNI",
  "POLRI" = "POLRI",
  "IbuRumahTangga" = "Ibu Rumah Tangga",
  "PelajarMahasiswa" = "Pelajar/Mahasiswa",
  "Pensiunan" = "Pensiunan",
  "TidakBekerja" = "Tidak Bekerja",
  "Lainnya" = "Lain-lain",
}

export const pekerjaanSchema = z.nativeEnum(Pekerjaan, {
  errorMap: () => ({ message: "Pilih Pekerjaan" }),
});

export const ortuSchema = z.object({
  nama: z.string().min(3).max(255),
  nik: z.string().min(16).max(16),
  kk: z.string().min(16).max(16),
  jenisKelamin: jenisKelaminSchema,
  tahunWafat: z.coerce.number().optional().nullable(),
  jenjangPendidikan: jenjangPendidikanSchema,
  pekerjaan: pekerjaanSchema,
  penghasilan: z.coerce.number().default(0).optional(),
});

export const dataOrangTuaSchema = z.object({
  ayah: ortuSchema,
  ibu: ortuSchema,
});

export type DataOrangTua = z.infer<typeof dataOrangTuaSchema>;

export type Ortu = z.infer<typeof ortuSchema>;

export const genericTanggalSchema = z.coerce
  .date()
  .min(new Date("1900-01-01"), { message: "Too old" });

export enum Agama {
  Islam = "Islam",
  Protestan = "Protestan",
  Katolik = "Katolik",
  Hindu = "Hindu",
  Buddha = "Buddha",
  Konghucu = "Konghucu",
  Lainnya = "Lainnya",
}

export const agamaSchema = z.nativeEnum(Agama, {
  errorMap: () => ({ message: "Pilih Agama" }),
});

export enum GolonganDarah {
  "A" = "A",
  "B" = "B",
  "AB" = "AB",
  "O" = "O",
  "TIDAK_TAHU" = "Tidak tahu",
}

export const golonganDarahSchema = z.nativeEnum(GolonganDarah, {
  errorMap: () => ({ message: "Pilih Golongan darah" }),
});

export const StatusDomisiliEnum = z.enum([
  "SESUAI_KK",
  "SURAT_PINDAH",
  "SESUAI_DOMISILI_PONDOK",
  "SESUAI_DOMISILI_PANTIASUHAN",
  "LAINNYA",
]);

export const domisiliSchema = z.object({
  statusDomisili: StatusDomisiliEnum,
  alamat: z.string().min(3).max(255),
  provinsi: z.string().min(3).max(255),
  kotaKabupaten: z.string().min(3).max(255),
  kecamatan: z.string().min(3).max(255),
  kelurahan: z.string().min(3).max(255),
  rt: z.string().min(1).max(3),
  rw: z.string().min(1).max(3),
});

export type Domisili = z.infer<typeof domisiliSchema>;

export const baseSchema = z.object({
  nama: z.string().min(3).max(255),
  kk: z.string().min(16).max(16).optional(),
  nik: z.string().min(16).max(16).optional(),
  nisn: z.string().min(10).max(10).optional(),
  tempatLahir: z.string().min(3).max(255),
  tanggalLahir: genericTanggalSchema,
  jenisKelamin: jenisKelaminSchema,
  agama: agamaSchema,
  golonganDarah: golonganDarahSchema,
  jenjangDikdasmen: jenjangDikdasmenSchema,
});

// Merging the schemas
export const dataDiriSchema = baseSchema.merge(domisiliSchema);

export type DataDiri = z.infer<typeof dataDiriSchema>;

export const dataSekolahAsalSchema = z.object({
  npsn: z
    .string()
    .min(1, {
      message:
        "nisn sekolah tidak boleh kosong, isi dengan tanda - jika tidak ada",
    })
    .max(8)
    .optional(),
  namaSekolah: z
    .string()
    .min(1, {
      message:
        "Nama sekolah tidak boleh kosong, isi dengan tanda - jika tidak ada",
    })
    .max(255),
  alamatSekolah: z
    .string()
    .min(1, {
      message: "Isi dengan tanda - jika tidak ada",
    })
    .max(255),
  tahunMasuk: z.coerce.number().optional(), // before we can use tahunMasuk: z.string().optional().transform(Number),
  tahunLulus: z.coerce.number().optional(),
});

export type DataSekolahAsal = z.infer<typeof dataSekolahAsalSchema>;
