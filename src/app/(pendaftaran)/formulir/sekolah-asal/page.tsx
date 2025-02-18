import { Item } from "@/modules/pendaftaran/ui/components/breadcrumbs";
import FormulirContainer, {
  FormulirContainerFooter,
} from "@/modules/pendaftaran/ui/components/formulir/formulir-container";
import DataSekolahAsalForm from "@/modules/pendaftaran/ui/components/formulir/sekolah-asal";

const breadcrumbs: Item[] = [
  { name: "Formulir", href: "/formulir" },
  { name: "Sekolah Asal", href: "/formulir/sekolah-asal" },
];

const FormulirSekolahAsalPage = () => {
  return (
    <FormulirContainer breadcrumbs={breadcrumbs} title="Sekolah Asal">
      <DataSekolahAsalForm />
      <FormulirContainerFooter
        prev={{ href: "/formulir/data-orang-tua", title: "Data Diri" }}
        next={{ href: "/formulir/data-rapor", title: "Rapor" }}
      />
    </FormulirContainer>
  );
};

export default FormulirSekolahAsalPage;
