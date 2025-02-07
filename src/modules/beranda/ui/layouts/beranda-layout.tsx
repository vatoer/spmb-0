import { SidebarProvider } from "@/components/ui/sidebar";
import { BerandaNavbar } from "../components/beranda-navbar";
import { BerandaSidebar } from "../components/beranda-sidebar";

interface BerandaLayoutProps {
  children: React.ReactNode;
}

export const BerandaLayout = ({ children }: BerandaLayoutProps) => {
  return (
    <SidebarProvider>
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
