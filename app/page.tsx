import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const books = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  return (
    <div>
      <nav className="flex justify-between mx-8 mt-4">
        <Link href="/">
          <h1>Typing Test App</h1>
        </Link>
        <div className="flex gap-4">
          <Link href="/leaderboard">Leaderboard</Link>
          <Link href="/about">About</Link>
        </div>
      </nav>

      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
          <h1 className="text-6xl font-bold">Welcome to Typing Test App</h1>

          <p className="mt-3 text-2xl">Type and see the result!</p>

          <Image
            src="https://fakeimg.pl/600x400"
            width={600}
            height={400}
            alt="typing test"
          />
        </main>
      </div>
      <h2 className="text-2xl">Books</h2>
      {
        // show a grid of books with picture, name, page number with a card and a link//
      }
      <div className="grid grid-cols-3 gap-4">
        {books.map((book) => {
          return (
            <Link key={book} href={`/books/${book}`}>
              <div className="bg-white flex shadow-lg rounded-lg overflow-hidden">
                <Image
                  src="https://fakeimg.pl/200x200"
                  width={200}
                  height={200}
                  alt="typing test"
                />
                <div className="p-4 flex">
                  <h3 className="font-bold text-xl mb-2">Book Name</h3>
                  <p className="text-gray-700 self-end text-base">
                    Page Number
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
