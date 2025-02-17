import { FtsCariSekolahResult } from "@/data/sekolah/fts";

interface HasilPencarianProps {
  data: FtsCariSekolahResult[];
  onSelect?: (sekolah: FtsCariSekolahResult) => void;
}
export const HasilPencarian = ({
  data,
  onSelect = () => {},
}: HasilPencarianProps) => {
  return (
    <div className="flex flex-col gap-1 w-full items-start">
      {data.map((sekolah) => (
        <RowSekolah key={sekolah.npsn} sekolah={sekolah} />
      ))}
    </div>
  );
};

export const RowSekolah = ({ sekolah }: { sekolah: FtsCariSekolahResult }) => {
  return (
    <div className="flex flex-col text-sm p-2 w-full">
      <div className="flex flex-auto flex-row w-full text-blue-500 hover:underline hover:cursor-pointer">
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
