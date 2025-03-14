import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import MainSection from "./main-section";
import { Separator } from "@/components/ui/separator";
import PersonalSidebar from "./personal-section";

export const BerandaSidebar = () => {
  return (
    <Sidebar className="pt-16 z-40 border-none" collapsible="icon" title="SPMB">
      <SidebarContent className="bg-background">
        <MainSection />
        <Separator />
        <PersonalSidebar />
      </SidebarContent>
    </Sidebar>
  );
};
