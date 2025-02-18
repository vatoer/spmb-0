import { SidebarProvider } from "@/components/ui/sidebar";
import { BerandaNavbar } from "@/modules/beranda/ui/components/beranda-navbar";
import { BerandaSidebar } from "@/modules/beranda/ui/components/beranda-sidebar";
import { cookies } from "next/headers";

interface UmumLayoutProps {
  children: React.ReactNode;
}

export const UmumLayout = async ({ children }: UmumLayoutProps) => {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true";

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <div className="w-full bg-gray-100/50 dark:bg-gray-800 dark:text-white">
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
