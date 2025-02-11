import Faq from "@/modules/beranda/ui/components/faq";
import { Footer } from "@/modules/beranda/ui/components/footer";
import JalurPendaftaran from "@/modules/beranda/ui/components/jalur-pendaftaran";
import { Statistik } from "@/modules/beranda/ui/components/statistik";
import InfografisTahapPendaftaran from "@/modules/beranda/ui/components/tahapan/infografis-tahap-pendaftaran";
import Image from "next/image";

export const BerandaPage = () => {
  return (
    <div className="w-full ">
      <div className="flex flex-col items-center justify-start md:min-h-[calc(80vh-4rem)] ">
        <div className="relative w-full h-[6rem] md:min-h-[300px] flex flex-col items-center px-6 md:px-16">
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
          </div>
        </div>
        <InfografisTahapPendaftaran className="lg:-mt-28 z-30 px-8 py-0" />
      </div>
      <JalurPendaftaran />
      <Statistik />
      <Faq />
      <Footer />
    </div>
  );
};

export default BerandaPage;
