import { Item } from "@/modules/pendaftaran/ui/components/breadcrumbs";
import FormulirContainer, {
  FormulirContainerFooter,
} from "@/modules/pendaftaran/ui/components/formulir/formulir-container";
import PencarianSekolah from "@/modules/umum/ui/pencarian/sekolah/pencarian-sekolah";

const breadcrumbs: Item[] = [
  { name: "Formulir", href: "/formulir" },
  { name: "Sekolah Tujuan", href: "/formulir/sekolah-tujuan" },
];

const FormulirSekolahAsalPage = async () => {
  return (
    <FormulirContainer breadcrumbs={breadcrumbs} title="Sekolah Tujuan">
      <PencarianSekolah />
      <FormulirContainerFooter
        prev={{ href: "/formulir/data-rapor", title: "Data Rapor" }}
        next={{ href: "/formulir/konfirmasi", title: "konfirmasi" }}
      />
    </FormulirContainer>
  );
};

export default FormulirSekolahAsalPage;
