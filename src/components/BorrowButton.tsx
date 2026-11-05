
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function BorrowButton({
  bookId,
  availableCopies,
}: {
  bookId: string;
  availableCopies: number;
}) {
  const router = useRouter();

  const [isBorrowed, setIsBorrowed] = useState(false);
  const [loading, setLoading] = useState(true);

  const email = "iftekharasif71@gmail.com";

  useEffect(() => {
    fetch(`http://localhost:8000/my-borrows?email=${email}`)
      .then((res) => res.json())
      .then((data) => {
        const alreadyBorrowed = data.some(
          (book: { bookId: string; status: string }) =>
            book.bookId === bookId && book.status === "Borrowed"
        );

        setIsBorrowed(alreadyBorrowed);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [bookId]);

  const handleBorrow = async () => {
    const res = await fetch(
      `http://localhost:8000/borrow/${bookId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      }
    );

    const data = await res.json();

    alert(data.message);

    if (data.message === "Book Borrowed Successfully!") {
      setIsBorrowed(true);
      router.refresh();
    }
  };

  return (
    <button
      onClick={handleBorrow}
      disabled={loading || isBorrowed || availableCopies <= 0}
      className="flex-1 rounded-xl bg-[#172554] px-6 py-3.5 text-center text-sm font-semibold text-white transition hover:bg-[#243B73] disabled:cursor-not-allowed disabled:bg-slate-400"
    >
      {loading
        ? "Checking..."
        : isBorrowed
        ? "Already Borrowed"
        : availableCopies > 0
        ? "Borrow This Book"
        : "Currently Unavailable"}
    </button>
  );
}
