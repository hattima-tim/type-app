import { getPageData } from "@/app/bookApi";

export default async function Page({
  params,
}: {
  params: { book: string; page: number };
}) {
  const page = await getPageData(params.book, params.page);

  return <article className="px-40 pt-8">{page}</article>;
}
