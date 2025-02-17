import { snakeToCamel } from "@/utils/convertion/snake-to-camel";
import csv from "csv-parser";
import fs from "fs";
import path from "path";

export const processCsvFile = async <T extends Record<string, unknown>>(
  filePath: string,
  allowedKeys: Set<keyof T>, // New parameter: reference object for allowed keys
  transformFn?: (data: Record<string, string | undefined>) => T
): Promise<T[]> => {
  const fullPath = path.resolve(process.cwd(), filePath);
  console.log(`Processing file: ${fullPath}`);

  // Default transformation function if none is provided
  const defaultTransformFn = (data: Record<string, string | undefined>): T => {
    return snakeToCamel(data) as T;
  };

  const transform = transformFn || defaultTransformFn;

  return new Promise<T[]>((resolve, reject) => {
    const rows: T[] = [];
    let recordCount = 0;

    fs.createReadStream(fullPath)
      .pipe(csv({ separator: ";" }))
      .on("data", (data: Record<string, string | undefined>) => {
        recordCount++;
        if (recordCount % 1000 === 0) {
          process.stdout.write(".");
        }
        const transformedData = transform(data);

        const cleanedData = filterKeys(transformedData, allowedKeys);

        rows.push(cleanedData);
      })
      .on("end", () => {
        console.log(
          `\nCSV file ${filePath} processed (${recordCount} records)`
        );
        resolve(rows);
      })
      .on("error", (error) => {
        console.error(`Error processing file ${filePath}:`, error);
        reject(error);
      });
  });
};

function filterKeys<T extends Record<string, unknown>>(
  obj: Record<string, unknown>,
  allowedKeys: Set<keyof T>
): T {
  return Object.fromEntries(
    Object.entries(obj).filter(([key]) => allowedKeys.has(key as keyof T))
  ) as T;
}

// Usage example:
// const filePath = "path/to/file.csv";
// const transformedData = snakeToCamel(data) as CsvDapoWilayah;
// if (transformedData.idLevelWilayah) {
//   transformedData.idLevelWilayah = Number(transformedData.idLevelWilayah);
// }
// const dapoWilayah = await processCsvFile<CsvDapoWilayah>(
//   filePath,
//   transformFn
// );
