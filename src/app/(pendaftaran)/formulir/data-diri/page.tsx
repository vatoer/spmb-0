import { Button } from "@/components/ui/button";
import PendaftaranBreadcrumbs, {
  Item,
} from "@/modules/pendaftaran/ui/components/breadcrumbs";
import DataDiriForm from "@/modules/pendaftaran/ui/components/formulir/data-diri";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

const breadcrumbs: Item[] = [
  { name: "Formulir", href: "/formulir" },
  { name: "Data Diri", href: "/formulir/data-diri" },
];

const FormulirDataDiriPage = () => {
  return (
    <div className="w-full">
      <PendaftaranBreadcrumbs items={breadcrumbs} />
      <div className="w-full flex flex-col items-center justify-start md:min-h-[calc(80vh-4rem)] ">
        <div
          className="min-h-[calc(50vh-4rem)] w-full md:w-2/3 border bg-gray-100 rounded-sm mt-2
        flex flex-col items-center justify-start gap-2 p-4"
        >
          <h1 className="hidden md:block text-3xl font-bold z-20 text-center">
            Data Diri
          </h1>
          <DataDiriForm />
          <div className="mt-auto flex flex-col gap-2 w-full items-end">
            <Link href="/formulir/data-orang-tua">
              <Button variant={"outline"}>
                Data Orang Tua
                <ChevronRight size={24} />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormulirDataDiriPage;
