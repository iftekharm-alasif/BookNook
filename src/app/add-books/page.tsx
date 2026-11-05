
"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { authClient } from "@/lib/auth-client";

const categories = [
  "Fiction",
  "Non-Fiction",
  "Science",
  "Technology",
  "Programming",
  "History",
  "Biography",
  "Mystery",
  "Romance",
  "Fantasy",
  "Other",
];

export default function AddBookPage() {
  const { data: session, isPending } = authClient.useSession();

  const username = session?.user?.name || "";
  const email = session?.user?.email || "";

  const [form, setForm] = useState({
    title: "",
    author: "",
    category: "",
    totalCopies: "1",
    availableCopies: "1",
    image: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Handle input changes
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setForm((previousForm) => ({
      ...previousForm,
      [name]: value,
    }));
  };

  // Add book
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    if (Number(form.availableCopies) > Number(form.totalCopies)) {
      setMessage("Available Copies cannot be greater than Total Copies!");
      setLoading(false);
      return;
    }

    try {
      const bookData = {
        ...form,
        username,
        email,
        totalCopies: Number(form.totalCopies),
        availableCopies: Number(form.availableCopies),
      };

      const res = await fetch("https://book-nook-server-rosy.vercel.app/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to add book!");
      }

      setMessage("Book added successfully!");

      setForm({
        title: "",
        author: "",
        category: "",
        totalCopies: "1",
        availableCopies: "1",
        image: "",
        description: "",
      });
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong!"
      );
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-lg border border-[#E8E1D5] bg-white px-4 py-3 text-slate-700 outline-none focus:border-[#C5A46D]";

  if (isPending) {
    return (
      <div className="min-h-screen bg-[#FAF7F0] py-20 text-center">
        Loading...
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div className="min-h-screen bg-[#FAF7F0] py-20 text-center">
        <p className="text-xl font-bold text-[#172554]">
          Please Login First
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7F0] px-4 py-12">
      <div className="mx-auto max-w-2xl rounded-2xl bg-white p-6 shadow-sm sm:p-10">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-[#172554]">
            Add a New Book
          </h1>

          <p className="mt-2 text-slate-500">
            Share your favorite book with the BookNook community.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block font-medium text-slate-700">
              Book Title *
            </label>

            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Enter book title"
              className={inputClass}
              required
            />
          </div>

          <div>
            <label className="mb-2 block font-medium text-slate-700">
              Author Name *
            </label>

            <input
              type="text"
              name="author"
              value={form.author}
              onChange={handleChange}
              placeholder="Enter author name"
              className={inputClass}
              required
            />
          </div>

          <div>
            <label className="mb-2 block font-medium text-slate-700">
              Category *
            </label>

            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className={inputClass}
              required
            >
              <option value="">Select a category</option>

              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block font-medium text-slate-700">
              Total Copies *
            </label>

            <input
              type="number"
              name="totalCopies"
              value={form.totalCopies}
              onChange={handleChange}
              min="1"
              step="1"
              className={inputClass}
              required
            />
          </div>

          <div>
            <label className="mb-2 block font-medium text-slate-700">
              Available Copies *
            </label>

            <input
              type="number"
              name="availableCopies"
              value={form.availableCopies}
              onChange={handleChange}
              min="0"
              max={form.totalCopies}
              step="1"
              className={inputClass}
              required
            />
          </div>

          <div>
            <label className="mb-2 block font-medium text-slate-700">
              Book Image URL
            </label>

            <input
              type="url"
              name="image"
              value={form.image}
              onChange={handleChange}
              placeholder="Enter image URL"
              className={inputClass}
            />
          </div>

          <div>
            <label className="mb-2 block font-medium text-slate-700">
              Description *
            </label>

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Write a short description..."
              rows={4}
              className={inputClass}
              required
            />
          </div>

          <div>
            <label className="mb-2 block font-medium text-slate-700">
              Your Name
            </label>

            <input
              type="text"
              value={username}
              readOnly
              className={`${inputClass} cursor-not-allowed bg-gray-100`}
            />
          </div>

          <div>
            <label className="mb-2 block font-medium text-slate-700">
              Your Email
            </label>

            <input
              type="email"
              value={email}
              readOnly
              className={`${inputClass} cursor-not-allowed bg-gray-100`}
            />
          </div>

          {message && (
            <p className="rounded-lg bg-[#FAF7F0] p-3 text-sm text-[#172554]">
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={loading || !username || !email}
            className="w-full rounded-lg bg-[#172554] px-6 py-3 font-semibold text-white transition hover:bg-[#243B73] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Adding Book..." : "Add Book"}
          </button>
        </form>
      </div>
    </div>
  );
}
