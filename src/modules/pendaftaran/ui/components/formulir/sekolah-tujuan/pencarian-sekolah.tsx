"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SearchIcon } from "lucide-react";
import { useState } from "react";

// import { SelectProvinsi } from "@/components/select-provinsi";

export const PencarianSekolah = ({}) => {
  const [isResultVisible, setIsResultVisible] = useState(false);
  return (
    <div className=" flex flex-col w-full items-center">
      <form
        className={cn(
          "flex flex-col w-full max-w-[36rem]",
          !isResultVisible ? "mt-[calc(15vh-4rem)]" : ""
        )}
      >
        <div className="relative w-full h-12">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 size-4 h-full text-gray-500" />
          <input
            type="text"
            name=""
            id=""
            className="w-full h-full pl-10 pr-2 py-2 border rounded-l-full rounded-r-full focus:outline-none focus:border-blue-300"
            placeholder="Cari NPSN atau Nama Sekolah"
          />
        </div>
        <div className="w-full p-2 items-center justify-center flex flex-row gap-2">
          <Button variant={"outline"}>Cari NPSN</Button>
          <Button variant={"outline"}>Cari Sekolah</Button>
        </div>
      </form>
    </div>
  );
};

export default PencarianSekolah;
