import { getAllBooksData, getBookData } from "@/app/bookApi";
import Image from "next/image";
import Link from "next/link";

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

  return (
    <div className="flex items-center flex-col">
      <main className="flex w-1/3">
        <Image src={data.imgUrl} alt="book image" width={400} height={400} />
        <div>
          <h1>{data.bookName}</h1>
          <h3>{data.author}</h3>
        </div>
      </main>
      <div className="w-1/2">
        {data.pages.map((page: string, index: number) => {
          return (
            <div
              key={page}
              className="h-8 shadow bg-gray-200 my-4 pl-4 flex items-center"
            >
              <Link href={`/books/${data.id}/pages/${index}`}>
                Page {index}
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
