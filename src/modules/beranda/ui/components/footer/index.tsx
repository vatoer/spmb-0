import Link from "next/link";
import Image from "next/image";

export const Footer = () => {
  return (
    <footer>
      <div className="w-full md:h-[calc(33vh-4rem)] py-8 px-8 md:px-8 flex flex-col md:flex-row items-start md:justify-between gap-4">
        <div className="flex flex-col  gap-2 md:items-start">
          <h1 className="text-2xl font-bold z-20">Siap SPMB</h1>
          <p className="text-lg">P.T. Stargan Mitra Teknologi</p>
          <p className="text-lg">Jl. Delima 5 Jatibening Bekasi Jawa Barat</p>
        </div>
        <div className="flex flex-col gap-2 md:items-end">
          <h1 className="text-lg font-bold z-20">Terhubung dengan kami</h1>
          <div className="flex gap-2 flex-col md:flex-row">
            <Link
              href="https://www.facebook.com/siapspmb"
              className="flex flex-row items-center gap-2"
            >
              <Image
                src="/icons/facebook.svg"
                alt="Facebook"
                width={24}
                height={24}
              />
              <span>siapspmb</span>
            </Link>
            <Link
              href="https://www.instagram.com/siapspmb/"
              className="flex flex-row items-center gap-2"
            >
              <Image
                src="/icons/instagram.svg"
                alt="Instagram"
                width={24}
                height={24}
              />
              <span>siapspmb</span>
            </Link>
            <Link
              href="https://www.youtube.com/channel/UCMzvZj1m9H2ZI1ZwQXV1N1w"
              className="flex flex-row items-center gap-2"
            >
              <Image
                src="/icons/youtube.svg"
                alt="Youtube"
                width={24}
                height={24}
              />
              <span>siapspmb</span>
            </Link>
            <Link
              href="https://twitter.com/siapspmb"
              className="flex flex-row items-center gap-2"
            >
              <Image src="/icons/x.svg" alt="Twitter" width={24} height={24} />
              <span>siapspmb</span>
            </Link>
          </div>
        </div>
      </div>
      <div className="w-full py-8 px-8 md:px-8 bg-zinc-100  flex flex-col items-center justify-center">
        <p className="text-center text-sm font-semibold z-20">
          &copy; 2025 Siap SPMB. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};
