"use client";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { url } from "inspector";
import { HomeIcon, Settings } from "lucide-react";
import Link from "next/link";

const items = [
  {
    title: "Beranda",
    url: "/",
    icon: HomeIcon,
  },
  {
    title: "Pengaturan",
    url: "/pengaturan",
    icon: Settings,
    auth: true, // Hanya user yang sudah login yang bisa mengakses halaman ini
  },
];

const MainSidebar = () => {
  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item, index) => (
            <SidebarMenuItem key={index}>
              <SidebarMenuButton
                tooltip={item.title}
                asChild
                isActive={false} // TODO: change to look for active route from current route
                onClick={() => {}}
              >
                <Link href={item.url}>
                  <item.icon />
                  <span className="text-sm">{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export default MainSidebar;
