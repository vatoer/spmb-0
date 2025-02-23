"use client";
import { generateToken, validateToken } from "@/actions/encryption";
import { FtsCariSekolahResult } from "@/data/sekolah/fts";
import { cn } from "@/lib/utils";
import { useWizardForm } from "@/modules/pendaftaran/hooks/use-wizard-form";
import PencarianSekolah from "@/modules/umum/ui/pencarian/sekolah/pencarian-sekolah";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const ContainerPencarian = () => {
  const [filter, setFilter] = useState("nama");
  const defaultValues = {};
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const { formData } = useWizardForm(defaultValues);

  const nisnValue = formData?.nisn ?? null; // Returns value if exists, otherwise null

  useEffect(() => {
    const tokenize = async () => {
      if (nisnValue) {
        const token = await generateToken(nisnValue);
        // replace s search params string with new token

        const dekode = await validateToken(token);
        console.log("token", dekode);

        // Update the URL with the search query
        const url = `${pathname}?${searchParams}`
          .replace(/s=[^&]+&?/, "")
          .replace(/&$/, "");

        router.replace(url + `&s=${token}`);
      }
    };
    tokenize();
  }, [nisnValue, pathname, router, searchParams]);

  const handleClickResult = (result: FtsCariSekolahResult) => {
    router.push(`/sekolah/${result.npsn}?${searchParams}`);
  };
  return (
    <div className="flex flex-col w-full items-center">
      <div className="flex flex-col w-full items-center px-2">
        <RadioFilter filter={filter} setFilter={setFilter} />
        {filter === "nama" && (
          <PencarianSekolah onClickResult={handleClickResult} />
        )}
      </div>
    </div>
  );
};

export default ContainerPencarian;

import React from "react";

interface RadioFilterProps {
  filter: string;
  setFilter: (filter: string) => void;
  className?: string;
}

const RadioFilter: React.FC<RadioFilterProps> = ({
  filter,
  setFilter,
  className,
}) => {
  return (
    <div className={cn("flex gap-4 mt-4", className)}>
      <label className="flex items-center cursor-pointer">
        <input
          type="radio"
          name="filter"
          value="nama"
          checked={filter === "nama"}
          onChange={() => setFilter("nama")}
          className="mr-2 cursor-pointer"
        />
        Nama/NISN Sekolah
      </label>
      <label className="flex items-center cursor-pointer">
        <input
          type="radio"
          name="filter"
          value="wilayah"
          checked={filter === "wilayah"}
          onChange={() => setFilter("wilayah")}
          className="mr-2 cursor-pointer"
        />
        Wilayah Sekolah
      </label>
    </div>
  );
};
