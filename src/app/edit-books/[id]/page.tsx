
"use client";

import { useEffect, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

interface EditBookPageProps {
  params: Promise<{ id: string }>;
}

export default function EditBookPage({ params }: EditBookPageProps) {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [id, setId] = useState("");
  const [bookLoading, setBookLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    title: "",
    author: "",
    category: "",
    totalCopies: "1",
    availableCopies: "1",
    image: "",
    description: "",
  });

  const email = session?.user?.email;

  useEffect(() => {
    let active = true;

    params.then((resolvedParams) => {
      if (active) {
        setId(resolvedParams.id);
      }
    });

    return () => {
      active = false;
    };
  }, [params]);

  useEffect(() => {
    if (isPending || !email || !id) return;

    let active = true;

    const fetchBook = async () => {
      try {
        const res = await fetch(
          `https://book-nook-server-rosy.vercel.app/books/${id}`
        );

        if (!res.ok) {
          throw new Error("Book not found");
        }

        const book = await res.json();

        if (!active) return;

        if (
          book.email?.trim().toLowerCase() !==
          email.trim().toLowerCase()
        ) {
          alert("You cannot edit this book!");
          router.push("/my-books");
          return;
        }

        setForm({
          title: book.title || "",
          author: book.author || "",
          category: book.category || "",
          totalCopies: String(book.totalCopies ?? 1),
          availableCopies: String(book.availableCopies ?? 1),
          image: book.image || "",
          description: book.description || "",
        });
      } catch (error) {
        console.error(error);

        if (active) {
          setError("Failed to load book information.");
        }
      } finally {
        if (active) {
          setBookLoading(false);
        }
      }
    };

    fetchBook();

    return () => {
      active = false;
    };
  }, [id, email, isPending, router]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setForm((previousForm) => ({
      ...previousForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email) {
      alert("Please login first!");
      return;
    }

    const totalCopies = Number(form.totalCopies);
    const availableCopies = Number(form.availableCopies);

    if (
      !Number.isInteger(totalCopies) ||
      !Number.isInteger(availableCopies) ||
      totalCopies < 0 ||
      availableCopies < 0
    ) {
      alert("Please enter valid copy numbers!");
      return;
    }

    if (availableCopies > totalCopies) {
      alert("Available Copies cannot be greater than Total Copies!");
      return;
    }

    try {
      setUpdating(true);

      const { data, error } = await authClient.token();

      if (error || !data?.token) {
        throw new Error("Authentication failed! Please login again.");
      }

      const res = await fetch(
        `https://book-nook-server-rosy.vercel.app/books/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${data.token}`,
          },
          body: JSON.stringify({
            ...form,
            totalCopies,
            availableCopies,
          }),
        }
      );

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Update failed");
      }

      alert("Book updated successfully!");
      router.push("/my-books");
      router.refresh();
    } catch (error) {
      console.error(error);

      alert(
        error instanceof Error
          ? error.message
          : "Failed to update book!"
      );
    } finally {
      setUpdating(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-[#E8E1D5] bg-white px-4 py-3 text-sm outline-none focus:border-[#C5A46D]";

  if (isPending || !id) {
    return (
      <main className="min-h-screen bg-[#FAF7F0] p-10 text-center text-slate-500">
        Loading...
      </main>
    );
  }

  if (!session?.user) {
    return (
      <main className="min-h-screen bg-[#FAF7F0] p-10 text-center">
        <h2 className="text-2xl font-bold text-[#172554]">
          Please Login First
        </h2>

        <Link
          href="/signin"
          className="mt-5 inline-block text-[#C5A46D]"
        >
          Go to Login
        </Link>
      </main>
    );
  }

  if (bookLoading) {
    return (
      <main className="min-h-screen bg-[#FAF7F0] p-10 text-center text-slate-500">
        Loading book information...
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-[#FAF7F0] p-10 text-center">
        <p className="text-red-600">{error}</p>

        <Link
          href="/my-books"
          className="mt-5 inline-block text-[#C5A46D]"
        >
          Back to My Books
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAF7F0] px-4 py-12">
      <div className="mx-auto max-w-2xl rounded-3xl border border-[#E8E1D5] bg-white p-6 shadow-sm sm:p-10">
        <p className="text-sm font-semibold uppercase tracking-widest text-[#C5A46D]">
          Your Collection
        </p>

        <h1 className="mt-2 text-3xl font-bold text-[#172554]">
          Edit Book
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Update your book information.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label className="mb-2 block text-sm font-semibold text-[#172554]">
              Book Title
            </label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              className={inputClass}
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-[#172554]">
              Author
            </label>
            <input
              name="author"
              value={form.author}
              onChange={handleChange}
              className={inputClass}
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-[#172554]">
              Category
            </label>
            <input
              name="category"
              value={form.category}
              onChange={handleChange}
              className={inputClass}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#172554]">
                Total Copies
              </label>
              <input
                type="number"
                name="totalCopies"
                value={form.totalCopies}
                onChange={handleChange}
                min="0"
                step="1"
                className={inputClass}
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-[#172554]">
                Available Copies
              </label>
              <input
                type="number"
                name="availableCopies"
                value={form.availableCopies}
                onChange={handleChange}
                min="0"
                step="1"
                className={inputClass}
                required
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-[#172554]">
              Image URL
            </label>
            <input
              type="url"
              name="image"
              value={form.image}
              onChange={handleChange}
              className={inputClass}
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-[#172554]">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={5}
              className={inputClass}
              required
            />
          </div>

          <div className="flex flex-col gap-3 pt-3 sm:flex-row">
            <button
              type="submit"
              disabled={updating}
              className="flex-1 rounded-xl bg-[#172554] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#243B73] disabled:opacity-50"
            >
              {updating ? "Updating..." : "Update Book"}
            </button>

            <Link
              href="/my-books"
              className="rounded-xl border border-[#E8E1D5] px-6 py-3.5 text-center text-sm font-semibold text-[#172554] hover:bg-[#F5EFE3]"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
