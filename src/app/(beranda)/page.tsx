import BannerUtama from "@/modules/beranda/ui/components/banner/banner-utama";
import Faq from "@/modules/beranda/ui/components/faq";
import { Footer } from "@/modules/beranda/ui/components/footer";
import JalurPendaftaran from "@/modules/beranda/ui/components/jalur-pendaftaran";
import { Statistik } from "@/modules/beranda/ui/components/statistik";
import InfografisTahapPendaftaran from "@/modules/beranda/ui/components/tahapan/infografis-tahap-pendaftaran";

const BerandaPage = () => {
  return (
    <div className="w-full ">
      <div className="flex flex-col items-center justify-start md:min-h-[calc(80vh-4rem)] ">
        <BannerUtama />
        <InfografisTahapPendaftaran className="" />
      </div>
      <JalurPendaftaran />
      <Statistik />
      <Faq />
      <Footer />
    </div>
  );
};

export default BerandaPage;
