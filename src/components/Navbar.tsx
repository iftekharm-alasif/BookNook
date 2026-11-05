
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "All Books", href: "/all-books" },
  { name: "Add Book", href: "/add-books" },
  { name: "My Books", href: "/my-books" },
  { name: "My Borrows", href: "/my-borrows" },
];

export default function Navbar() {
  const { data: session, isPending } = authClient.useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  const user = session?.user;

  const handleLogout = async () => {
    await authClient.signOut();
    window.location.href = "/";
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#E8E1D5]/80 bg-[#FAF7F0]/95 shadow-sm backdrop-blur-xl">
      <nav className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
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

        <div className="hidden shrink-0 items-center gap-3 lg:flex">
          {!isPending &&
            (user ? (
              <details className="group relative">
                <summary className="flex cursor-pointer list-none items-center gap-2 rounded-full border border-[#E8E1D5] bg-white/70 py-1 pl-1 pr-3 transition hover:border-[#C5A46D] hover:bg-[#172554]/5 [&::-webkit-details-marker]:hidden">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#172554] font-bold text-white">
                    {user.image ? (
                      <Image
                        src={user.image}
                        alt={user.name || "User"}
                        width={36}
                        height={36}
                        unoptimized
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      user.name?.charAt(0).toUpperCase() || "U"
                    )}
                  </div>

                  <span className="max-w-[120px] truncate text-sm font-semibold text-[#172554]">
                    {user.name || "User"}
                  </span>

                  <svg
                    className="h-4 w-4 text-[#172554] transition-transform group-open:rotate-180"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </summary>

                <div className="absolute right-0 top-full z-[100] mt-3 w-56 overflow-hidden rounded-xl border border-[#E8E1D5] bg-[#FAF7F0] p-2 shadow-xl">
                  <div className="border-b border-[#E8E1D5] px-3 py-3">
                    <p className="truncate text-sm font-bold text-[#172554]">
                      {user.name || "User"}
                    </p>

                    <p className="truncate text-xs text-slate-500">
                      {user.email}
                    </p>
                  </div>

                  <Link
                    href="/profile"
                    className="mt-2 block rounded-lg px-3 py-2.5 text-sm font-semibold text-[#334155] transition hover:bg-[#172554] hover:text-white"
                  >
                    Profile
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full rounded-lg px-3 py-2.5 text-left text-sm font-semibold text-red-600 transition hover:bg-red-100"
                  >
                    Logout
                  </button>
                </div>
              </details>
            ) : (
              <>
                <Link
                  href="/signin"
                  className="inline-flex items-center justify-center rounded-md border border-[#172554]/30 px-4 py-2 text-sm font-medium text-[#172554] transition hover:bg-[#F5EFE3]"
                >
                  Sign In
                </Link>

                <Link
                  href="/signup"
                  className="inline-flex h-10 items-center justify-center rounded-lg bg-[#172554] px-5 font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#243B73] hover:shadow-md"
                >
                  Sign Up
                  <span className="ml-2 text-[#C5A46D]">→</span>
                </Link>
              </>
            ))}
        </div>

        <div className="lg:hidden">
          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
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

              <div className="mt-7 flex flex-col gap-2">
                <p className="mb-2 px-4 text-[11px] font-bold uppercase tracking-[2px] text-[#C5A46D]">
                  Navigation
                </p>

                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-between rounded-xl px-4 py-3.5 text-sm font-semibold text-[#334155] transition-all duration-200 hover:bg-[#172554] hover:text-white"
                  >
                    {link.name}
                    <span className="text-[#C5A46D]">→</span>
                  </Link>
                ))}
              </div>

              {!isPending && (
                <div className="mt-8 border-t border-[#E8E1D5] pt-6">
                  <p className="mb-4 px-1 text-[11px] font-bold uppercase tracking-[2px] text-[#C5A46D]">
                    {user ? "My Account" : "Get Started"}
                  </p>

                  {user ? (
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-3 rounded-xl border border-[#E8E1D5] bg-white/70 p-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#172554] font-bold text-white">
                          {user.image ? (
                            <Image
                              src={user.image}
                              alt={user.name || "User"}
                              width={40}
                              height={40}
                              unoptimized
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            user.name?.charAt(0).toUpperCase() || "U"
                          )}
                        </div>

                        <div className="min-w-0">
                          <p className="truncate font-semibold text-[#172554]">
                            {user.name || "User"}
                          </p>

                          <p className="truncate text-xs text-slate-500">
                            {user.email}
                          </p>
                        </div>
                      </div>

                      <Link
                        href="/profile"
                        onClick={() => setMenuOpen(false)}
                        className="flex h-11 items-center gap-3 rounded-lg border border-[#E8E1D5] px-4 font-semibold text-[#172554] transition hover:bg-[#172554] hover:text-white"
                      >
                        Profile
                      </Link>

                      <button
                        onClick={handleLogout}
                        className="flex h-11 w-full items-center justify-center rounded-lg bg-[#172554] font-semibold text-white transition hover:bg-[#243B73]"
                      >
                        Logout
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-3">
                      <Link
                        href="/signin"
                        onClick={() => setMenuOpen(false)}
                        className="flex h-11 w-full items-center justify-center rounded-lg border border-[#172554]/30 font-semibold text-[#172554] transition hover:bg-[#172554] hover:text-white"
                      >
                        Sign In
                      </Link>

                      <Link
                        href="/signup"
                        onClick={() => setMenuOpen(false)}
                        className="flex h-11 w-full items-center justify-center rounded-lg bg-[#172554] font-semibold text-white transition hover:bg-[#243B73]"
                      >
                        Sign Up
                      </Link>
                    </div>
                  )}
                </div>
              )}

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
