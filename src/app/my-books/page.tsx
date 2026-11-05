"use client";

import { useEffect, useState } from "react";
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

export default function MyBooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  // আপাতত নিজের email এখানে ব্যবহার করো
  const myEmail = "admin@booknook.com";

  useEffect(() => {
    const fetchMyBooks = async () => {
      try {
        const res = await fetch("http://localhost:8000/allbooks", {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch books");
        }

        const data: Book[] = await res.json();

        const filteredBooks = data.filter(
          (book) =>
            book.email?.toLowerCase() === myEmail.toLowerCase()
        );

        setBooks(filteredBooks);
      } catch (error) {
        console.error("My Books Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyBooks();
  }, []);

  return (
    <main className="min-h-screen bg-[#FAF7F0] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-[#C5A46D]">
              Your Collection
            </p>

            <h1 className="mt-2 text-3xl font-bold text-[#172554] sm:text-4xl">
              My Books
            </h1>

            <p className="mt-3 text-sm text-slate-500">
              Manage and explore the books you have added.
            </p>
          </div>

          <Link
            href="/add-books"
            className="rounded-xl bg-[#172554] px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-[#243B73]"
          >
            + Add New Book
          </Link>
        </div>

        {/* Book Count */}
        <div className="mb-8 rounded-2xl border border-[#E8E1D5] bg-white p-5">
          <p className="text-sm text-slate-500">
            Total Books Added
          </p>

          <p className="mt-2 text-3xl font-bold text-[#172554]">
            {books.length}
          </p>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="py-20 text-center text-slate-500">
            Loading your books...
          </div>
        ) : books.length === 0 ? (
          /* Empty State */
          <div className="rounded-3xl border border-[#E8E1D5] bg-white px-6 py-20 text-center">
            <div className="mb-5 text-6xl">📚</div>

            <h2 className="text-2xl font-bold text-[#172554]">
              No Books Added Yet
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-slate-500">
              You haven't added any books yet. Start building your
              collection by adding your first book.
            </p>

            <Link
              href="/add-books"
              className="mt-7 inline-block rounded-xl bg-[#172554] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#243B73]"
            >
              Add Your First Book
            </Link>
          </div>
        ) : (
          /* Books Grid */
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {books.map((book) => (
              <div
                key={book._id}
                className="overflow-hidden rounded-2xl border border-[#E8E1D5] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                {/* Image */}
                <div className="relative flex h-64 items-center justify-center bg-[#F5EFE3] p-5">
                  {book.image ? (
                    <Image
                      src={book.image}
                      alt={book.title}
                      fill
                      unoptimized
                      className="object-contain p-5"
                      sizes="(max-width: 768px) 100vw, 25vw"
                    />
                  ) : (
                    <span className="text-6xl">📚</span>
                  )}
                </div>

                {/* Information */}
                <div className="p-5">
                  <span className="rounded-full bg-[#F5EFE3] px-3 py-1 text-xs font-semibold text-[#172554]">
                    {book.category}
                  </span>

                  <h2 className="mt-4 line-clamp-1 text-lg font-bold text-[#172554]">
                    {book.title}
                  </h2>

                  <p className="mt-2 text-sm text-slate-500">
                    By {book.author}
                  </p>

                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <div className="rounded-lg bg-[#F5EFE3] p-3">
                      <p className="text-xs text-slate-500">
                        Total Copies
                      </p>
                      <p className="mt-1 font-bold text-[#172554]">
                        {book.totalCopies ?? 0}
                      </p>
                    </div>

                    <div className="rounded-lg bg-[#F5EFE3] p-3">
                      <p className="text-xs text-slate-500">
                        Available
                      </p>
                      <p className="mt-1 font-bold text-green-700">
                        {book.availableCopies ?? 0}
                      </p>
                    </div>
                  </div>

                  <Link
                    href={`/books-details/${book._id}`}
                    className="mt-5 block rounded-xl bg-[#172554] px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-[#243B73]"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}