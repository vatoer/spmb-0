import { dbSpmb } from "@/lib/db-spmb";
import csv from "csv-parser";
import fs from "fs";
import path from "path";
import { camelCase } from "lodash";

interface CsvSekolah {
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
}

const csvSekolahKeys = new Set<keyof CsvSekolah>([
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

const snakeToCamel = <T extends Record<string, string | undefined>>(
  obj: T
): Partial<Record<keyof CsvSekolah, string>> => {
  const result: Partial<Record<keyof CsvSekolah, string>> = {};
  for (const [key, value] of Object.entries(obj)) {
    const camelKey = camelCase(key) as keyof CsvSekolah;
    if (csvSekolahKeys.has(camelKey)) {
      result[camelKey] = value ?? "";
    }
  }
  return result;
};

const processCsvFile = async (filePath: string): Promise<CsvSekolah[]> => {
  const fullPath = path.resolve(process.cwd(), filePath);
  console.log(`Processing file: ${fullPath}`);

  return new Promise<CsvSekolah[]>((resolve, reject) => {
    const sekolah: CsvSekolah[] = [];
    let recordCount = 0;

    fs.createReadStream(fullPath)
      .pipe(csv({ separator: ";" }))
      .on("data", (data: Record<string, string | undefined>) => {
        recordCount++;
        if (recordCount % 1000 === 0) {
          process.stdout.write(".");
        }

        const transformedData = snakeToCamel(data);
        sekolah.push(transformedData as CsvSekolah);
      })
      .on("end", () => {
        console.log(
          `\nCSV file ${filePath} processed (${recordCount} records)`
        );
        resolve(sekolah);
      })
      .on("error", (error) => {
        console.error(`Error processing file ${filePath}:`, error);
        reject(error);
      });
  });
};

const seedSekolah = async () => {
  console.log("Truncating all data...");
  await dbSpmb.$executeRaw`TRUNCATE TABLE sekolah`;

  const csvFiles = ["csv/dapo/sekolah.csv"];
  console.log("Processing CSV files...");

  for (const filePath of csvFiles) {
    const sekolah = await processCsvFile(filePath);

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

const main = async () => {
  try {
    await seedSekolah();
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  } finally {
    await dbSpmb.$disconnect();
  }
};

void main();
