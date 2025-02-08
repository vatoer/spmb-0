import { SidebarProvider } from "@/components/ui/sidebar";
import { BerandaNavbar } from "../components/beranda-navbar";
import { BerandaSidebar } from "../components/beranda-sidebar";
import { cookies } from "next/headers";

interface BerandaLayoutProps {
  children: React.ReactNode;
}

export const BerandaLayout = async ({ children }: BerandaLayoutProps) => {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true";

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <div className="w-full bg-blue-500">
        <BerandaNavbar />
        <div className="flex min-h-screen pt-[4rem]">
          <BerandaSidebar />
          <main className="flex-1 overflow-y-auto">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
};
