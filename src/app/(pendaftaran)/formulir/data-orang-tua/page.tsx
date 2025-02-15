import { Item } from "@/modules/pendaftaran/ui/components/breadcrumbs";
import {
  FormulirContainer,
  FormulirContainerFooter,
} from "@/modules/pendaftaran/ui/components/formulir/formulir-container";
import DataOrangTuaForm from "@/modules/pendaftaran/ui/components/formulir/orang-tua";

const breadcrumbs: Item[] = [
  { name: "Formulir", href: "/formulir" },
  { name: "Data Orang Tua", href: "/formulir/data-orang-tua" },
];

const FormulirDataOrangTuaPage = () => {
  return (
    <FormulirContainer breadcrumbs={breadcrumbs} title="Data Orang Tua">
      <DataOrangTuaForm />
      <FormulirContainerFooter
        prev={{ href: "/formulir/data-diri", title: "Data Diri" }}
        next={{ href: "/formulir/sekolah-asal", title: "Sekolah Asal" }}
      />
    </FormulirContainer>
  );
};

export default FormulirDataOrangTuaPage;
