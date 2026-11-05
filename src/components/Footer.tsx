import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t border-[#E8E1D5] bg-[#172554] text-white">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Logo & Description */}
          <div className="space-y-4">
            <Link href="/" className="inline-flex items-center gap-2">
              <Image
                src="/assest/Gemini_Generated_Image_695guc695guc695g-removebg-preview.png"
                alt="BookNook Logo"
                width={55}
                height={55}
               className="h-12 w-12 object-contain brightness-0 invert"
              />
              <span className="text-2xl font-bold">
                BookNook<span className="text-[#C5A46D]">.</span>
              </span>
            </Link>

            <p className="max-w-xs text-sm leading-7 text-slate-300">
              Discover your next favorite book with BookNook. Explore different
              genres, find inspiring stories, and make reading a part of your
              everyday life.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-5 text-lg font-semibold text-[#C5A46D]">
              Quick Links
            </h3>

            <ul className="space-y-3 text-sm text-slate-300">
              <li>
                <Link href="/" className="transition hover:text-[#C5A46D]">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/all-books"
                  className="transition hover:text-[#C5A46D]"
                >
                  All Books
                </Link>
              </li>
              <li>
                <Link
                  href="/add-book"
                  className="transition hover:text-[#C5A46D]"
                >
                  Add Book
                </Link>
              </li>
              <li>
                <Link
                  href="/my-books"
                  className="transition hover:text-[#C5A46D]"
                >
                  My Books
                </Link>
              </li>
              <li>
                <Link
                  href="/my-borrows"
                  className="transition hover:text-[#C5A46D]"
                >
                  My Borrows
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-5 text-lg font-semibold text-[#C5A46D]">
              Contact Us
            </h3>

            <ul className="space-y-4 text-sm text-slate-300">
              <li>
                <span className="mb-1 block font-medium text-white">Email</span>
                <a
                  href="mailto:hello@booknook.com"
                  className="transition hover:text-[#C5A46D]"
                >
                  hello@booknook.com
                </a>
              </li>

              <li>
                <span className="mb-1 block font-medium text-white">Phone</span>
                <a
                  href="tel:+8801234567890"
                  className="transition hover:text-[#C5A46D]"
                >
                  +880 1234-567890
                </a>
              </li>

              <li>
                <span className="mb-1 block font-medium text-white">
                  Location
                </span>
                Bangladesh
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="mb-5 text-lg font-semibold text-[#C5A46D]">
              Follow Us
            </h3>

            <p className="mb-5 text-sm leading-6 text-slate-300">
              Stay connected with us and explore more reading inspiration.
            </p>

            <div className="flex gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-500 transition hover:border-[#C5A46D] hover:bg-[#C5A46D] hover:text-[#172554]"
              >
                f
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-500 transition hover:border-[#C5A46D] hover:bg-[#C5A46D] hover:text-[#172554]"
              >
                ig
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-500 transition hover:border-[#C5A46D] hover:bg-[#C5A46D] hover:text-[#172554]"
              >
                in
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <p className="text-sm text-slate-400">
          © 2026 BookNook. All rights reserved.
          <span className="mx-2 text-[#C5A46D]">|</span>
          Made with love for book lovers.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
