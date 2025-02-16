import { SidebarProvider } from "@/components/ui/sidebar";
import { BerandaNavbar } from "@/modules/beranda/ui/components/beranda-navbar";
import { BerandaSidebar } from "@/modules/beranda/ui/components/beranda-sidebar";
import { cookies } from "next/headers";

interface PendaftaranLayoutProps {
  children: React.ReactNode;
}

export const PendaftaranLayout = async ({
  children,
}: PendaftaranLayoutProps) => {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true";

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <div className="w-full bg-gradient-to-br from-red-200 via-blue-300 to-gray-400">
        <BerandaNavbar />
        <div className="flex min-h-screen pt-[4rem]">
          <BerandaSidebar />
          <main className="flex-1 overflow-y-auto flex flex-col py-2  md:p-4 gap-4">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};
