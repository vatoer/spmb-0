import { Item } from "@/modules/pendaftaran/ui/components/breadcrumbs";
import DataDiriForm from "@/modules/pendaftaran/ui/components/formulir/data-diri";
import FormulirContainer, {
  FormulirContainerFooter,
} from "@/modules/pendaftaran/ui/components/formulir/formulir-container";

const breadcrumbs: Item[] = [
  { name: "Formulir", href: "/formulir" },
  { name: "Data Diri", href: "/formulir/data-diri" },
];

const FormulirDataDiriPage = () => {
  return (
    <FormulirContainer breadcrumbs={breadcrumbs} title="Data Diri">
      <DataDiriForm />
      <FormulirContainerFooter
        next={{ href: "/formulir/data-orang-tua", title: "Data Orang Tua" }}
      />
    </FormulirContainer>
  );
};

export default FormulirDataDiriPage;
