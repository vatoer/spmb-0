import { notFound } from "next/navigation";

const isNpsn = (query: string) => {
  // probe if the query is NPSN
  // if numeric and 10 digits
  return /^\d{8}$/.test(query);
};

const SekolahPage = async ({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) => {
  // console.log((await params).slug);
  const slug = (await params).slug;
  const [npsn, ...rest] = slug;

  if (!isNpsn(npsn)) {
    notFound();
  }

  // check if npsn is a number

  return <div>Halaman Sekolah</div>;
};

export default SekolahPage;
