"use client";

import { cariSekolah } from "@/actions/sekolah";
import { Button } from "@/components/ui/button";
import { FtsCariSekolahResult } from "@/data/sekolah/fts";
import { cn } from "@/lib/utils";
import HasilPencarian from "@/modules/umum/ui/pencarian/sekolah/hasil-pencarian";
import { ActionResponse } from "@/types/response";
// import { ActionResponse } from "@/types/response";
import { SearchIcon, X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { startTransition, useActionState, useEffect, useState } from "react";

// type SearchState = {
//   success: boolean;
//   data: FtsCariSekolahResult[];
//   message?: string;
// };

interface PencarianSekolahProps {
  onClickResult?: (result: FtsCariSekolahResult) => void;
}
export const PencarianSekolah = ({
  onClickResult = () => {},
}: PencarianSekolahProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchState, formAction, isPending] = useActionState<
    ActionResponse<FtsCariSekolahResult[]>, // State type
    string // Payload type (string for search query)
  >(
    async (
      prevState: ActionResponse<FtsCariSekolahResult[]>,
      searchQuery: string
    ): Promise<ActionResponse<FtsCariSekolahResult[]>> => {
      // Check if search query is empty
      if (!searchQuery) {
        return {
          ...prevState,
          success: false,
          error: "Search query is empty",
          message: "Search query is empty",
        };
      }

      // Call the cariSekolah function with the search query
      const result = await cariSekolah(searchQuery);

      return result;
    },
    { success: false, error: "", message: "" } // Initial state
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent the default form submission behavior

    // Update the URL with the search query
    const url = `${pathname}?${searchParams}`
      .replace(/q=[^&]+&?/, "")
      .replace(/&$/, "");

    router.replace(url + `&q=${searchQuery}`);

    startTransition(() => {
      formAction(searchQuery); // Pass the FormData object to formAction
    });
  };

  useEffect(() => {
    const q = searchParams.get("q") || "";
    setSearchQuery(q);
    console.log(q);
    if (q) {
      startTransition(() => {
        formAction(q);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className=" flex flex-col w-full items-center md:max-w-[800px] ">
      <form
        // action={formAction}
        onSubmit={handleSubmit} // Use handleSubmit to prevent form reset
        className={cn(
          "flex flex-col w-full",
          !searchState.success
            ? "mt-[calc(15vh-4rem)] md:max-w-[36rem]"
            : "mb-[2rem]"
        )}
      >
        <div className="relative w-full h-12">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 size-4 h-full text-gray-500" />
          <input
            type="input"
            enterKeyHint="search"
            name="searchQuery"
            value={searchQuery || ""}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-full pl-10 pr-2 py-2 border rounded-l-full rounded-r-full focus:outline-none focus:border-blue-300"
            placeholder="Cari NPSN atau Nama Sekolah"
          />
          <Button
            variant={"ghost"}
            onClick={() => setSearchQuery("")}
            className="absolute top-1/2 right-2 -translate-y-1/2 size-4 w-[2rem] h-full text-gray-500 rounded-r-full hover:bg-transparent"
            type="reset"
          >
            <X />
          </Button>
        </div>
        <div
          className={cn(
            "w-full p-2 items-center justify-center flex flex-row gap-2",
            searchState.success && searchState.data.length > 0 && "hidden"
          )}
        >
          <Button type="submit" variant={"outline"} disabled={isPending}>
            {isPending ? "Mencari..." : "Cari Sekolah"}
          </Button>
        </div>
      </form>
      {/* Only render HasilPencarian if searchState is a SuccessResponse */}
      {isPending && <h1 className="">Mencari sekolah ...</h1>}
      {searchState.success && (
        <HasilPencarian data={searchState.data} onClickResult={onClickResult} />
      )}
    </div>
  );
};

export default PencarianSekolah;
