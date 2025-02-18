import { dbSpmb } from "@/lib/db-spmb";
import { DefinedKeys } from "@/types/defined-keys";
import { snakeToCamel } from "@/utils/conversion/snake-to-camel";
import { processCsvFile } from "@/utils/csv/process-file";

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

const seedDapoWilayah = async () => {
  console.log("Truncating all data...");
  await dbSpmb.$executeRaw`TRUNCATE TABLE dapo_wilayah`;

  const csvFiles = ["csv/dapo/dapo-wilayah.csv"];
  console.log("Processing CSV files...");

  for (const filePath of csvFiles) {
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
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  } finally {
    await dbSpmb.$disconnect();
  }
};

void main();
