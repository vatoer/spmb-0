import { Button } from "@/components/ui/button";
import PendaftaranBreadcrumbs, {
  Item,
} from "@/modules/pendaftaran/ui/breadcrumbs";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

const breadcrumbs: Item[] = [
  { name: "Formulir", href: "/formulir" },
  { name: "Data Orang Tua", href: "/formulir/data-orang-tua" },
];

const FormulirDataOrangTuaPage = () => {
  return (
    <div className="w-full">
      <PendaftaranBreadcrumbs items={breadcrumbs} />
      <div className="w-full flex flex-col items-center justify-start md:min-h-[calc(80vh-4rem)] ">
        <div
          className="min-h-[calc(50vh-4rem)] w-full md:w-2/3 border bg-gray-100 rounded-sm mt-2
        flex flex-col items-center justify-start gap-2 p-4"
        >
          <h1 className="hidden md:block text-3xl font-bold z-20 text-center">
            Data Orang Tua
          </h1>
          <div className="mt-auto flex flex-row gap-2 w-full items-end justify-between">
            <Link href="/formulir/data-diri">
              <Button variant={"outline"}>
                <ChevronLeft size={24} />
                Data Diri
              </Button>
            </Link>
            <Link href="/formulir/sekolah-asal">
              <Button variant={"outline"}>
                Sekolah Asal <ChevronRight size={24} />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormulirDataOrangTuaPage;
