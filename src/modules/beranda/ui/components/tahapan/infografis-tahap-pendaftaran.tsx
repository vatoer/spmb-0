import { cn } from "@/lib/utils";
import { Tahap } from "./tahap";
import { tahapan } from "@/modules/beranda/data/tahapan";
interface InfografisTahapPendaftaranProps {
  className?: string;
}

export const InfografisTahapPendaftaran = ({
  className,
}: InfografisTahapPendaftaranProps) => {
  return (
    <div className={cn("w-full", className && className)}>
      <div className="flex flex-col lg:flex-row flex-grow h-auto items-stretch  justify-between py-8 gap-2 px-2">
        {
          /* Tahap Pendaftaran */
          tahapan.map((tahap, index) => (
            <Tahap key={index} className="lg:w-1/6" tahap={tahap} isActive />
          ))
        }
      </div>
    </div>
  );
};

export default InfografisTahapPendaftaran;
