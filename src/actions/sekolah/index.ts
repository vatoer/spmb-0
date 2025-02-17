"use server";
import {
  cariSekolah as cariDataSekolah,
  FtsCariSekolahResult,
} from "@/data/sekolah/fts";
import { ActionResponse } from "@/types/response";

const isNpsn = (query: string) => {
  // probe if the query is NPSN
  // if numeric and 10 digits
  return /^\d{8}$/.test(query);
};

export const cariSekolah = async (
  searchQuery: string
): Promise<ActionResponse<FtsCariSekolahResult[]>> => {
  const isNpsnQuery = isNpsn(searchQuery);

  if (isNpsnQuery) {
    // search by NPSN
    return {
      success: false,
      error: "Search query is NPSN, not supported",
      message: "Search query is NPSN, not supported",
    };
  }

  try {
    // Sanitize: allow alphanumeric characters, spaces, dashes, underscores, periods, and commas
    const sanitizedSearchQuery = searchQuery.replace(
      /[^a-zA-Z0-9\s\-_.,]/g,
      ""
    );
    // Limit the length to 50 characters
    const sanitizedAndLimitedSearchQuery = sanitizedSearchQuery.slice(0, 50);

    const sekolahData = await cariDataSekolah(sanitizedAndLimitedSearchQuery);
    return {
      success: true,
      data: sekolahData,
      message: "Sekolah found",
    };
  } catch (e) {
    const error = e as Error;
    console.error("Error searching sekolah:", error);
    return {
      success: false,
      error: error.message,
      message: "Error searching sekolah",
    };
  }
};
