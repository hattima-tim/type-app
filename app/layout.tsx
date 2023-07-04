import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Type App",
  description: "An app to test your bangla typing.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="flex justify-between mx-8 mt-4">
          <Link href="/">
            <h1>Typing Test App</h1>
          </Link>
          <div className="flex gap-4">
            <Link href="/leaderboard">Leaderboard</Link>
            <Link href="/about">About</Link>
          </div>
        </nav>

        {children}
      </body>
    </html>
  );
}
