import { dbSpmb } from "@/lib/db-spmb";
import { DefinedKeys } from "@/types/defined-keys";
import { snakeToCamelArray } from "@/utils/convertion/snake-to-camel";

interface FtsCariSekolahResultWithDynamicKeys {
  npsn: string;
  nama: string;
  alamat?: string;
  kelurahanDesa?: string;
  namaWilayah?: string; // ini kecamatan
  indukKabupaten?: string;
  indukProvinsi?: string;
  dapoWilayahId: string;
  status?: string;
  rank: number;
  rankNoStemming: number;
  simInNama: number;
  simInAlamat: number;
  simInKelurahanDesa: number;
  [key: string]: unknown;
}

export type FtsCariSekolahResult =
  DefinedKeys<FtsCariSekolahResultWithDynamicKeys>;

export async function cariSekolah(
  searchQuery: string
): Promise<FtsCariSekolahResult[]> {
  // Parameterized query to prevent SQL injection
  const results = await dbSpmb.$queryRaw<FtsCariSekolahResultWithDynamicKeys[]>`
    SELECT * FROM fts_cari_sekolah(${searchQuery});
  `;

  // Convert the result from snake_case to camelCase before returning
  return snakeToCamelArray(results) as FtsCariSekolahResult[]; // Type assertion here
}

// Example usage
// async function runSearch() {
//   const searchQuery = "sma 1 paciran";
//   const sekolahData = await searchSekolah(searchQuery);
//   console.log(sekolahData);
// }

// runSearch();
