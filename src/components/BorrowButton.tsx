
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

  useEffect(() => {
    const checkBorrowStatus = async () => {
      if (!session?.user) return;

      try {
        const { data, error } = await authClient.token();

        if (error || !data?.token) {
          console.error("Token error:", error);
          return;
        }

        const res = await fetch("https://book-nook-server-rosy.vercel.app/my-borrows", {
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch borrow status");
        }

        const borrows = await res.json();

        const alreadyBorrowed = borrows.some(
          (borrow: { bookId: string; status: string }) =>
            borrow.bookId === bookId && borrow.status === "Borrowed"
        );

        setIsBorrowed(alreadyBorrowed);
      } catch (error) {
        console.error("Borrow Status Error:", error);
      }
    };

    checkBorrowStatus();
  }, [session, bookId]);

  const handleBorrow = async () => {
    if (!session?.user) {
      alert("Please login first!");
      return;
    }

    if (availableCopies <= 0) {
      alert("Book is not available!");
      return;
    }

    try {
      setLoading(true);

      const { data, error } = await authClient.token();

      if (error || !data?.token) {
        throw new Error("Failed to get authentication token");
      }

      const borrowDate = new Date();
      const returnDate = new Date();
      returnDate.setDate(returnDate.getDate() + 7);

      const res = await fetch(
        `https://book-nook-server-rosy.vercel.app/borrow/${bookId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${data.token}`,
          },
          body: JSON.stringify({
            borrowDate: borrowDate.toISOString(),
            returnDate: returnDate.toISOString(),
          }),
        }
      );

      const result = await res.json();

      console.log("Borrow API Status:", res.status);
      console.log("Borrow API Response:", result);

      if (!res.ok) {
        throw new Error(result.message || "Failed to borrow book");
      }

      alert(result.message || "Book Borrowed Successfully!");

      setIsBorrowed(true);
      router.refresh();
    } catch (error) {
      console.error("Borrow Error:", error);

      alert(
        error instanceof Error
          ? error.message
          : "Something went wrong!"
      );
    } finally {
      setLoading(false);
    }
  };

  if (isPending) {
    return <button disabled>Loading...</button>;
  }

  if (isBorrowed) {
    return (
      <button
        disabled
        className="rounded-lg bg-gray-400 px-5 py-2 text-white"
      >
        Already Borrowed
      </button>
    );
  }

  return (
    <button
      onClick={handleBorrow}
      disabled={loading || availableCopies <= 0}
      className="rounded-lg bg-blue-600 px-5 py-2 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {loading
        ? "Borrowing..."
        : availableCopies <= 0
          ? "Not Available"
          : "Borrow Book"}
    </button>
  );
}
