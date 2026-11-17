
import type { Metadata } from "next";
import {  Philosopher } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";

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
        <Toaster
  position="top-right"
  toastOptions={{
    classNames: {
      toast:
        "!bg-[#FAF7F0] !border !border-[#E8E1D5] !text-[#172554] !shadow-lg",
      title: "!text-[#172554] !font-semibold",
      description: "!text-slate-600",
      success: "!border-l-4 !border-l-[#C5A46D]",
      error: "!border-l-4 !border-l-[#B45353]",
      icon: "!text-[#C5A46D]",
    },
  }}
/>
        {children}
        <Footer></Footer>
      </body>
    </html>
  );
}
