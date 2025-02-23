import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { DaftarSekarang } from "@/modules/sekolah/ui/components/hero/daftar-sekarang";
import Image from "next/image";

export function HeroCarousel() {
  return (
    <Carousel className="w-full mx-auto">
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card className="rounded-none">
                <CardContent className="flex h-[50vh] md:h-[60vh] items-center justify-center p-6 relative ">
                  <Image
                    alt="Hero Image"
                    src={`/images/hero/carousel/hero${index + 1}.jpg`}
                    style={{ objectFit: "cover" }}
                    fill
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <DaftarSekarang className="absolute bottom-0 md:bottom-6 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      <CarouselPrevious className="ml-16" />
      <CarouselNext className="mr-16" />
    </Carousel>
  );
}
