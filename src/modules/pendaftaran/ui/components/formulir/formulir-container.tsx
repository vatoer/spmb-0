import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import PendaftaranBreadcrumbs, {
  Item,
} from "@/modules/pendaftaran/ui/components/breadcrumbs";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

interface FormulirContainerProps {
  breadcrumbs: Item[];
  title: string;
  children: React.ReactNode;
}

export const FormulirContainer = ({
  breadcrumbs,
  title,
  children,
}: FormulirContainerProps) => {
  return (
    <div className="w-full">
      <PendaftaranBreadcrumbs items={breadcrumbs} />
      <div className="w-full flex flex-col items-center justify-start md:min-h-[calc(80vh-4rem)] ">
        <div
          className="min-h-[calc(50vh-4rem)] w-full lg:w-2/3 border bg-gray-100 md:rounded-sm mt-2
        flex flex-col items-center justify-start gap-2 p-2 md:p-4"
        >
          <h1 className="hidden md:block text-3xl font-bold z-20 text-center">
            {title}
          </h1>
          {children}
        </div>
      </div>
    </div>
  );
};

interface FormulirContainerFooterProps {
  prev?: {
    href: string;
    title: string;
  };
  next: {
    href: string;
    title: string;
  };
}

export const FormulirContainerFooter = ({
  prev,
  next,
}: FormulirContainerFooterProps) => {
  return (
    <div
      className={cn(
        "mt-auto flex flex-row gap-2 w-full items-end",
        prev ? "justify-between" : "justify-end"
      )}
    >
      {prev && (
        <Link href={prev.href}>
          <Button variant={"outline"}>
            <ChevronLeft size={24} />
            {prev.title}
          </Button>
        </Link>
      )}
      <Link href={next.href}>
        <Button variant={"outline"}>
          {next.title} <ChevronRight size={24} />
        </Button>
      </Link>
    </div>
  );
};

export default FormulirContainer;
