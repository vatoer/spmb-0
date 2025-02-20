"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Agama,
  DataDiri,
  dataDiriSchema,
  GolonganDarah,
} from "@/zod/schemas/murid";
import { zodResolver } from "@hookform/resolvers/zod";
import dynamic from "next/dynamic";
// import { SelectProvinsi } from "@/components/select-provinsi";
import { Skeleton } from "@/components/ui/skeleton";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { useWizardForm } from "@/modules/pendaftaran/hooks/use-wizard-form";
import CumulativeErrors from "@/modules/umum/ui/cumulative-error";
import { isValidDateString, parseNIK } from "@/utils/kependudukan";
import { ChevronDown } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

const SelectWilayah = dynamic(
  () => import("@/modules/umum/ui/select-wilayah"),
  {
    ssr: false,
    loading: () => (
      <div className="">
        <Skeleton className="h-12 w-full" />
      </div>
    ),
  }
);

interface DataDiriFormProps {
  nextStep?: () => void;
}

const defaultValuesDataDiri = {
  nama: "",
  tempatLahir: "",
  tanggalLahir: new Date(),
  // jenisKelamin: JenisKelamin.LakiLaki,
  agama: Agama.Lainnya,
  golonganDarah: GolonganDarah.TIDAK_TAHU,
  nisn: "",
  nik: "",
  // jenjangDikdasmen: JenjangDikdasmen.SD,
  alamat: "",
  rt: "",
  rw: "",
  provinsi: "-",
  kotaKabupaten: "-",
  kecamatan: "-",
  desaKelurahan: "-",
  wilayah: "",
  // statusDomisili: "LAINNYA",
};

const checkParentPrefix = (parent: string, child: string) => {
  if (parent === "-" || parent === "") return false;
  return child.startsWith(parent);
};

export const DataDiriForm = ({ nextStep = () => {} }: DataDiriFormProps) => {
  const { formData, updateFormData } = useWizardForm(defaultValuesDataDiri);
  const form = useForm<DataDiri>({
    mode: "onBlur",
    resolver: zodResolver(dataDiriSchema),
    defaultValues: formData,
  });
  const { toast } = useToast();

  const { handleSubmit, watch, setValue, trigger } = form;

  const wilayah = watch("wilayah");
  const provinsi = watch("provinsi");
  const kotaKabupaten = watch("kotaKabupaten");
  const kecamatan = watch("kecamatan");
  const desaKelurahan = watch("desaKelurahan");
  const nik = watch("nik");
  // const tanggalLahir = watch("tanggalLahir");

  const onSubmit = (data: DataDiri) => {
    console.log(data);
    updateFormData(data);
    toast({
      duration: 2000,
      title: "Data Diri",
      description: "Data diri berhasil disimpan.",
    });
    nextStep();
  };

  useEffect(() => {
    console.log(wilayah);
  }, [wilayah]);

  useEffect(() => {
    // on initial load if kotaKabupaten is set and the prefix is same as provinsi then set it from local storage
    if (checkParentPrefix(provinsi, kotaKabupaten)) {
      setValue("kotaKabupaten", kotaKabupaten);
    } else {
      setValue("kotaKabupaten", "-");
    }
    console.log(provinsi);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [provinsi, setValue]);

  useEffect(() => {
    if (checkParentPrefix(kotaKabupaten, kecamatan)) {
      setValue("kecamatan", kecamatan);
    } else {
      setValue("kecamatan", "-");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [kotaKabupaten, setValue]);

  useEffect(() => {
    if (checkParentPrefix(kecamatan, desaKelurahan)) {
      setValue("desaKelurahan", desaKelurahan);
    } else {
      setValue("desaKelurahan", "-");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [kecamatan, setValue]);

  useEffect(() => {
    setValue("wilayah", desaKelurahan);
  }, [desaKelurahan, setValue]);

  useEffect(() => {
    const cekNik = async () => {
      if (!nik || nik.length < 16) return; // Avoid unnecessary execution

      if (nik.length === 16) {
        const nikData = parseNIK(nik);
        if (nikData) {
          const isValid = await trigger("nik");
          if (isValid) {
            setValue("tanggalLahir", nikData.birthDate);
            setValue("jenisKelamin", nikData.gender);
          }
        } else {
          toast({
            title: "Invalid NIK",
            description:
              "The entered NIK is not valid. Please check and try again.",
            action: <ToastAction altText="Dismiss">OK</ToastAction>,
          });
        }
      }
      // else {
      //   trigger("nik"); // Only revalidate if `nik` is longer than expected
      // }
    };

    cekNik();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nik]);

  return (
    <div className="flex flex-col w-full items-center">
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full space-y-2 pb-24"
        >
          <h1 className="text-lg">Data Diri</h1>

          <FormField
            control={form.control}
            name="nama"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama</FormLabel>
                <FormControl>
                  <Input
                    placeholder="nama"
                    {...field}
                    className="bg-background h-12"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col md:flex-row gap-2">
            <FormField
              control={form.control}
              name="nik"
              render={({ field }) => (
                <FormItem className="md:w-1/2">
                  <FormLabel>NIK</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="16 digit"
                      {...field}
                      className="bg-background h-12"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="nisn"
              render={({ field }) => (
                <FormItem className="md:w-1/2">
                  <FormLabel>NISN</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="10 digit"
                      {...field}
                      className="bg-background h-12"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col md:flex-row gap-2">
            <FormField
              control={form.control}
              name="jenisKelamin"
              render={({ field }) => (
                <FormItem className="md:w-1/2">
                  <FormLabel>Jenis Kelamin</FormLabel>
                  <FormControl>
                    <Input
                      disabled
                      readOnly
                      placeholder="Jenis Kelamin"
                      {...field}
                      className="bg-background h-12"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tempatLahir"
              render={({ field }) => (
                <FormItem className="md:w-1/2">
                  <FormLabel>Tempat Lahir</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Kota/Kabupaten kelahiran"
                      {...field}
                      className="bg-background h-12"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tanggalLahir"
              render={({ field }) => (
                <FormItem className="md:w-1/2">
                  <FormLabel>Tanggal Lahir</FormLabel>
                  <FormControl>
                    <Input
                      disabled
                      readOnly
                      placeholder="tanggal lahir"
                      {...field}
                      value={
                        field.value && isValidDateString(field.value)
                          ? new Date(field.value).toLocaleDateString()
                          : ""
                      }
                      className="bg-background h-12"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <FormField
              control={form.control}
              name="tanggalLahir"
              render={({ field }) => (
                <FormItem className="md:w-1/2">
                  <FormLabel htmlFor="tanggal-lahir">Tanggal Lahir</FormLabel>
                  <FormControl>
                    <InputDatePicker
                      date={tanggalLahir}
                      calendarOptions={{
                        fromDate: new Date(
                          new Date().setFullYear(new Date().getFullYear() - 18)
                        ),
                        toDate: new Date(
                          new Date().setFullYear(new Date().getFullYear() - 3)
                        ),
                      }}
                      inputId="tanggal-lahir"
                      onDateSelected={(date) => field.onChange(date)}
                      className="h-12"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
          </div>
          <FormField
            control={form.control}
            name="jenjangDikdasmen"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="jenjang-form-item">Jenjang</FormLabel>
                <FormControl>
                  <div className="relative w-full">
                    <select
                      id="jenjang-form-item"
                      {...field}
                      className="peer appearance-none w-full focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded px-3 py-1 h-12"
                    >
                      <option value="">Pilih Jenjang</option>
                      <option value="SD">SD/MI Sederajat</option>
                      <option value="SMP">SMP/MTs Sederajat</option>
                      <option value="SMA">SMA/MA Sederajat </option>
                    </select>
                    <ChevronDown
                      size={20}
                      className="peer-focus:visible text-gray-500 opacity-50 peer-focus:opacity-100 absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="h-0 py-4 border-b-2"></div>

          <h1 className="text-lg pt-4">Domisili</h1>

          <FormField
            control={form.control}
            name="statusDomisili"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="status-domisili-form-item">
                  Status Domisili
                </FormLabel>
                <FormControl>
                  <div className="relative w-full">
                    <select
                      id="status-domisili-form-item"
                      {...field}
                      className="peer appearance-none w-full focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded px-3 py-1 h-12"
                    >
                      <option value="">Pilih Status Domisili</option>
                      <option value="SESUAI_KK">Sesuai Kartu Keluarga</option>
                      <option value="SURAT_PINDAH">Surat Pindah</option>
                      <option value="SESUAI_DOMISILI_PONDOK">
                        Sesuai Domisili Pondok
                      </option>
                      <option value="SESUAI_DOMISILI_PANTI_ASUHAN">
                        Sesuai Domisili Panti Asuhan
                      </option>
                      <option value="LAINNYA">Lainnya</option>
                    </select>
                    <ChevronDown
                      size={20}
                      className="peer-focus:visible text-gray-500 opacity-50 peer-focus:opacity-100 absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex w-full flex-col md:flex-row gap-2">
            <FormField
              control={form.control}
              name="provinsi"
              render={({ field }) => (
                <FormItem className="w-full md:w-1/2">
                  <FormLabel
                    htmlFor="select-provinsi"
                    id="select-provinsi-label"
                  >
                    Provinsi
                  </FormLabel>
                  <FormControl>
                    <SelectWilayah
                      tingkat={1}
                      inputId="select-provinsi"
                      value={field.value}
                      onChange={(selected) => {
                        let value = "";
                        if (typeof selected === "object" && selected) {
                          value = selected.value;
                        } else {
                          value = selected ?? "";
                        }
                        field.onChange(value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="kotaKabupaten"
              render={({ field }) => (
                <FormItem className="w-full md:w-1/2">
                  <FormLabel
                    id="select-kota-kabupaten-label"
                    htmlFor="select-kota-kabupaten"
                  >
                    Kota Kabupaten
                  </FormLabel>
                  <FormControl>
                    <SelectWilayah
                      tingkat={2}
                      inputId="select-kota-kabupaten"
                      value={field.value}
                      induk={provinsi}
                      onChange={(selected) => {
                        let value = "";
                        if (typeof selected === "object" && selected) {
                          value = selected.value;
                        } else {
                          value = selected ?? "";
                        }
                        field.onChange(value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col md:flex-row gap-2">
            <FormField
              control={form.control}
              name="kecamatan"
              render={({ field }) => (
                <FormItem className="w-full md:w-1/2">
                  <FormLabel
                    id="select-kecamatan-label"
                    htmlFor="select-kecamatan"
                  >
                    Kecamatan
                  </FormLabel>
                  <FormControl>
                    <SelectWilayah
                      inputId="select-kecamatan"
                      tingkat={3}
                      value={field.value}
                      induk={kotaKabupaten}
                      onChange={(selected) => {
                        let value = "";
                        if (typeof selected === "object" && selected) {
                          value = selected.value;
                        } else {
                          value = selected ?? "";
                        }
                        field.onChange(value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="desaKelurahan"
              render={({ field }) => (
                <FormItem className="w-full md:w-1/2">
                  <FormLabel
                    id="select-desa-kelurahan-label"
                    htmlFor="select-desa-kelurahan"
                  >
                    Desa/Kelurahan
                  </FormLabel>
                  <FormControl>
                    <SelectWilayah
                      inputId="select-desa-kelurahan"
                      tingkat={4}
                      value={field.value}
                      induk={kecamatan}
                      onChange={(selected) => {
                        let value = "";
                        if (typeof selected === "object" && selected) {
                          value = selected.value;
                        } else {
                          value = selected ?? "";
                        }
                        field.onChange(value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="alamat"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Alamat Domisili</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Jl...Blok..."
                    {...field}
                    className="bg-background h-12"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-col md:flex-row gap-2">
            <FormField
              control={form.control}
              name="rt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>RT</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="000"
                      {...field}
                      className="bg-background h-12"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="rw"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>RW</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="000"
                      {...field}
                      className="bg-background h-12"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <CumulativeErrors errors={form.formState.errors} verbose />

          <div
            className={cn(
              "flex flex-col sm:flex-row  sm:justify-end gap-2 mt-6"
            )}
          >
            <Button type="submit">Simpan</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default DataDiriForm;
