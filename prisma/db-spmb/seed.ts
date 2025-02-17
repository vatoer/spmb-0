import { dbSpmb } from "@/lib/db-spmb";
import csv from "csv-parser";
import fs from "fs";
import path from "path";

interface CsvWilayahAdministratif {
  id: string;
  nama: string;
  tingkat: number;
  indukId?: string;
}

const processCsvFile = async (
  filePath: string,
  tingkat: number
): Promise<CsvWilayahAdministratif[]> => {
  const fullPath = path.resolve(process.cwd(), filePath);
  console.log(`Processing file: ${fullPath}`);

  const wilayahAdministrasi: CsvWilayahAdministratif[] = [];
  return new Promise<CsvWilayahAdministratif[]>((resolve, reject) => {
    fs.createReadStream(fullPath)
      .pipe(csv({ separator: ";" }))
      .on("data", (data) => {
        data.tingkat = tingkat;
        wilayahAdministrasi.push(data);
      })
      .on("end", () => {
        console.log(`\nCSV file ${filePath} successfully processed`);
        resolve(wilayahAdministrasi);
      })
      .on("error", (error) => {
        console.error(error);
        reject(error);
      });
  });
};

const seedWilayahAdministratif = async () => {
  // truncate all data
  console.log("Truncating all data wilayah_administratif");
  await dbSpmb.$executeRaw`TRUNCATE TABLE wilayah_administratif`;

  const csvFiles = [
    { path: "csv/wilayah-administratif/provinsi.csv", tingkat: 1 },
    { path: "csv/wilayah-administratif/kota-kabupaten.csv", tingkat: 2 },
    { path: "csv/wilayah-administratif/kecamatan.csv", tingkat: 3 },
    { path: "csv/wilayah-administratif/desa-kelurahan.csv", tingkat: 4 },
  ];

  // process CSV files
  console.log("Processing CSV files");
  for (const file of csvFiles) {
    const wilayahAdministrasi = await processCsvFile(file.path, file.tingkat);

    // bulk insert in batches of 10,000
    const batchSize = 10000;
    for (let i = 0; i < wilayahAdministrasi.length; i += batchSize) {
      console.log(
        `Inserting batch ${i / batchSize + 1} of ${
          wilayahAdministrasi.length / batchSize
        }`
      );
      const batch = wilayahAdministrasi.slice(i, i + batchSize);
      await dbSpmb.wilayahAdministratif.createMany({
        data: batch,
      });
    }
  }
};

async function main() {
  await seedWilayahAdministratif();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await dbSpmb.$disconnect();
  });
