"use client";

import { cariSekolah } from "@/actions/sekolah";
import { Button } from "@/components/ui/button";
import { FtsCariSekolahResult } from "@/data/sekolah/fts";
import { cn } from "@/lib/utils";
import HasilPencarian from "@/modules/umum/ui/pencarian/sekolah/hasil-pencarian";
import { ActionResponse } from "@/types/response";
// import { ActionResponse } from "@/types/response";
import { SearchIcon, X } from "lucide-react";
import { startTransition, useActionState } from "react";

// type SearchState = {
//   success: boolean;
//   data: FtsCariSekolahResult[];
//   message?: string;
// };

export const PencarianSekolah = ({}) => {
  const [searchState, formAction, isPending] = useActionState<
    ActionResponse<FtsCariSekolahResult[]>, // State type
    FormData // Payload type (FormData)
  >(
    async (
      prevState: ActionResponse<FtsCariSekolahResult[]>,
      formData: FormData
    ): Promise<ActionResponse<FtsCariSekolahResult[]>> => {
      const searchQuery = formData.get("searchQuery") as string;

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
    const formData = new FormData(event.currentTarget); // Create a FormData object from the form element
    // Wrap the async function in startTransition for proper handling of async state
    startTransition(() => {
      formAction(formData); // Pass the FormData object to formAction
    });
  };

  return (
    <div className=" flex flex-col w-full items-center">
      <form
        // action={formAction}
        onSubmit={handleSubmit} // Use handleSubmit to prevent form reset
        className={cn(
          "flex flex-col w-full max-w-[36rem]",
          !searchState.success ? "mt-[calc(15vh-4rem)]" : "mb-[2rem]"
        )}
      >
        <div className="relative w-full h-12">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 size-4 h-full text-gray-500" />
          <input
            type="text"
            name="searchQuery"
            className="w-full h-full pl-10 pr-2 py-2 border rounded-l-full rounded-r-full focus:outline-none focus:border-blue-300"
            placeholder="Cari NPSN atau Nama Sekolah"
          />
          <Button
            variant={"ghost"}
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
      {searchState.success && <HasilPencarian data={searchState.data} />}
    </div>
  );
};

export default PencarianSekolah;
