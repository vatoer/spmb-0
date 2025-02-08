"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { ChevronRight, HomeIcon, Milestone, Settings } from "lucide-react";
import Link from "next/link";

const items = [
  {
    title: "Beranda",
    url: "/",
    icon: HomeIcon,
  },
  {
    title: "Panduan",
    url: "/panduan",
    icon: Settings,
    auth: true, // Hanya user yang sudah login yang bisa mengakses halaman ini
  },
  {
    title: "Alur",
    icon: Milestone,
    auth: false, // Hanya user yang sudah login yang bisa mengakses halaman ini
    subs: [
      {
        title: "Membuat Akun",
        url: "/buat-akun",
      },
      {
        title: "Isi Formulir",
        url: "/formulir",
      },
      {
        title: "Pilih Sekolah",
        url: "/sekolah",
      },
      {
        title: "Pembayaran",
        url: "/pembayaran",
      },
      {
        title: "Verifikasi & Seleksi",
        url: "/pendaftaran",
      },
      {
        title: "Lapor diri",
        url: "/lapor-diri",
      },
    ],
  },
];

const MainSidebar = () => {
  return (
    <SidebarGroup className="md:flex">
      <SidebarGroupContent>
        <SidebarMenu>
          <Collapsible defaultOpen className="group/collapsible">
            {items.map((item) => {
              const hasSubMenu = Boolean(item.subs?.length);
              const Icon = item.icon;

              return (
                <SidebarMenuItem key={item.title || item.url}>
                  {hasSubMenu ? (
                    <>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton
                          tooltip={item.title}
                          asChild
                          isActive={false} // TODO: Change this to check active route dynamically
                        >
                          <Link href="#">
                            {Icon && <Icon />}
                            <span className="text-sm">{item.title}</span>
                            <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                          </Link>
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="">
                        <SidebarMenuSub>
                          {item.subs?.map((sub, subIndex) => (
                            <SidebarMenuSubItem key={subIndex} className="py-1">
                              <Link href={sub.url}>
                                <span className="text-sm">{sub.title}</span>
                              </Link>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </>
                  ) : (
                    <SidebarMenuButton
                      tooltip={item.title}
                      asChild
                      isActive={false} // TODO: Change this to check active route dynamically
                    >
                      <Link href={item.url?.toString() || "#"}>
                        {Icon && <Icon />}
                        <span className="text-sm">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              );
            })}
          </Collapsible>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export default MainSidebar;
