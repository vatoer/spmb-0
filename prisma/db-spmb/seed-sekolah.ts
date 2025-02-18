import { dbSpmb } from "@/lib/db-spmb";
import { DefinedKeys } from "@/types/defined-keys";
import { snakeToCamel } from "@/utils/conversion/snake-to-camel";
import { processCsvFile } from "@/utils/csv/process-file";

interface CsvSekolahWithDynamicKeys {
  id: string;
  nama: string;
  npsn: string;
  status: string;
  bentukPendidikan: string;
  alamat: string;
  mapCoordinates: string;
  kodePos: string;
  dapoWilayahId: string;
  kelurahanDesa: string;
  telp: string;
  email: string;
  website: string;
  akreditasi: string;
  kurikulum: string;
  visi: string;
  misi: string;
  logo: string;
  berandaHtml: string;
  berandaBanner: string;
  berandaPlaintext: string;
  [key: string]: unknown;
}

type CsvSekolah = DefinedKeys<CsvSekolahWithDynamicKeys>;

const CsvSekolahKeys = new Set<keyof CsvSekolah>([
  "id",
  "nama",
  "npsn",
  "status",
  "bentukPendidikan",
  "alamat",
  "mapCoordinates",
  "kodePos",
  "dapoWilayahId",
  "kelurahanDesa",
  "telp",
  "email",
  "website",
  "akreditasi",
  "kurikulum",
  "visi",
  "misi",
  "logo",
  "berandaHtml",
  "berandaBanner",
  "berandaPlaintext",
]);

const seedSekolah = async () => {
  console.log("Truncating sekolah data...");
  await dbSpmb.$executeRaw`TRUNCATE TABLE sekolah`;

  const csvFiles = ["csv/dapo/sekolah.csv"];

  for (const filePath of csvFiles) {
    console.log(`Processing CSV files: ${filePath}`);
    const sekolah = await processCsvFile<CsvSekolah>(filePath, CsvSekolahKeys); // tidak butuh transformFn karena semua kolom string

    if (sekolah.length === 0) {
      console.warn(`No valid records found in ${filePath}, skipping insert.`);
      continue;
    }

    const batchSize = 10000;
    for (let i = 0; i < sekolah.length; i += batchSize) {
      console.log(
        `Inserting batch ${i / batchSize + 1} of ${Math.ceil(
          sekolah.length / batchSize
        )}`
      );
      const batch = sekolah.slice(i, i + batchSize);

      try {
        await dbSpmb.sekolah.createMany({
          data: batch,
          skipDuplicates: true,
        });
      } catch (error) {
        console.error("Error inserting batch:", error);
      }
    }
  }
};

interface CsvDapoWilayahWithDynamicKeys {
  kodeWilayah: string;
  nama: string;
  idLevelWilayah: number;
  mstKodeWilayah: string;
  indukProvinsi: string;
  kodeWilayahIndukProvinsi: string;
  indukKabupaten: string;
  kodeWilayahIndukKabupaten: string;
  [key: string]: unknown;
}

type CsvDapoWilayah = DefinedKeys<CsvDapoWilayahWithDynamicKeys>;

const CsvDapoWilayahKeys = new Set<keyof CsvDapoWilayah>([
  "kodeWilayah",
  "nama",
  "idLevelWilayah",
  "mstKodeWilayah",
  "indukProvinsi",
  "kodeWilayahIndukProvinsi",
  "indukKabupaten",
  "kodeWilayahIndukKabupaten",
]);

const seedDapoWilayah = async () => {
  console.log("Truncating dapo_wilayah data...");
  await dbSpmb.$executeRaw`TRUNCATE TABLE dapo_wilayah`;

  const csvFiles = ["csv/dapo/dapo-wilayah.csv"];

  for (const filePath of csvFiles) {
    console.log(`Processing CSV files: ${filePath}`);
    const transformFn = (
      data: Record<string, string | undefined>
    ): CsvDapoWilayah => {
      const transformedData = snakeToCamel(data) as CsvDapoWilayah;
      if (transformedData.idLevelWilayah) {
        transformedData.idLevelWilayah = Number(transformedData.idLevelWilayah);
      }
      return transformedData;
    };

    const dapoWilayah = await processCsvFile<CsvDapoWilayah>(
      filePath,
      CsvDapoWilayahKeys,
      transformFn
    );

    if (dapoWilayah.length === 0) {
      console.warn(`No valid records found in ${filePath}, skipping insert.`);
      continue;
    }

    const batchSize = 10000;
    for (let i = 0; i < dapoWilayah.length; i += batchSize) {
      console.log(
        `Inserting batch ${i / batchSize + 1} of ${Math.ceil(
          dapoWilayah.length / batchSize
        )}`
      );
      const batch = dapoWilayah.slice(i, i + batchSize);

      try {
        await dbSpmb.dapoWilayah.createMany({
          data: batch,
          skipDuplicates: true,
        });
      } catch (error) {
        console.error("Error inserting batch:", error);
      }
    }
  }
};

const main = async () => {
  try {
    await seedDapoWilayah();
    await seedSekolah();
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  } finally {
    await dbSpmb.$disconnect();
  }
};

void main();
