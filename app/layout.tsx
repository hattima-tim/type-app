import { Inter } from "next/font/google";
import "./globals.css";
import AuthContextProvider from "./authContextProvider";

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
        <AuthContextProvider>{children}</AuthContextProvider>
      </body>
    </html>
  );
}
