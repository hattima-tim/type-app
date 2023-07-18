"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getAllBooksData, Book } from "./bookApi";

export default function Home() {
  const [books, setBooks] = useState<Book[]>([]);
  const [userAuthStatus, setUserAuthStatus] = useState("not-logged");

  useEffect(() => {
    getAllBooksData().then((val) => {
      if (val) {
        setBooks(val);
      }
    });

    fetch("http://localhost:3000/user", {
      credentials: "include",
      mode: "cors",
      method: "GET",
    }).then(async (val) => {
      if (await val.json()) {
        setUserAuthStatus("logged-in");
      }
    });
  }, []);

  const handleLogOut = async () => {
    const response = await fetch(
      "http://localhost:3000/authentication/log-out",
      {
        credentials: "include",
        method: "POST",
      }
    );

    if (response.status === 200) {
      setUserAuthStatus("not-logged");
    }
  };

  return (
    <div>
      <nav className="flex justify-between mx-8 mt-4">
        <Link href="/">
          <h1>Typing Test App</h1>
        </Link>
        <div className="flex gap-4">
          {userAuthStatus !== "logged-in" ? (
            <Link href="/authentication/sign-up">Sign Up</Link>
          ) : (
            <button onClick={handleLogOut}>Log Out</button>
          )}
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
            <Link key={book.id} href={`/books/${book.id}`}>
              <div className="bg-white flex shadow-lg rounded-lg overflow-hidden">
                <Image
                  src={book.imgUrl}
                  width={200}
                  height={200}
                  alt="typing test"
                />
                <div className="flex">
                  <h3 className="font-bold text-xl mb-2">{book.bookName}</h3>
                  <p className="text-gray-700 self-end text-base">
                    {book.pages.length} pages
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
