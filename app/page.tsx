"use client";

import { useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { AuthContext } from "./authContext";

export default function Home() {
  const [authState, setAuthState] = useContext(AuthContext);

  const handleLogOut = async () => {
    const response = await fetch(
      "http://localhost:3000/authentication/log-out",
      {
        credentials: "include",
        method: "POST",
      }
    );

    if (response.status === 200) {
      setAuthState("not-logged");
    }
  };

  return (
    <>
      <section className="bg-gray-900 text-white">
        <nav className="absolute z-10 w-full justify-end flex pr-4 pt-4">
          <div className="flex gap-4">
            {authState !== "logged-in" ? (
              <Link href="/authentication/sign-up">Sign Up</Link>
            ) : (
              <button onClick={handleLogOut}>Log Out</button>
            )}
            <Link href="/leaderboard">Leaderboard</Link>
            <Link href="/about">About</Link>
          </div>
        </nav>

        <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl">
              Unlease your inner typist.
            </h1>

            <p className="mx-auto mt-4 max-w-xl sm:text-xl/relaxed">
              Why restrict yourself to dull typing exercises? Now you can
              practice and enjoy literary masterpieces.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                className="block w-full rounded border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
                href="/books"
              >
                Get Started
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className=" bg-[#111827] px-20">
        <h3 className="text-[#edf2f4] font-bold text-4xl mb-4">
          What&rsquo;s Inside?
        </h3>

        <div className="flex gap-4 items-center">
          <Image
            alt=""
            width={450}
            height={450}
            className="rounded-xl overflow-hidden"
            src="https://res.cloudinary.com/du3oueesv/image/upload/v1689995531/type-app/il_794xN.4437742813_8f9h_dezngl.jpg"
          ></Image>

          <div>
            <div className="mb-12">
              <h4 className="text-xl mb-2 text-[#edf2f4] font-bold">
                Diverse Selection
              </h4>
              <p className="text-base text-[#edf2f4]">
                Choose from a wide range of captivating books to elevate your
                typing experience.
              </p>
            </div>

            <div className="mb-12">
              <h4 className="text-xl mb-2 text-[#edf2f4] font-bold">
                User-friendly Interface
              </h4>
              <p className="text-base text-[#edf2f4]">
                Effortlessly navigate through the app, whether you’re a beginner
                or an advanced typist.
              </p>
            </div>

            <div className="mb-12">
              <h4 className="text-xl mb-2 text-[#edf2f4] font-bold">
                Track Progress
              </h4>
              <p className="text-base text-[#edf2f4]">
                Keep an eye on your typing scores and improvement as you immerse
                yourself in literary adventures.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="pt-60 bg-[#111827] flex gap-8 px-20">
        <div>
          <h3 className="text-[#edf2f4] font-bold text-4xl mb-12">
            Featured Books
          </h3>

          <p className="text-base text-[#edf2f4]">
            Here’s a sneak peek of the enthralling books awaiting you in our
            collection.
          </p>
        </div>

        <div>
          <h3 className="text-[#edf2f4] font-bold text-4xl mb-8">Books</h3>

          <ul>
            <li className="text-[#edf2f4] flex justify-between font-bold gap-16 text-2xl pt-4 pb-6 border-b-2 border-b-gray-600">
              <span>Mysterious Forest</span>
              <span>Harper Woods</span>
            </li>

            <li className="text-[#edf2f4] flex justify-between font-bold text-2xl pt-4 pb-6 border-b-2 border-b-slate-600 mb-4">
              <span>Cosmic Voyage</span>
              <span>Jules Verne</span>
            </li>

            <li className="text-[#edf2f4] flex justify-between font-bold text-2xl mb-4 pt-4 pb-6 border-b-2 border-b-slate-600">
              <span>Paraller Lives</span>
              <span>Olivia Jones</span>
            </li>

            <li className="text-[#edf2f4] flex justify-between font-bold text-2xl mb-4 pt-4 pb-6 border-b-2 border-b-slate-600">
              <span>Lost Civilazation</span>
              <span>Aiden Stone</span>
            </li>
          </ul>
        </div>
      </section>

      <div className="pt-20 pb-6 bg-[#111827] flex flex-wrap justify-center gap-4">
        <a
          className="block w-full rounded border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
          href="/get-started"
        >
          Get Started
        </a>
      </div>

      <footer className="pb-4 bg-[#111827]">
        <div className="flex gap-8 items-center w-full border-t border-gray-600 pt-8">
          <div className="sm:flex sm:justify-between">
            <p className="pl-4 text-xs text-gray-500">
              &copy; 2023. hattima tim. All rights reserved.
            </p>
          </div>

          <ul className="flex gap-4">
            <li>
              <a
                href="/"
                rel="noreferrer"
                target="_blank"
                className="text-gray-700 transition hover:opacity-75"
              >
                <span className="sr-only">GitHub</span>

                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clip-rule="evenodd"
                  />
                </svg>
              </a>
            </li>

            <li>
              <a
                href="https://www.linkedin.com"
                rel="noreferrer"
                target="_blank"
                className="text-gray-700 transition hover:opacity-75"
              >
                <span className="sr-only">LinkedIn</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  className="bi bi-linkedin"
                  viewBox="0 0 16 16"
                  aria-hidden="true"
                >
                  <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
                </svg>
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </>
  );
}
