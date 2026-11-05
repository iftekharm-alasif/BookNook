
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

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
  const { data: session, isPending } = authClient.useSession();

  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const email = session?.user?.email?.trim().toLowerCase();

  useEffect(() => {
    if (isPending || !email) return;

    const fetchMyBooks = async () => {
      setLoading(true);

      try {
        const res = await fetch("http://localhost:8000/allbooks", {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch books");
        }

        const data: Book[] = await res.json();

        const filteredBooks = data.filter(
          (book) => book.email?.trim().toLowerCase() === email
        );

        setBooks(filteredBooks);
      } catch (error) {
        console.error("My Books Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyBooks();
  }, [email, isPending]);

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this book?"
    );

    if (!confirmDelete) return;

    try {
      setDeletingId(id);

      const res = await fetch(`http://localhost:8000/books/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to delete book");
        return;
      }

      setBooks((previousBooks) =>
        previousBooks.filter((book) => book._id !== id)
      );

      alert("Book deleted successfully!");
    } catch (error) {
      console.error("Delete Error:", error);
      alert("Something went wrong!");
    } finally {
      setDeletingId(null);
    }
  };

  if (isPending || loading) {
    return (
      <main className="min-h-screen bg-[#FAF7F0] px-4 py-20 text-center text-slate-500">
        Loading your books...
      </main>
    );
  }

  if (!session?.user) {
    return (
      <main className="min-h-screen bg-[#FAF7F0] px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-[#172554]">
          Please Login First
        </h2>

        <Link href="/signin" className="mt-5 inline-block text-[#C5A46D]">
          Go to Login
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAF7F0] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
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

        <div className="mb-8 rounded-2xl border border-[#E8E1D5] bg-white p-5">
          <p className="text-sm text-slate-500">Total Books Added</p>

          <p className="mt-2 text-3xl font-bold text-[#172554]">
            {books.length}
          </p>
        </div>

        {books.length === 0 ? (
          <div className="rounded-3xl border border-[#E8E1D5] bg-white px-6 py-20 text-center">
            <div className="mb-5 text-6xl">📚</div>

            <h2 className="text-2xl font-bold text-[#172554]">
              No Books Added Yet
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-slate-500">
              You haven`t added any books yet. Start building your collection
              by adding your first book.
            </p>

            <Link
              href="/add-books"
              className="mt-7 inline-block rounded-xl bg-[#172554] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#243B73]"
            >
              Add Your First Book
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {books.map((book) => (
              <div
                key={book._id}
                className="overflow-hidden rounded-2xl border border-[#E8E1D5] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
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
                      <p className="text-xs text-slate-500">Total Copies</p>
                      <p className="mt-1 font-bold text-[#172554]">
                        {book.totalCopies ?? 0}
                      </p>
                    </div>

                    <div className="rounded-lg bg-[#F5EFE3] p-3">
                      <p className="text-xs text-slate-500">Available</p>
                      <p className="mt-1 font-bold text-green-700">
                        {book.availableCopies ?? 0}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <Link
                      href={`/books-details/${book._id}`}
                      className="rounded-xl bg-[#172554] px-3 py-3 text-center text-sm font-semibold text-white transition hover:bg-[#243B73]"
                    >
                      View Details
                    </Link>

                    <Link
                      href={`/edit-books/${book._id}`}
                      className="rounded-xl border border-[#C5A46D] px-3 py-3 text-center text-sm font-semibold text-[#172554] transition hover:bg-[#F5EFE3]"
                    >
                      ✏️ Edit Book
                    </Link>

                    <button
                      onClick={() => handleDelete(book._id)}
                      disabled={deletingId === book._id}
                      className="col-span-2 rounded-xl border border-red-200 px-3 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {deletingId === book._id
                        ? "Deleting..."
                        : "🗑️ Delete Book"}
                    </button>
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
