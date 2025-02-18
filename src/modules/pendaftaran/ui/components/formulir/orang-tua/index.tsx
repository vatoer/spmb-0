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
  DataOrangTua,
  dataOrangTuaSchema,
  JenisKelamin,
  JenjangPendidikan,
  Pekerjaan,
  RentangPendapatan,
} from "@/zod/schemas/murid";
import { zodResolver } from "@hookform/resolvers/zod";
// import { SelectProvinsi } from "@/components/select-provinsi";
import { cn } from "@/lib/utils";
import { useWizardForm } from "@/modules/pendaftaran/hooks/use-wizard-form";
import CumulativeErrors from "@/modules/umum/ui/cumulative-error";
import { ChevronDown } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface DataOrangTuaFormProps {
  nextStep?: () => void;
}

const defaultValuesDataOrangTua: DataOrangTua = {
  ibu: {
    nama: "",
    nik: "",
    kk: "",
    pekerjaan: "",
    jenisKelamin: JenisKelamin.Perempuan,
    jenjangPendidikan: "",
    pendapatan: "",
  },
  ayah: {
    nama: "",
    nik: "",
    kk: "",
    jenisKelamin: JenisKelamin.LakiLaki,
    pekerjaan: "",
    jenjangPendidikan: "",
    pendapatan: "",
  },
};

const pekerjaanOptions = Object.entries(Pekerjaan).map(([value, label]) => ({
  value,
  label,
}));

// Sort the options by label
const sortedPekerjaanOptions = pekerjaanOptions.sort((a, b) =>
  a.label.localeCompare(b.label)
);

const rentangPendapatanOptions = Object.entries(RentangPendapatan).map(
  ([value, label]) => ({
    value,
    label,
  })
);

const jenjangPendidikanOptions = Object.entries(JenjangPendidikan).map(
  ([value, label]) => ({
    value,
    label,
  })
);

export const DataOrangTuaForm = ({
  nextStep = () => {},
}: DataOrangTuaFormProps) => {
  const { formData, updateFormData } = useWizardForm(defaultValuesDataOrangTua);
  const form = useForm<DataOrangTua>({
    resolver: zodResolver(dataOrangTuaSchema),
    defaultValues: formData,
    // defaultValues: {
    //   ...formData,
    //   ibu: {
    //     ...formData.ibu,
    //     jenisKelamin: JenisKelamin.Perempuan,
    //   },
    //   ayah: {
    //     ...formData.ayah,
    //     jenisKelamin: JenisKelamin.LakiLaki,
    //   },
    // },
  });

  const { handleSubmit } = form;

  const onSubmit = (data: DataOrangTua) => {
    console.log(data);
    updateFormData(data);
    nextStep();
  };

  useEffect(() => {
    form.reset(formData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form]);

  return (
    <div className="flex flex-col w-full items-center">
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full space-y-2 pb-24"
        >
          <h1 className="text-lg">Data Ibu</h1>
          <FormField
            control={form.control}
            name="ibu.nama"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama</FormLabel>
                <FormControl>
                  <Input
                    placeholder="nama"
                    {...field}
                    value={field.value ?? ""}
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
              name="ibu.kk"
              render={({ field }) => (
                <FormItem className="md:w-1/2">
                  <FormLabel>Nomor Kartu Keluarga</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="16 digit"
                      {...field}
                      value={field.value ?? ""}
                      className="bg-background h-12"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ibu.nik"
              render={({ field }) => (
                <FormItem className="md:w-1/2">
                  <FormLabel>NIK</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="16 digit"
                      {...field}
                      value={field.value ?? ""}
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
              name="ibu.jenjangPendidikan"
              render={({ field }) => (
                <FormItem className="md:w-1/3">
                  <FormLabel htmlFor="ibu-jenjang-pendidikan-form-item">
                    Jenjang Pendidikan
                  </FormLabel>
                  <FormControl>
                    <div className="relative w-full">
                      <select
                        id="ibu-jenjang-pendidikan-form-item"
                        {...field}
                        // value={field.value ?? ""}
                        className="peer appearance-none w-full focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded px-3 py-1 h-12"
                      >
                        <option value="">Pilih Jenjang Pendidikan Ibu</option>
                        {jenjangPendidikanOptions.map((option) => (
                          <option
                            key={option.value}
                            value={option.value}
                            className="custom-select-option"
                          >
                            {option.label}
                          </option>
                        ))}
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
            <FormField
              control={form.control}
              name="ibu.pekerjaan"
              render={({ field }) => (
                <FormItem className="md:w-1/2">
                  <FormLabel>Pekerjaan</FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      className="peer appearance-none w-full focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded px-3 py-1 h-12"
                    >
                      <option value="">Pilih Pekerjaan Ibu</option>
                      {sortedPekerjaanOptions.map((option) => (
                        <option
                          key={option.value}
                          value={option.value}
                          className="custom-select-option"
                        >
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ibu.pendapatan"
              render={({ field }) => (
                <FormItem className="md:w-1/2">
                  <FormLabel>Pendapatan perbulan</FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      // value={field.value ?? ""}
                      className="peer appearance-none w-full focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded px-3 py-1 h-12"
                    >
                      <option value="">Pilih Rentang Pendapatan</option>
                      {rentangPendapatanOptions.map((option) => (
                        <option
                          key={option.value}
                          value={option.value}
                          className="custom-select-option"
                        >
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="h-0 py-4 border-b-2"></div>

          <h1 className="text-lg pt-4">Data Ayah</h1>

          <FormField
            control={form.control}
            name="ayah.nama"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama</FormLabel>
                <FormControl>
                  <Input
                    placeholder="nama"
                    {...field}
                    value={field.value ?? ""}
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
              name="ayah.kk"
              render={({ field }) => (
                <FormItem className="md:w-1/2">
                  <FormLabel>Nomor Kartu Keluarga</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="16 digit"
                      {...field}
                      value={field.value ?? ""}
                      className="bg-background h-12"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ayah.nik"
              render={({ field }) => (
                <FormItem className="md:w-1/2">
                  <FormLabel>NIK</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="16 digit"
                      {...field}
                      value={field.value ?? ""}
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
              name="ayah.jenjangPendidikan"
              render={({ field }) => (
                <FormItem className="md:w-1/3">
                  <FormLabel htmlFor="ayah-jenjang-pendidikan-form-item">
                    Jenjang Pendidikan
                  </FormLabel>
                  <FormControl>
                    <div className="relative w-full">
                      <select
                        id="ayah-jenjang-pendidikan-form-item"
                        {...field}
                        // value={field.value ?? ""}
                        className="peer appearance-none w-full focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded px-3 py-1 h-12"
                      >
                        <option value="">Pilih Jenjang Pendidikan Ayah</option>
                        {jenjangPendidikanOptions.map((option) => (
                          <option
                            key={option.value}
                            value={option.value}
                            className="custom-select-option"
                          >
                            {option.label}
                          </option>
                        ))}
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
            <FormField
              control={form.control}
              name="ayah.pekerjaan"
              render={({ field }) => (
                <FormItem className="md:w-1/2">
                  <FormLabel>Pekerjaan</FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      // value={field.value ?? ""}
                      className="peer appearance-none w-full focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded px-3 py-1 h-12"
                    >
                      <option value="">Pilih Pekerjaan Ayah</option>
                      {sortedPekerjaanOptions.map((option) => (
                        <option
                          key={option.value}
                          value={option.value}
                          className="custom-select-option"
                        >
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ayah.pendapatan"
              render={({ field }) => (
                <FormItem className="md:w-1/2">
                  <FormLabel>Pendapatan perbulan</FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      // value={field.value ?? ""}
                      className="peer appearance-none w-full focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded px-3 py-1 h-12"
                    >
                      <option value="">Pilih Rentang Pendapatan</option>
                      {rentangPendapatanOptions.map((option) => (
                        <option
                          key={option.value}
                          value={option.value}
                          className="custom-select-option"
                        >
                          {option.label}
                        </option>
                      ))}
                    </select>
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

export default DataOrangTuaForm;
