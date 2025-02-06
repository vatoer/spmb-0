import { BerandaLayout } from "@/modules/beranda/ui/layouts/beranda-layout";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return <BerandaLayout>{children}</BerandaLayout>;
};

export default Layout;
