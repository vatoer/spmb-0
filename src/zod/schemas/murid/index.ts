import { parseNomorInduk } from "@/utils/kependudukan";
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
  "LAINNYA" = "-",
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

export enum RentangPendapatan {
  "TidakBerpendapatan" = "Tidak berpendapatan",
  "KurangDari1Juta" = "Kurang dari 1 juta",
  "1JutaSampai2Juta" = "1 juta sampai 2 juta",
  "2JutaSampai3Juta" = "2 juta sampai 3 juta",
  "3JutaSampai5Juta" = "3 juta sampai 5 juta",
  "5JutaSampai10Juta" = "5 juta sampai 10 juta",
  "LebihDari10Juta" = "Lebih dari 10 juta",
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
  jenjangPendidikan: z
    .string()
    .min(1, { message: "Pilih pendidikan" })
    .max(255), //jenjangPendidikanSchema,
  pekerjaan: z.string().min(1, { message: "Pilih pekerjaan" }).max(255),
  pendapatan: z
    .string()
    .min(1, { message: "Pilih rentang pendapatan" })
    .max(255), //z.coerce.number().default(0).optional(),
});

export const dataOrangTuaSchema = z.object({
  ayah: ortuSchema,
  ibu: ortuSchema,
});

export type DataOrangTua = z.infer<typeof dataOrangTuaSchema>;

export type Ortu = z.infer<typeof ortuSchema>;

export const genericTanggalSchema = z
  .string()
  .refine(
    (val) => {
      const date = new Date(val);
      return !isNaN(date.getTime());
    },
    { message: "Invalid date" }
  )
  .transform((val) => new Date(val));

export enum Agama {
  Islam = "Islam",
  Protestan = "Protestan",
  Katolik = "Katolik",
  Hindu = "Hindu",
  Buddha = "Buddha",
  Konghucu = "Konghucu",
  Lainnya = "-",
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
  "SESUAI_DOMISILI_PANTI_ASUHAN",
  "LAINNYA",
]);

export const domisiliSchema = z.object({
  statusDomisili: StatusDomisiliEnum,
  alamat: z.string().min(3).max(255),
  wilayah: z.string().min(2).max(10),
  provinsi: z.string().min(2).max(2),
  kotaKabupaten: z.string().min(4).max(4),
  kecamatan: z.string().min(6).max(6),
  desaKelurahan: z.string().min(10).max(10),
  rt: z.string().min(1).max(3),
  rw: z.string().min(1).max(3),
});

export type Domisili = z.infer<typeof domisiliSchema>;

export const baseSchema = z.object({
  nama: z.string().min(3).max(255),
  kk: z.string().min(16).max(16).optional(),
  nik: z
    .string()
    .min(16)
    .max(16)
    .regex(/^\d+$/, "NIK hanya boleh berisi angka"),
  nisn: z.string().min(10).max(10).optional(),
  tempatLahir: z.string().min(3).max(255),
  tanggalLahir: z.date(),
  jenisKelamin: jenisKelaminSchema,
  agama: agamaSchema,
  golonganDarah: golonganDarahSchema,
  jenjangDikdasmen: jenjangDikdasmenSchema,
});

// Merging the schemas
export const dataDiriSchema = baseSchema.merge(domisiliSchema).extend({
  nik: baseSchema.shape.nik.refine(
    (val) => parseNomorInduk(val) !== null, // ✅ Implicit return
    { message: "NIK tidak valid" }
  ),
});

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
