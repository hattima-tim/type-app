import { getAllBooksData, getBookData } from "@/app/bookApi";

export async function generateStaticParams() {
  const books = await getAllBooksData();

  return books.map((book) => {
    return {
      book: book.id,
    };
  });
}

export default async function Book({ params }: { params: { book: string } }) {
  const data = await getBookData(params.book);

  return <main>{JSON.stringify(data)}</main>;
}
