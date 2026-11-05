
"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";

const initialForm = {
  title: "",
  author: "",
  category: "",
  totalCopies: "1",
  image: "",
  description: "",
  username: "",
  email: "",
};

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
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const bookData = {
        ...form,
        totalCopies: Number(form.totalCopies),
        availableCopies: Number(form.totalCopies),
      };

      const res = await fetch("http://localhost:8000/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookData),
      });

      if (!res.ok) {
        throw new Error("Failed to add book!");
      }

      setMessage("Book added successfully!");
      setForm(initialForm);

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

          {/* Book Title */}
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

          {/* Author */}
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

          {/* Category */}
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

          {/* Total Copies */}
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
              placeholder="Enter total copies"
              className={inputClass}
              required
            />

            <p className="mt-2 text-xs text-slate-500">
              How many copies of this book are available for borrowing?
            </p>
          </div>

          {/* Image */}
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

          {/* Description */}
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

          {/* Username */}
          <div>
            <label className="mb-2 block font-medium text-slate-700">
              Your Name *
            </label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Enter your name"
              className={inputClass}
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="mb-2 block font-medium text-slate-700">
              Your Email *
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className={inputClass}
              required
            />
          </div>

          {/* Message */}
          {message && (
            <p className="rounded-lg bg-[#FAF7F0] p-3 text-sm text-[#172554]">
              {message}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-[#172554] px-6 py-3 font-semibold text-white transition hover:bg-[#243B73] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Adding Book..." : "Add Book"}
          </button>

        </form>
      </div>
    </div>
  );
}
