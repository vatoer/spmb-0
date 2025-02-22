import { cn } from "@/lib/utils";

interface DaftarSekarangProps {
  className?: string;
}
export const DaftarSekarang = ({ className }: DaftarSekarangProps) => {
  return (
    <button
      type="button"
      className={cn(
        "py-2 px-4 text-white rounded-lg shadow-lg bg-blue-700 hover:bg-blue-600 text-center w-full md:w-auto h-12 md:h-14",
        className
      )}
    >
      <span className="text-lg md:text-2xl">Daftar Sekarang</span>
    </button>
  );
};
