
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type BorrowedBook = {
  _id: string;
  title: string;
  author: string;
  category: string;
  image: string;
  borrowDate: string;
  returnDate: string;
  status: "Borrowed" | "Returned";
};

const demoBooks: BorrowedBook[] = [
  {
    _id: "1",
    title: "All Systems Red",
    author: "Martha Wells",
    category: "Science Fiction",
    image: "https://covers.openlibrary.org/b/isbn/9780765397539-L.jpg",
    borrowDate: "2026-11-01",
    returnDate: "2026-11-15",
    status: "Borrowed",
  },
  {
    _id: "2",
    title: "Atomic Habits",
    author: "James Clear",
    category: "Self Help",
    image: "https://covers.openlibrary.org/b/isbn/9780735211292-L.jpg",
    borrowDate: "2026-10-25",
    returnDate: "2026-11-08",
    status: "Borrowed",
  },
  {
    _id: "3",
    title: "The Psychology of Money",
    author: "Morgan Housel",
    category: "Finance",
    image: "https://covers.openlibrary.org/b/isbn/9780857197689-L.jpg",
    borrowDate: "2026-10-10",
    returnDate: "2026-10-24",
    status: "Returned",
  },
];

const MyBorrowsPage = () => {
  const [borrowedBooks, setBorrowedBooks] = useState<BorrowedBook[]>([]);
  const [loading, setLoading] = useState(true);

  // Load saved borrow data from localStorage
  useEffect(() => {
    try {
      const savedBooks = localStorage.getItem("myBorrowedBooks");

      if (savedBooks) {
        setBorrowedBooks(JSON.parse(savedBooks));
      } else {
        setBorrowedBooks(demoBooks);
        localStorage.setItem("myBorrowedBooks", JSON.stringify(demoBooks));
      }
    } catch (error) {
      console.error("Failed to load borrowed books:", error);
      setBorrowedBooks(demoBooks);
    } finally {
      setLoading(false);
    }
  }, []);

  // Return Book
  const handleReturnBook = (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to return this book?"
    );

    if (!confirmed) return;

    const updatedBooks = borrowedBooks.map((book) =>
      book._id === id ? { ...book, status: "Returned" as const } : book
    );

    setBorrowedBooks(updatedBooks);

    // Save updated status so it remains after page refresh
    localStorage.setItem("myBorrowedBooks", JSON.stringify(updatedBooks));
  };

  const activeBorrows = borrowedBooks.filter(
    (book) => book.status === "Borrowed"
  );

  const returnedBooks = borrowedBooks.filter(
    (book) => book.status === "Returned"
  );

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  // Reusable book card
  const renderBookCard = (book: BorrowedBook) => (
    <div
      key={book._id}
      className="flex flex-col gap-5 rounded-2xl border border-[#E8E1D5] bg-white p-4 shadow-sm transition hover:shadow-md sm:flex-row sm:p-5"
    >
      {/* Book Image */}
      <div className="relative h-52 w-full shrink-0 overflow-hidden rounded-xl bg-[#F5EFE3] sm:h-52 sm:w-36">
        <Image
          src={book.image}
          alt={book.title}
          fill
          sizes="(max-width: 640px) 100vw, 144px"
          className="object-contain p-2"
        />
      </div>

      {/* Book Information */}
      <div className="flex flex-1 flex-col">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="rounded-full bg-[#F5EFE3] px-3 py-1 text-xs font-semibold text-[#172554]">
            {book.category}
          </span>

          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              book.status === "Borrowed"
                ? "bg-amber-100 text-amber-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {book.status}
          </span>
        </div>

        <h3 className="mt-3 text-lg font-bold text-[#172554]">
          {book.title}
        </h3>

        <p className="mt-1 text-sm text-slate-500">By {book.author}</p>

        {/* Dates */}
        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-lg bg-[#FAF7F0] p-3">
            <p className="text-xs text-slate-500">Borrowed Date</p>
            <p className="mt-1 text-sm font-semibold text-[#172554]">
              {formatDate(book.borrowDate)}
            </p>
          </div>

          <div className="rounded-lg bg-[#FAF7F0] p-3">
            <p className="text-xs text-slate-500">Return Date</p>
            <p className="mt-1 text-sm font-semibold text-[#172554]">
              {formatDate(book.returnDate)}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-5">
          <Link
            href={`/books-details/${book._id}`}
            className="text-sm font-semibold text-[#172554] underline decoration-[#C5A46D] underline-offset-4 transition hover:text-[#C5A46D]"
          >
            View Details →
          </Link>

          {book.status === "Borrowed" ? (
            <button
              type="button"
              onClick={() => handleReturnBook(book._id)}
              className="rounded-lg bg-[#172554] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#243B73]"
            >
              Return Book
            </button>
          ) : (
            <span className="rounded-lg bg-green-50 px-4 py-2.5 text-sm font-semibold text-green-700">
              ✓ Returned
            </span>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <main className="min-h-screen bg-[#FAF7F0] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-10">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#C5A46D]">
            Your Reading Activity
          </p>

          <h1 className="text-3xl font-bold text-[#172554] sm:text-4xl">
            My Borrows
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
            Manage your borrowed books and keep track of your return history.
          </p>
        </div>

        {/* Statistics */}
        <div className="mb-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-[#E8E1D5] bg-white p-6">
            <p className="text-sm text-slate-500">Total Borrowed</p>
            <h2 className="mt-2 text-3xl font-bold text-[#172554]">
              {borrowedBooks.length}
            </h2>
          </div>

          <div className="rounded-2xl border border-[#E8E1D5] bg-white p-6">
            <p className="text-sm text-slate-500">Currently Borrowed</p>
            <h2 className="mt-2 text-3xl font-bold text-[#C5A46D]">
              {activeBorrows.length}
            </h2>
          </div>

          <div className="rounded-2xl border border-[#E8E1D5] bg-white p-6">
            <p className="text-sm text-slate-500">Returned Books</p>
            <h2 className="mt-2 text-3xl font-bold text-green-700">
              {returnedBooks.length}
            </h2>
          </div>
        </div>

        {loading ? (
          <div className="rounded-2xl border border-[#E8E1D5] bg-white py-16 text-center">
            <p className="text-slate-500">Loading borrowed books...</p>
          </div>
        ) : (
          <>
            {/* Currently Borrowed Section */}
            <section className="mb-14">
              <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-2xl font-bold text-[#172554]">
                    Currently Borrowed
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Books you currently have
                  </p>
                </div>

                <span className="rounded-full bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-700">
                  {activeBorrows.length} Books
                </span>
              </div>

              {activeBorrows.length === 0 ? (
                <div className="rounded-2xl border border-[#E8E1D5] bg-white px-5 py-12 text-center">
                  <p className="text-lg font-semibold text-[#172554]">
                    No Currently Borrowed Books
                  </p>
                  <p className="mt-2 text-sm text-slate-500">
                    You have returned all your borrowed books.
                  </p>
                  <Link
                    href="/all-books"
                    className="mt-5 inline-block rounded-xl bg-[#172554] px-6 py-3 text-sm font-semibold text-white hover:bg-[#243B73]"
                  >
                    Browse Books →
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {activeBorrows.map(renderBookCard)}
                </div>
              )}
            </section>

            {/* Returned Books Section */}
            <section>
              <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-2xl font-bold text-[#172554]">
                    Returned Books
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Your previously returned books
                  </p>
                </div>

                <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
                  {returnedBooks.length} Books
                </span>
              </div>

              {returnedBooks.length === 0 ? (
                <div className="rounded-2xl border border-[#E8E1D5] bg-white px-5 py-12 text-center">
                  <p className="text-lg font-semibold text-[#172554]">
                    No Returned Books Yet
                  </p>
                  <p className="mt-2 text-sm text-slate-500">
                    Your returned books will appear here.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {returnedBooks.map(renderBookCard)}
                </div>
              )}
            </section>
          </>
        )}

        {/* Browse Books */}
        <div className="mt-12 text-center">
          <Link
            href="/all-books"
            className="inline-block rounded-xl bg-[#172554] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#243B73]"
          >
            Browse More Books →
          </Link>
        </div>
      </div>
    </main>
  );
};

export default MyBorrowsPage;
