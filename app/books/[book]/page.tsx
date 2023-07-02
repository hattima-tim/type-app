export async function generateStaticParams() {
  const books = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "11"];

  return books.map((bookName) => {
    return {
      book: bookName,
    };
  });
}

async function getBookData(book: string) {
  const res = await fetch(`https://reqres.in/api/users?page=${book}`);

  if (!res.ok) {
    throw new Error("Failed to fetch data.");
  }

  return res.json();
}

export default async function Book({ params }: { params: { book: string } }) {
  const data = await getBookData(params.book);

  return <main>{JSON.stringify(data)}</main>;
}
