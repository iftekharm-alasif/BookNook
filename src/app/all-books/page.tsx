
"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface Book {
  _id: string;
  title: string;
  author: string;
  category: string;
  image: string;
  description: string;
  username: string;
  email: string;
  totalCopies?: number;
  availableCopies?: number;
}

export default function AllBooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await fetch("http://localhost:8000/allbooks", {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch books!");
        }

        const data: Book[] = await res.json();
        setBooks(data);
      } catch (err) {
        console.error("Error fetching books:", err);
        setError("Books load করা যায়নি। Backend server চালু আছে কিনা দেখুন।");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  // Get unique categories
  const categories = useMemo(() => {
    return [
      "All",
      ...Array.from(new Set(books.map((book) => book.category))),
    ];
  }, [books]);

  // Search and category filtering
  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      const searchTerm = search.toLowerCase();

      const matchesSearch =
        book.title.toLowerCase().includes(searchTerm) ||
        book.author.toLowerCase().includes(searchTerm);

      const matchesCategory =
        category === "All" || book.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [books, search, category]);

  return (
    <main className="min-h-screen bg-[#FAF7F0] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-10 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-[#C5A46D]">
            Explore Our Collection
          </p>

          <h1 className="text-3xl font-bold text-[#172554] sm:text-4xl lg:text-5xl">
            Discover All Books
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
            Explore our collection of books and discover your next favorite
            read.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-10 flex flex-col gap-4 rounded-2xl border border-[#E8E1D5] bg-white p-4 shadow-sm md:flex-row">

          {/* Search */}
          <div className="relative flex-1">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-slate-400">
              ⌕
            </span>

            <input
              type="text"
              placeholder="Search by book title or author..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-[#E8E1D5] bg-[#FAF7F0] py-3 pl-12 pr-4 text-sm text-slate-700 outline-none transition focus:border-[#C5A46D] focus:ring-2 focus:ring-[#C5A46D]/20"
            />
          </div>

          {/* Category Filter */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-xl border border-[#E8E1D5] bg-[#FAF7F0] px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-[#C5A46D] md:min-w-52"
          >
            {categories.map((item) => (
              <option key={item} value={item}>
                {item === "All" ? "All Categories" : item}
              </option>
            ))}
          </select>
        </div>

        {/* Book Count */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-[#172554]">
            All Books
          </h2>

          <p className="text-sm text-slate-500">
            Showing {filteredBooks.length} of {books.length} books
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="py-20 text-center">
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-[#E8E1D5] border-t-[#172554]" />
            <p className="mt-4 text-sm text-slate-500">
              Loading books...
            </p>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center text-red-600">
            {error}
          </div>
        )}

        {/* No Books */}
        {!loading && !error && filteredBooks.length === 0 && (
          <div className="rounded-2xl border border-[#E8E1D5] bg-white px-4 py-16 text-center">
            <p className="text-4xl">📚</p>
            <h3 className="mt-4 text-xl font-semibold text-[#172554]">
              No Books Found
            </h3>
            <p className="mt-2 text-sm text-slate-500">
              Try searching with another title, author, or category.
            </p>
          </div>
        )}

        {/* Books Grid */}
        {!loading && !error && filteredBooks.length > 0 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

            {filteredBooks.map((book) => (
              <div
                key={book._id}
                className="group overflow-hidden rounded-2xl border border-[#E8E1D5] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                {/* Book Image */}
                <div className="relative h-64 overflow-hidden bg-[#F5EFE3]">
                  {book.image ? (
                    <Image
                      src={book.image}
                      alt={book.title}
                      fill
                      unoptimized
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-contain p-5 transition duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-6xl">
                      📚
                    </div>
                  )}

                  <span className="absolute left-4 top-4 rounded-full bg-[#172554] px-3 py-1 text-xs font-medium text-white">
                    {book.category}
                  </span>
                </div>

                {/* Book Information */}
                <div className="p-5">

                  <h3 className="line-clamp-1 text-lg font-bold text-[#172554]">
                    {book.title}
                  </h3>

                  <p className="mt-2 text-sm text-slate-500">
                    By {book.author}
                  </p>

                  {/* Total and Available Copies */}
                  <div className="mt-5 grid grid-cols-2 gap-3">

                    <div className="rounded-xl bg-[#F5EFE3] p-3">
                      <p className="text-xs text-slate-500">
                        Total Copies
                      </p>

                      <p className="mt-1 text-xl font-bold text-[#172554]">
                        {book.totalCopies ?? 0}
                      </p>
                    </div>

                    <div className="rounded-xl bg-[#F5EFE3] p-3">
                      <p className="text-xs text-slate-500">
                        Available
                      </p>

                      <p
                        className={`mt-1 text-xl font-bold ${
                          (book.availableCopies ?? 0) > 0
                            ? "text-green-700"
                            : "text-red-600"
                        }`}
                      >
                        {book.availableCopies ?? 0}
                      </p>
                    </div>

                  </div>

                  {/* Description */}
                  <p className="mt-4 line-clamp-3 text-sm leading-6 text-slate-600">
                    {book.description}
                  </p>

                  {/* Availability Status */}
                  <div className="mt-5 border-t border-[#E8E1D5] pt-4">
                    {(book.availableCopies ?? 0) > 0 ? (
                      <span className="inline-flex items-center gap-2 text-sm font-semibold text-green-700">
                        <span className="h-2 w-2 rounded-full bg-green-600" />
                        Available for Borrow
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-2 text-sm font-semibold text-red-600">
                        <span className="h-2 w-2 rounded-full bg-red-600" />
                        Currently Unavailable
                      </span>
                    )}
                  </div>
                  {/* View Book Details Button */}
<div className="mt-5">
  <Link
    href={`/books-details/${book._id}`}
    className="block w-full rounded-xl bg-[#172554] px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-[#243B73]"
  >
    View Book Details →
  </Link>
</div>

                </div>
              </div>
            ))}

          </div>
        )}

      </div>
    </main>
  );
}
