import { SidebarTrigger } from "@/components/ui/sidebar";
import AuthButton from "@/modules/auth/ui/components/user/auth-button";
import Image from "next/image";
import Link from "next/link";
import { NavigationMenuDemo } from "./nav-menu";
import SearchInput from "./search-input";

export const BerandaNavbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-white flex items-center px-2 pr-5 z-50">
      <div className="flex items-center gap-4 w-full">
        <div className="flex items-center flex-shrink-0">
          {/* Menu and Logo */}
          <SidebarTrigger className="" />
          <Link href="/">
            <div className="p-4 flex items-center gap-1">
              <Image src="/window.svg" alt="Logo" width={32} height={32} />
              <p className="text-xl font-semibold">SPMB</p>
            </div>
          </Link>
        </div>

        {/* Search bar*/}
        <div className="flex-1 flex justify-start max-w-[900px] mx-auto">
          <NavigationMenuDemo />
          <SearchInput />
        </div>

        {/* Profile */}
        <div className="flex-shrink-0 items-center flex gap-4">
          <AuthButton />
        </div>
      </div>
    </nav>
  );
};
