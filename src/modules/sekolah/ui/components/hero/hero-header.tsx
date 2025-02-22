import Image from "next/image";
interface HeroHeaderProps {
  name: string;
  tagline: string;
  logo: string;
}

const HeroHeader = ({ name, tagline, logo }: HeroHeaderProps) => {
  return (
    <header className="flex flex-row items-center text-center justify-start gap-4 py-4 px-2 md:px-8">
      <div className="rounded-full md:w-1/3 h-auto">
        <div className="relative w-12 h-12 md:h-20 md:w-20 flex items-center justify-center rounded-full bg-blue-50">
          <Image
            src={logo}
            alt={`${name} Logo`}
            style={{ objectFit: "cover" }}
            fill
          />
        </div>
      </div>
      <div className="md:w-1/2">
        <h1 className="text-xl md:text-3xl font-bold mt-2">{name}</h1>
        <p className=" md:text-xl text-gray-700 mb-4">{tagline}</p>
        {/* {isHeroVisible && <DaftarSekarang />} */}
      </div>
      <div className="md:w-1/3"></div>
    </header>
  );
};

export default HeroHeader;
