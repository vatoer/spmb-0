import { Item } from "@/modules/pendaftaran/ui/components/breadcrumbs";
import FormulirContainer, {
  FormulirContainerFooter,
} from "@/modules/pendaftaran/ui/components/formulir/formulir-container";
import DataRaporForm from "@/modules/pendaftaran/ui/components/formulir/rapor";

const breadcrumbs: Item[] = [
  { name: "Formulir", href: "/formulir" },
  { name: "Rapor", href: "/formulir/data-rapor" },
];

const FormulirSekolanhAsalPage = () => {
  return (
    <FormulirContainer breadcrumbs={breadcrumbs} title="Rapor">
      <DataRaporForm />
      <FormulirContainerFooter
        prev={{ href: "/formulir/sekolah-asal", title: "Sekolah Asal" }}
        next={{ href: "/formulir/sekolah-tujuan", title: "Sekolah Tujuan" }}
      />
    </FormulirContainer>
  );
};

export default FormulirSekolanhAsalPage;
