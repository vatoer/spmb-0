import { cn } from "@/lib/utils";
import { auth } from "@/modules/auth/auth";
import { tahapan } from "@/modules/beranda/data/tahapan";
import { Tahap } from "./tahap";
interface InfografisTahapPendaftaranProps {
  className?: string;
}

export const InfografisTahapPendaftaran = async ({
  className,
}: InfografisTahapPendaftaranProps) => {
  const session = await auth();
  const user = session?.user;
  const isLoggedIn = !!user;

  return (
    <div className={cn("w-full", className && className)}>
      <div className="flex flex-col lg:flex-row flex-grow h-auto items-stretch  justify-between pb-8 md:py-8 gap-2 px-2">
        {
          /* Tahap Pendaftaran */
          tahapan.map((tahap, index) => {
            const isActive = isLoggedIn
              ? !tahap.disableOnAuth
              : tahap.disableOnAuth;
            return (
              <Tahap
                key={index}
                tahap={tahap}
                className="w-full md:w-1/3"
                isActive={isActive}
              />
            );
          })
        }
      </div>
    </div>
  );
};

export default InfografisTahapPendaftaran;
