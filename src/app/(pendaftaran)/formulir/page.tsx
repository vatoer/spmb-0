import PendaftaranBreadcrumbs, {
  Item,
} from "@/modules/pendaftaran/ui/breadcrumbs";
import Link from "next/link";

const breadcrumbs: Item[] = [];

const FormulirPage = () => {
  return (
    <div className="w-full ">
      <PendaftaranBreadcrumbs items={breadcrumbs} />
      <h1 className="text-xl font-semibold z-20 text-center md:text-start">
        Formulir
      </h1>
      <div>
        <div>
          <Link href="/formulir/data-diri">Data Diri</Link>
        </div>
        <div>
          <Link href="/formulir/data-orang-tua">Data Orang Tua</Link>
        </div>
        <div>
          <Link href="/formulir/sekolah-asal">Sekolah Asal</Link>
        </div>
      </div>
    </div>
  );
};

export default FormulirPage;
