
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";

type BorrowedBook = {
  _id: string;
  bookId: string;
  title: string;
  author: string;
  category: string;
  image: string;
  borrowDate: string;
  returnDate: string;
  status: "Borrowed" | "Returned";
};

export default function MyBorrowsPage() {
  const { data: session, isPending } = authClient.useSession();

  const [books, setBooks] = useState<BorrowedBook[]>([]);
  const [loading, setLoading] = useState(false);
  const [returningId, setReturningId] = useState("");

  const email = session?.user?.email;

  useEffect(() => {
    if (isPending || !email) return;

    const loadBooks = async () => {
      setLoading(true);

      try {
        const res = await fetch(
          `http://localhost:8000/my-borrows?email=${encodeURIComponent(email)}`
        );

        if (!res.ok) {
          throw new Error("Failed to load borrowed books");
        }

        const data = await res.json();
        setBooks(Array.isArray(data) ? data : []);
      } catch (error) {
        console.log("Load Books Error:", error);
      } finally {
        setLoading(false);
      }
    };

    loadBooks();
  }, [email, isPending]);

  const handleReturn = async (id: string) => {
    const confirmReturn = window.confirm("Return this book?");

    if (!confirmReturn) return;

    try {
      setReturningId(id);

      const res = await fetch(
        `http://localhost:8000/return/${id}`,
        {
          method: "PATCH",
        }
      );

      const data = await res.json();

      alert(data.message || "Return request completed.");

      if (res.ok) {
        setBooks((previousBooks) =>
          previousBooks.map((book) =>
            book._id === id
              ? { ...book, status: "Returned" }
              : book
          )
        );
      }
    } catch (error) {
      console.log("Return Error:", error);
      alert("Something went wrong!");
    } finally {
      setReturningId("");
    }
  };

  const activeBooks = books.filter(
    (book) => book.status === "Borrowed"
  );

  const returnedBooks = books.filter(
    (book) => book.status === "Returned"
  );

  const formatDate = (date: string) => {
    if (!date) return "Not available";

    return new Date(date).toLocaleDateString("en-GB");
  };

  const bookCard = (book: BorrowedBook) => (
    <div
      key={book._id}
      className="flex flex-col gap-5 rounded-2xl border border-[#E8E1D5] bg-white p-4 shadow-sm sm:flex-row"
    >
      <div className="h-52 w-full shrink-0 overflow-hidden rounded-xl bg-[#F5EFE3] sm:w-36">
        <img
          src={book.image}
          alt={book.title}
          className="h-full w-full object-contain p-2"
        />
      </div>

      <div className="flex flex-1 flex-col">
        <div className="flex justify-between gap-2">
          <span className="rounded-full bg-[#F5EFE3] px-3 py-1 text-xs text-[#172554]">
            {book.category}
          </span>

          <span
            className={`rounded-full px-3 py-1 text-xs ${
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

        <p className="mt-1 text-sm text-slate-500">
          By {book.author}
        </p>

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

        <div className="mt-auto flex items-center justify-between gap-3 pt-5">
          <Link
            href={`/books-details/${book.bookId}`}
            className="text-sm font-semibold text-[#172554] underline decoration-[#C5A46D] underline-offset-4"
          >
            View Details →
          </Link>

          {book.status === "Borrowed" ? (
            <button
              onClick={() => handleReturn(book._id)}
              disabled={returningId === book._id}
              className="rounded-lg bg-[#172554] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#243B73] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {returningId === book._id ? "Returning..." : "Return Book"}
            </button>
          ) : (
            <span className="rounded-lg bg-green-50 px-4 py-2.5 text-sm text-green-700">
              ✓ Returned
            </span>
          )}
        </div>
      </div>
    </div>
  );

  if (isPending || loading) {
    return (
      <div className="min-h-screen bg-[#FAF7F0] py-20 text-center">
        Loading borrowed books...
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div className="min-h-screen bg-[#FAF7F0] px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-[#172554]">
          Please Login First
        </h2>

        <Link
          href="/signin"
          className="mt-5 inline-block rounded-xl bg-[#172554] px-6 py-3 text-white"
        >
          Login
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAF7F0] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#C5A46D]">
            Your Reading Activity
          </p>

          <h1 className="text-3xl font-bold text-[#172554] sm:text-4xl">
            My Borrows
          </h1>

          <p className="mt-3 text-sm text-slate-600">
            Manage your borrowed books and return history.
          </p>
        </div>

        <div className="mb-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-[#E8E1D5] bg-white p-6">
            <p className="text-sm text-slate-500">Total Borrowed</p>
            <h2 className="mt-2 text-3xl font-bold text-[#172554]">
              {books.length}
            </h2>
          </div>

          <div className="rounded-2xl border border-[#E8E1D5] bg-white p-6">
            <p className="text-sm text-slate-500">Currently Borrowed</p>
            <h2 className="mt-2 text-3xl font-bold text-[#C5A46D]">
              {activeBooks.length}
            </h2>
          </div>

          <div className="rounded-2xl border border-[#E8E1D5] bg-white p-6">
            <p className="text-sm text-slate-500">Returned Books</p>
            <h2 className="mt-2 text-3xl font-bold text-green-700">
              {returnedBooks.length}
            </h2>
          </div>
        </div>

        <section className="mb-14">
          <h2 className="mb-6 text-2xl font-bold text-[#172554]">
            Currently Borrowed ({activeBooks.length})
          </h2>

          {activeBooks.length === 0 ? (
            <p className="rounded-2xl bg-white p-10 text-center text-slate-500">
              No Currently Borrowed Books
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {activeBooks.map(bookCard)}
            </div>
          )}
        </section>

        <section>
          <h2 className="mb-6 text-2xl font-bold text-[#172554]">
            Returned Books ({returnedBooks.length})
          </h2>

          {returnedBooks.length === 0 ? (
            <p className="rounded-2xl bg-white p-10 text-center text-slate-500">
              No Returned Books Yet
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {returnedBooks.map(bookCard)}
            </div>
          )}
        </section>

        <div className="mt-12 text-center">
          <Link
            href="/all-books"
            className="inline-block rounded-xl bg-[#172554] px-7 py-3.5 text-sm font-semibold text-white hover:bg-[#243B73]"
          >
            Browse More Books →
          </Link>
        </div>
      </div>
    </main>
  );
}
