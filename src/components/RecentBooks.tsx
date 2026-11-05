
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Book = {
  _id: string;
  title: string;
  author: string;
  category: string;
  image: string;
  description: string;
};

export default function RecentBooks() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecentBooks = async () => {
      try {
        const res = await fetch("http://localhost:8000/recentbooks");
         cache: "no-store"
        if (!res.ok) {
          throw new Error("Failed to fetch recent books");
        }

        const data = await res.json();
        setBooks(data);
      } catch (error) {
        console.error("Recent books error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentBooks();
  }, []);

  return (
    <section className="bg-[#FAF7F0] px-4 py-16 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">

        {/* Section Heading */}
        <div className="mb-10 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-[#C5A46D]">
            Fresh From Our Library
          </p>

          <h2 className="text-3xl font-bold text-[#172554] sm:text-4xl">
            Recently Added Books
          </h2>

          <p className="mt-3 text-sm text-slate-500 sm:text-base">
            Discover the latest additions to our book collection.
          </p>

          <div className="mx-auto mt-5 h-1 w-16 rounded-full bg-[#C5A46D]" />
        </div>

        {/* Loading */}
        {loading ? (
          <p className="py-12 text-center text-slate-500">
            Loading recent books...
          </p>
        ) : books.length === 0 ? (
          <p className="py-12 text-center text-slate-500">
            No books have been added yet.
          </p>
        ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {books.map((book) => (
              <div
                key={book._id}
                className="group overflow-hidden rounded-2xl border border-[#E8E1D5] bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                {/* Book Cover */}
                <div className="flex h-52 items-center justify-center overflow-hidden bg-[#F1EDE4] p-4">
                  <img
                    src={book.image || "/placeholder-book.png"}
                    alt={book.title}
                    className="h-full w-full object-contain transition duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Book Information */}
                <div className="p-4">
                  <span className="inline-block rounded-full bg-[#F5EFE3] px-2.5 py-1 text-xs font-semibold text-[#9A7847]">
                    {book.category}
                  </span>

                  <h3 className="mt-3 line-clamp-2 min-h-12 text-base font-bold text-[#172554]">
                    {book.title}
                  </h3>

                  <p className="mt-2 line-clamp-1 text-sm text-slate-500">
                    By {book.author}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* View More Button */}
        <div className="mt-10 text-center">
          <Link
            href="/all-books"
            className="inline-flex items-center gap-2 rounded-xl bg-[#172554] px-8 py-3.5 text-sm font-semibold text-white transition hover:bg-[#243B73]"
          >
            View More Books
            <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
