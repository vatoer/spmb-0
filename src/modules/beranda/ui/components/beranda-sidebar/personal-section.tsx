"use client";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Send, UserCog } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";

const items = [
  {
    title: "Profile",
    url: "/profile",
    icon: UserCog,
  },
  {
    title: "Riwayat Pendaftaran",
    url: "/riwayat-pendaftaran",
    icon: Send,
    auth: true, // Hanya user yang sudah login yang bisa mengakses halaman ini
  },
];

const PersonalSidebar = () => {
  const session = useSession();

  if (session.status === "unauthenticated") {
    return null;
  }

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
