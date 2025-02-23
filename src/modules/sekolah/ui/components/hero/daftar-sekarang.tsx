"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

interface DaftarSekarangProps {
  className?: string;
}
export const DaftarSekarang = ({ className }: DaftarSekarangProps) => {
  const { status, data } = useSession();
  const [label, setLabel] = useState("Buat Akun & Daftar Sekarang");

  useEffect(() => {
    if (status === "authenticated") {
      setLabel("Daftar Sekarang");
    }
  }, [status]);

  const handleClick = () => {
    if (status === "authenticated") {
      // update wizard form
    } else {
      window.location.href = "/buat-akun-baru";
    }
  };

  if (status === "loading") {
    return null;
  }

  return (
    <Button
      type="button"
      className={cn(
        "py-2 px-4 text-white rounded-lg shadow-lg bg-blue-700 hover:bg-blue-600 text-center md:w-auto h-12 md:h-14",
        className
      )}
      onClick={handleClick}
    >
      <span className="text-lg md:text-2xl">{label}</span>
    </Button>
  );
};
