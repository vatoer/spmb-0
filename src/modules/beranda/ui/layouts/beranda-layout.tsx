import { SidebarProvider } from "@/components/ui/sidebar";
import BerandaNavbar from "../components/beranda-navbar";

interface BerandaLayoutProps {
  children: React.ReactNode;
}

export const BerandaLayout = ({ children }: BerandaLayoutProps) => {
  return (
    <SidebarProvider>
      <div className="w-full bg-blue-500">
        <BerandaNavbar />
        <div>{children}</div>
      </div>
    </SidebarProvider>
  );
};
