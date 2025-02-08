"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Menu } from "lucide-react";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "1. Membuat Akun",
    href: "/buat-akun",
    description:
      "Klik Buat Akun Sekarang, kemudian isi dengan nama dan email anda. Anda juga bisa login menggunakan akun google anda. Anda akan mendapatkan email verifikasi untuk mengaktifkan akun anda",
  },
  {
    title: "2. Isi Formulir",
    href: "/formulir",
    description:
      "Isi Formulir data diri Calon Murid Baru, data Orang Tua dan unggah dokumen yang diperlukan.",
  },
  {
    title: "3. Pilih Sekolah",
    href: "/sekolah",
    description: "Pilih Sekolah tujuan anda dan ajukan pendaftaran..",
  },
  {
    title: "4. Pembayaran",
    href: "/pembayaran",
    description:
      "Pembayaran Biaya registrasi melalui transfer bank atau Indomaret terdekat. cetak bukti pembayaran.",
  },
  {
    title: "5. Verifikasi & Seleksi",
    href: "/pendaftaran",
    description:
      "Proses Verifikasi dan Seleksi untuk setiap sekolah bervariasi tergantung keperluan sekolah. Anda akan mendapatkan informasi lebih lengkap saat anda memilih sekolah..",
  },
  {
    title: "6. Lapor diri",
    href: "/lapor-diri",
    description:
      "Pastikan Anda menyelesaikan pembayaran keuangan sesuai ketentuan masing-masing sekolah untuk mengamankan posisi Anda. Anda mungkin diminta untuk melengkapi dokumen yang diperlukan. Pastikan Anda telah membaca dengan seksama informasi yang diberikan oleh sekolah tujuan Anda..",
  },
];

export function NavigationMenuDemo() {
  return (
    <NavigationMenu className="hidden md:flex">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Panduan</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <Link
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    <Menu className="h-6 w-6" />
                    <div className="mb-2 mt-4 text-lg font-medium">
                      shadcn/ui
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Beautifully designed components built with Radix UI and
                      Tailwind CSS.
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <ListItem href="/docs" title="Introduction">
                Re-usable components built using Radix UI and Tailwind CSS.
              </ListItem>
              <ListItem href="/docs/installation" title="Installation">
                How to install dependencies and structure your app.
              </ListItem>
              <ListItem href="/docs/primitives/typography" title="Typography">
                Styles for headings, paragraphs, lists...etc
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Alur</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/docs" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Jadwal
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/docs" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Daya Tampung
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/docs" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Seleksi
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
