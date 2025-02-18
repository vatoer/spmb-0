import { FtsCariSekolahResult } from "@/data/sekolah/fts";

interface HasilPencarianProps {
  data: FtsCariSekolahResult[];
  onClickResult?: (sekolah: FtsCariSekolahResult) => void;
}
export const HasilPencarian = ({
  data,
  onClickResult = () => {},
}: HasilPencarianProps) => {
  return (
    <div className="flex flex-col gap-1 w-full items-start">
      {data.map((sekolah) => (
        <RowSekolah
          key={sekolah.npsn}
          onClickResult={onClickResult}
          sekolah={sekolah}
        />
      ))}
    </div>
  );
};

interface RowSekolahProps {
  sekolah: FtsCariSekolahResult;
  onClickResult?: (sekolah: FtsCariSekolahResult) => void;
}
export const RowSekolah = ({ sekolah, onClickResult }: RowSekolahProps) => {
  const handleClickResult = (sekolah: FtsCariSekolahResult) => {
    console.log(sekolah);
    onClickResult?.(sekolah);
  };
  return (
    <div className="flex flex-col text-sm p-2 w-full">
      <div
        onClick={() => handleClickResult(sekolah)}
        className="flex flex-auto flex-row w-full text-blue-500 hover:underline hover:cursor-pointer"
      >
        <span className="text-blue-500 hover:underline hover:cursor-pointer text-xl">
          {sekolah.nama}
        </span>
      </div>
      <div>
        <span>{sekolah.npsn}</span>
      </div>
      <div className="flex flex-auto flex-row text-xs">
        <span>{sekolah.alamat}</span>
      </div>
      <div className="flex flex-auto flex-row text-sm">
        <span>
          {sekolah.kelurahanDesa} - {sekolah.namaWilayah} -{" "}
          {sekolah.indukKabupaten} - {sekolah.indukProvinsi}
        </span>
      </div>
    </div>
  );
};

export default HasilPencarian;
