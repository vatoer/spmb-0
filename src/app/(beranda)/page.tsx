import Faq from "@/modules/beranda/ui/components/faq";
import { Footer } from "@/modules/beranda/ui/components/footer";
import JalurPendaftaran from "@/modules/beranda/ui/components/jalur-pendaftaran";
import { Statistik } from "@/modules/beranda/ui/components/statistik";
import InfografisTahapPendaftaran from "@/modules/beranda/ui/components/tahapan/infografis-tahap-pendaftaran";
import Image from "next/image";

export const BerandaPage = () => {
  return (
    <div className="w-full ">
      <div className="flex flex-col items-center justify-start py-6 md:h-[calc(100vh-4rem)]">
        <div className="relative w-full md:w-4/5 h-[12rem] md:h-[300px] flex flex-col items-center md:justify-center px-6 md:px-16">
          <Image
            src="/hero/banner-anak-sekolah.png"
            alt="Logo"
            fill
            className="object-cover hidden md:block"
          />
          <h1 className="text-3xl font-bold z-20 text-center">
            Sistem Penerimaan Murid Baru
          </h1>
          <p className="text-lg">Tahun Ajaran 2025/2026</p>
        </div>
        <InfografisTahapPendaftaran className="-mt-24 z-30 px-8" />
      </div>
      <JalurPendaftaran />
      <Statistik />
      <Faq />
      <Footer />
    </div>
  );
};

export default BerandaPage;
