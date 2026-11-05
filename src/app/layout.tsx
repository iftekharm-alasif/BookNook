
import type { Metadata } from "next";
import {  Philosopher } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

const philosopher = Philosopher({
  variable: "--font-philosopher",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "BookNook",
  description: "Discover and explore your favorite books with BookNook.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={` ${philosopher.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Navbar />
        {children}
        <Footer></Footer>
      </body>
    </html>
  );
}
