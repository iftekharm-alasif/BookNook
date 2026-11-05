export const instant = false;

import { notFound } from "next/navigation";
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

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}
export default async function BookDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let book: Book;

  try {
    const res = await fetch(
      `http://localhost:8000/books/${id}`,
      {
        cache: "no-store",
      }
    );

    if (res.status === 404 || res.status === 400) {
      notFound();
    }

    if (!res.ok) {
      throw new Error("Failed to fetch book details");
    }

    book = await res.json();
  } catch (error) {
    console.error("Book details error:", error);
    throw error;
  }

  const availableCopies = book.availableCopies ?? 0;

  return (
    <main className="min-h-screen bg-[#FAF7F0] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">

        {/* Details Card */}
        <div className="grid overflow-hidden rounded-3xl border border-[#E8E1D5] bg-white shadow-sm md:grid-cols-2">

          {/* Book Image */}
          <div className="relative flex min-h-[350px] items-center justify-center bg-[#F5EFE3] p-8 sm:min-h-[500px]">
            {book.image ? (
              <div className="relative h-[350px] w-full sm:h-[420px]">
                <Image
                  src={book.image}
                  alt={book.title}
                  fill
                  unoptimized
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain"
                />
              </div>
            ) : (
              <span className="text-8xl">📚</span>
            )}
          </div>

          {/* Book Information */}
          <div className="flex flex-col justify-center p-6 sm:p-10">

            <span className="mb-5 w-fit rounded-full bg-[#F5EFE3] px-4 py-2 text-xs font-semibold text-[#172554]">
              {book.category}
            </span>

            <h1 className="text-3xl font-bold leading-tight text-[#172554] sm:text-4xl">
              {book.title}
            </h1>

            <p className="mt-4 text-base text-slate-500">
              Written by{" "}
              <span className="font-semibold text-slate-700">
                {book.author}
              </span>
            </p>

            {/* Description */}
            <div className="mt-8 border-t border-[#E8E1D5] pt-6">
              <h2 className="text-lg font-bold text-[#172554]">
                About This Book
              </h2>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                {book.description}
              </p>
            </div>

            {/* Copies Information */}
            <div className="mt-8 grid grid-cols-2 gap-4">

              <div className="rounded-xl bg-[#F5EFE3] p-4">
                <p className="text-sm text-slate-500">
                  Total Copies
                </p>

                <p className="mt-2 text-2xl font-bold text-[#172554]">
                  {book.totalCopies ?? 0}
                </p>
              </div>

              <div className="rounded-xl bg-[#F5EFE3] p-4">
                <p className="text-sm text-slate-500">
                  Available Copies
                </p>

                <p
                  className={`mt-2 text-2xl font-bold ${
                    availableCopies > 0
                      ? "text-green-700"
                      : "text-red-600"
                  }`}
                >
                  {availableCopies}
                </p>
              </div>

            </div>

            {/* Availability */}
            <div className="mt-6">
              {availableCopies > 0 ? (
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

            {/* Added By */}
            <div className="mt-8 border-t border-[#E8E1D5] pt-5">
              <p className="text-xs text-slate-400">
                Added By
              </p>

              <p className="mt-1 text-sm font-semibold text-[#172554]">
                {book.username}
              </p>

              <p className="mt-1 text-sm text-slate-500">
                {book.email}
              </p>
            </div>

            {/* Action Buttons */}
<div className="mt-8 flex flex-col gap-3 sm:flex-row">

  <Link
    href={
      availableCopies > 0
        ? "/my-borrows"
        : "#"
    }
    aria-disabled={availableCopies <= 0}
    tabIndex={availableCopies <= 0 ? -1 : 0}
    className={`flex-1 rounded-xl px-6 py-3.5 text-center text-sm font-semibold text-white transition ${
      availableCopies > 0
        ? "bg-[#172554] hover:bg-[#243B73]"
        : "pointer-events-none cursor-not-allowed bg-slate-400"
    }`}
  >
    {availableCopies > 0
      ? "Borrow This Book"
      : "Currently Unavailable"}
  </Link>

  <Link
    href="/all-books"
    className="flex-1 rounded-xl border border-[#E8E1D5] px-6 py-3.5 text-center text-sm font-semibold text-[#172554] transition hover:bg-[#F5EFE3]"
  >
    ← Back to All Books
  </Link>

</div>
           

          </div>
        </div>
      </div>
    </main>
  );
}