"use client";

import { useRouter } from "next/navigation";

export default function BorrowButton({
  bookId,
  availableCopies,
}: {
  bookId: string;
  availableCopies: number;
}) {
  const router = useRouter();

  const handleBorrow = async () => {
    const res = await fetch(
      `http://localhost:8000/borrow/${bookId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: "iftekharasif71@gmail.com",
        }),
      }
    );

    const data = await res.json();

    alert(data.message);

    if (res.ok && data.message === "Book Borrowed Successfully!") {
      router.refresh();
    }
  };

  return (
    <button
      onClick={handleBorrow}
      disabled={availableCopies <= 0}
      className="flex-1 rounded-xl bg-[#172554] px-6 py-3.5 text-center text-sm font-semibold text-white transition hover:bg-[#243B73] disabled:cursor-not-allowed disabled:bg-slate-400"
    >
      {availableCopies > 0
        ? "Borrow This Book"
        : "Currently Unavailable"}
    </button>
  );
}