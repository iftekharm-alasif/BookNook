"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "All Books", href: "/all-books" },
  { name: "Add Book", href: "/add-books" },
  { name: "My Books", href: "/my-books" },
  { name: "My Borrows", href: "/my-borrows" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#E8E1D5]/80 bg-[#FAF7F0]/95 shadow-sm backdrop-blur-xl">
      <nav className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <Image
            src="/assest/Gemini_Generated_Image_695guc695guc695g-removebg-preview.png"
            alt="BookNook Logo"
            width={160}
            height={60}
            priority
            className="h-12 w-auto object-contain sm:h-[54px]"
          />

          <span className="text-2xl font-bold tracking-tight text-[#172554]">
            BookNook<span className="text-[#C5A46D]">.</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group relative rounded-lg px-3 py-2.5 text-[13px] font-semibold tracking-wide text-[#475569] transition-all duration-300 hover:bg-[#172554]/5 hover:text-[#172554] xl:px-4 xl:text-sm"
            >
              {link.name}

              <span className="absolute bottom-1 left-1/2 h-[2px] w-0 -translate-x-1/2 rounded-full bg-[#C5A46D] transition-all duration-300 group-hover:w-1/2" />
            </Link>
          ))}
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden shrink-0 items-center gap-3 lg:flex">
          <Link
            href="/login"
            className="inline-flex items-center justify-center rounded-md border border-[#172554]/30 px-4 py-2 text-sm font-medium text-[#172554] transition hover:bg-[#F5EFE3]"
          >
            Sign In
          </Link>

          <Link
            href="/register"
            className="inline-flex h-10 items-center justify-center rounded-lg bg-[#172554] px-5 font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#243B73] hover:shadow-md"
          >
            Sign Up
            <span className="ml-2 text-[#C5A46D]">→</span>
          </Link>
        </div>

        {/* Mobile Navigation */}
        <div className="lg:hidden">
          <Sheet>
    <SheetTrigger
  type="button"
  aria-label="Open navigation menu"
  className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#E8E1D5] bg-white/70 text-[#172554] transition hover:border-[#C5A46D] hover:bg-[#172554] hover:text-white"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="21"
    height="21"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 6h16M4 12h16M4 18h16" />
  </svg>
</SheetTrigger>

            <SheetContent
              side="right"
              className="w-[300px] border-l border-[#E8E1D5] bg-[#FAF7F0] sm:w-[350px]"
            >
              <SheetHeader className="border-b border-[#E8E1D5] pb-5">
                <SheetTitle>
                  <Image
                    src="/assest/Gemini_Generated_Image_695guc695guc695g-removebg-preview.png"
                    alt="BookNook Logo"
                    width={150}
                    height={55}
                    className="h-12 w-auto object-contain"
                  />
                </SheetTitle>
              </SheetHeader>

              {/* Mobile Links */}
              <div className="mt-7 flex flex-col gap-2">
                <p className="mb-2 px-4 text-[11px] font-bold uppercase tracking-[2px] text-[#C5A46D]">
                  Navigation
                </p>

                {navLinks.map((link) => (
                  <SheetClose asChild key={link.href}>
                    <Link
                      href={link.href}
                      className="flex items-center justify-between rounded-xl px-4 py-3.5 text-sm font-semibold text-[#334155] transition-all duration-200 hover:bg-[#172554] hover:text-white"
                    >
                      {link.name}
                      <span className="text-[#C5A46D]">→</span>
                    </Link>
                  </SheetClose>
                ))}
              </div>

              {/* Mobile Auth Buttons */}
              <div className="mt-8 border-t border-[#E8E1D5] pt-6">
                <p className="mb-4 px-1 text-[11px] font-bold uppercase tracking-[2px] text-[#C5A46D]">
                  Get Started
                </p>

                <div className="flex flex-col gap-3">
                  <SheetClose asChild>
                    <Link
                      href="/login"
                      className="flex h-11 w-full items-center justify-center rounded-lg border border-[#172554]/30 font-semibold text-[#172554] transition hover:bg-[#172554] hover:text-white"
                    >
                      Sign In
                    </Link>
                  </SheetClose>

                  <SheetClose asChild>
                    <Link
                      href="/register"
                      className="flex h-11 w-full items-center justify-center rounded-lg bg-[#172554] font-semibold text-white transition hover:bg-[#243B73]"
                    >
                      Sign Up
                    </Link>
                  </SheetClose>
                </div>
              </div>

              <div className="absolute bottom-6 left-6 text-xs text-slate-400">
                © 2026 BookNook. All rights reserved.
              </div>
            </SheetContent>
          </Sheet>
        </div>

      </nav>
    </header>
  );
}