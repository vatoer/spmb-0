"use client";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { HomeIcon, Send } from "lucide-react";
import Link from "next/link";

const items = [
  {
    title: "Profile",
    url: "/profile",
    icon: HomeIcon,
  },
  {
    title: "Pendaftaran",
    url: "/pendaftaran",
    icon: Send,
    auth: true, // Hanya user yang sudah login yang bisa mengakses halaman ini
  },
];

const PersonalSidebar = () => {
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

export default PersonalSidebar;
