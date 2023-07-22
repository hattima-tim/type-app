"use client";

import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getAllBooksData, Book } from "../bookApi";
import { AuthContext } from "../authContext";

export default function Home() {
  const [books, setBooks] = useState<Book[]>([]);
  const [authState, setAuthState] = useContext(AuthContext);

  useEffect(() => {
    getAllBooksData().then((val) => {
      if (val) {
        setBooks(val);
      }
    });
  }, []);

  return (
    <div>
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
