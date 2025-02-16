"use client";

import { useSidebar } from "@/components/ui/sidebar";

const mataPelajaran = [
  "Pendidikan Agama & Budi Pekerti",
  "Bahasa Indonesia",
  "Bahasa Inggris",
  "Matematika",
  "IPA",
  "IPS",
];

export const DataRaporForm = () => {
  const { isMobile } = useSidebar();

  if (isMobile) {
    return <DataRaporFormMobile />;
  }

  return (
    <div className="flex flex-col w-full items-center">
      <form className="w-full space-y-2 pb-24">
        <h1 className="text-lg">Data Rapor</h1>
        <div className="flex flex-col items-center border border-gray-200 p-0">
          <div className="w-full border-gray-200 flex items-center justify-center p-2">
            <span className="font-semibold">Semester</span>
          </div>
          <div className="flex flex-row gap-0 w-full border-collapse">
            <div className="border border-gray-200 flex items-center justify-start w-1/3 p-2">
              <span className="font-semibold">Mata Pelajaran</span>
            </div>
            {Array.from({ length: 5 }, (_, i) => (
              <div
                key={i}
                className="border border-gray-200 flex-1 flex justify-center items-center"
              >
                <span>{i + 1}</span>
              </div>
            ))}
          </div>

          {mataPelajaran.map((mapel, i) => (
            <div key={i} className="flex flex-row gap-0 w-full border-collapse">
              <div className="border border-gray-200 flex items-center justify-start w-1/3 p-2">
                <span>{mapel}</span>
              </div>
              {Array.from({ length: 5 }, (_, i) => (
                <div key={i} className="border border-gray-200 flex-1">
                  <input
                    type="number"
                    min={0}
                    max={100}
                    className="w-full h-full text-center"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </form>
    </div>
  );
};

export const DataRaporFormMobile = () => {
  return (
    <div className="flex flex-col w-full items-center">
      <form className="w-full space-y-2 pb-24">
        <h1 className="text-lg">Data Rapor</h1>
        {Array.from({ length: 6 }, (_, i) => (
          <Semester semester={i + 1} mapel={mataPelajaran} key={i} />
        ))}
      </form>
    </div>
  );
};

interface SemesterProps {
  semester: number;
  mapel: string[];
}
const Semester = ({ semester }: SemesterProps) => {
  return (
    <div className="flex flex-col items-center border border-gray-200 p-0">
      <div className="w-full border-gray-200 bg-gray-300 flex items-center justify-center">
        <span className="font-semibold p-2">Semester {semester}</span>
      </div>
      {mataPelajaran.map((mapel, i) => (
        <div
          key={i}
          className="flex flex-row gap-0 w-full border-collapse justify-stretch"
        >
          <div className="border border-gray-200  w-2/3  flex items-center justify-start p-2">
            {mapel}
          </div>
          <div className="border border-gray-200 w-1/3">
            <input
              type="number"
              min={0}
              max={100}
              className="w-full h-full p-2"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default DataRaporForm;
