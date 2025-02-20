"use client";
import { generateToken, validateToken } from "@/actions/encryption";
import { FtsCariSekolahResult } from "@/data/sekolah/fts";
import { useWizardForm } from "@/modules/pendaftaran/hooks/use-wizard-form";
import PencarianSekolah from "@/modules/umum/ui/pencarian/sekolah/pencarian-sekolah";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const ContainerPencarian = () => {
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
        <PencarianSekolah onClickResult={handleClickResult} />
      </div>
    </div>
  );
};

export default ContainerPencarian;
