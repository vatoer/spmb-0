"use client";
import { FtsCariSekolahResult } from "@/data/sekolah/fts";
import PencarianSekolah from "@/modules/umum/ui/pencarian/sekolah/pencarian-sekolah";
import { useRouter } from "next/navigation";

const ContainerPencarian = () => {
  const router = useRouter();
  const handleClickResult = (result: FtsCariSekolahResult) => {
    router.push(`/sekolah/${result.npsn}`);
  };
  return (
    <div className="flex flex-col w-full items-center">
      <div className="flex flex-col w-full md:w-[800px] items-center px-2">
        <PencarianSekolah onClickResult={handleClickResult} />
      </div>
    </div>
  );
};

export default ContainerPencarian;
