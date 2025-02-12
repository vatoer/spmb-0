import { cn } from "@/lib/utils";

interface StatistikProps {
  className?: string;
}

export const Statistik = ({ className }: StatistikProps) => {
  return (
    <div
      className={cn(
        "w-full md:h-[calc(50vh-4rem)] py-8 md:px-8 flex flex-col items-center justify-center",
        className && className
      )}
    >
      <h1 className="text-3xl font-bold z-20 text-center">Statistik</h1>
      <div className="flex flex-col md:flex-row items-center gap-2"></div>
    </div>
  );
};
