import { UmumLayout } from "@/modules/umum/layouts/umum-layout";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return <UmumLayout>{children}</UmumLayout>;
};

export default Layout;
