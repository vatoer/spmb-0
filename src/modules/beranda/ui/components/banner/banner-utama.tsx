import { cn } from "@/lib/utils";
import CtaButton from "@/modules/beranda/ui/components/banner/cta-button";
import Image from "next/image";

interface BannerUtamaProps {
  className?: string;
}

const BannerUtama = ({ className }: BannerUtamaProps) => {
  return (
    <div
      className={cn(
        "relative w-full h-[10rem] lg:min-h-[325px] flex flex-col items-center justify-center px-6 md:px-16",
        className
      )}
    >
      <div className="hidden lg:block absolute inset-0 md:left-1/4 lg:left-1/4 z-10">
        <Image
          src="/hero/banner-anak-sekolah.png"
          alt="Logo"
          fill
          className="object-contain h-full"
        />
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-20">
        <h1 className="text-2xl md:text-3xl font-bold">
          Sistem Penerimaan Murid Baru
        </h1>
        <p className="lg:text-lg">Tahun Ajaran 2025/2026</p>
        <CtaButton />
      </div>
    </div>
  );
};

export default BannerUtama;
