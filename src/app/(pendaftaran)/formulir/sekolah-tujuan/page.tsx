import { Item } from "@/modules/pendaftaran/ui/components/breadcrumbs";
import FormulirContainer, {
  FormulirContainerFooter,
} from "@/modules/pendaftaran/ui/components/formulir/formulir-container";
import ContainerPencarian from "@/modules/sekolah/ui/components/container-pencarian";
import { generateToken, validateToken } from "@/utils/hashing/encrypt-string";

const breadcrumbs: Item[] = [
  { name: "Formulir", href: "/formulir" },
  { name: "Sekolah Tujuan", href: "/formulir/sekolah-tujuan" },
];

const encrypted = generateToken("Sekolah Tujuan");
const decrypted = validateToken(encrypted);
console.log("encrypted", encrypted);
console.log("decrypted", decrypted);

const FormulirSekolahAsalPage = async () => {
  return (
    <FormulirContainer
      breadcrumbs={breadcrumbs}
      title="Cari & Pilih Sekolah Tujuan"
    >
      <ContainerPencarian />
      <FormulirContainerFooter
        prev={{ href: "/formulir/data-rapor", title: "Data Rapor" }}
        next={{ href: "/formulir/konfirmasi", title: "konfirmasi" }}
      />
    </FormulirContainer>
  );
};

export default FormulirSekolahAsalPage;
