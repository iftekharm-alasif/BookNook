
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function BorrowButton({
  bookId,
  availableCopies,
}: {
  bookId: string;
  availableCopies: number;
}) {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [isBorrowed, setIsBorrowed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [borrowing, setBorrowing] = useState(false);

  const email = session?.user?.email?.trim().toLowerCase();

  useEffect(() => {
    if (isPending) return;

if (!email) {
  return;
}

    let cancelled = false;

    const checkBorrow = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `http://localhost:8000/my-borrows?email=${encodeURIComponent(email)}`
        );

        if (!res.ok) {
          throw new Error("Failed to check borrowed books");
        }

        const data = await res.json();

        const alreadyBorrowed = data.some(
          (book: { bookId: string; status: string }) =>
            String(book.bookId) === String(bookId) &&
            book.status?.toLowerCase() === "borrowed"
        );

        if (!cancelled) {
          setIsBorrowed(alreadyBorrowed);
        }
      } catch (error) {
        console.log("Borrow Check Error:", error);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    checkBorrow();

    return () => {
      cancelled = true;
    };
  }, [bookId, email, isPending]);

  const handleBorrow = async () => {
    if (!email) {
      alert("Please login first!");
      return;
    }

    try {
      setBorrowing(true);

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

      if (res.ok && data.message === "Book Borrowed Successfully!") {
        setIsBorrowed(true);
        router.refresh();
      }
    } catch (error) {
      console.log("Borrow Error:", error);
      alert("Something went wrong!");
    } finally {
      setBorrowing(false);
    }
  };

  return (
    <button
      onClick={handleBorrow}
      disabled={
        isPending ||
        loading ||
        borrowing ||
        !email ||
        isBorrowed ||
        availableCopies <= 0
      }
      className="flex-1 rounded-xl bg-[#172554] px-6 py-3.5 text-center text-sm font-semibold text-white transition hover:bg-[#243B73] disabled:cursor-not-allowed disabled:bg-slate-400"
    >
      {isPending || loading
        ? "Checking..."
        : !email
          ? "Please Login"
          : borrowing
            ? "Borrowing..."
            : isBorrowed
              ? "Already Borrowed"
              : availableCopies > 0
                ? "Borrow This Book"
                : "Currently Unavailable"}
    </button>
  );
}
