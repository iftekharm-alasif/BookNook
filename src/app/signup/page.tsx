
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

const SignUpPage = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleEmailSignUp = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setLoading(true);
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const { data, error } = await authClient.signUp.email({
        name,
        email,
        password,
      });

      if (error) {
        setErrorMessage(error.message || "Signup failed.");
        return;
      }

  if (data) {
  router.push("/");
  router.refresh();
}
    } catch (error) {
      setErrorMessage("Something went wrong. Please try again.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FAF7F0] px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-[#E8E1D5] bg-white p-8 shadow-lg sm:p-10">

        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-[#172554]">
            Book<span className="text-[#C5A46D]">Nook</span>
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Create your account and start exploring books.
          </p>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-bold text-[#172554]">
            Create an Account
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Please fill in your details to sign up.
          </p>
        </div>

        <form onSubmit={handleEmailSignUp} className="space-y-5">

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              required
              className="w-full rounded-lg border border-[#E8E1D5] px-4 py-3 text-sm outline-none transition focus:border-[#C5A46D] focus:ring-2 focus:ring-[#C5A46D]/20"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              required
              className="w-full rounded-lg border border-[#E8E1D5] px-4 py-3 text-sm outline-none transition focus:border-[#C5A46D] focus:ring-2 focus:ring-[#C5A46D]/20"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Password
            </label>

            <input
              type="password"
              name="password"
              placeholder="Create a password"
              required
              minLength={8}
              className="w-full rounded-lg border border-[#E8E1D5] px-4 py-3 text-sm outline-none transition focus:border-[#C5A46D] focus:ring-2 focus:ring-[#C5A46D]/20"
            />
          </div>

          {errorMessage && (
            <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
              {errorMessage}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-[#172554] py-3 font-semibold text-white transition hover:bg-[#243B73] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <div className="my-6 flex items-center gap-4">
          <div className="h-px flex-1 bg-[#E8E1D5]" />
          <span className="text-xs text-slate-400">
            OR SIGN UP WITH
          </span>
          <div className="h-px flex-1 bg-[#E8E1D5]" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            className="flex items-center justify-center gap-2 rounded-lg border border-[#E8E1D5] py-3 text-sm font-semibold text-slate-700 transition hover:bg-[#FAF7F0]"
          >
            Google
          </button>

          <button
            type="button"
            className="flex items-center justify-center gap-2 rounded-lg border border-[#E8E1D5] py-3 text-sm font-semibold text-slate-700 transition hover:bg-[#FAF7F0]"
          >
            GitHub
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-slate-500">
          Already have an account?{" "}
          <Link
            href="/signin"
            className="font-semibold text-[#172554] transition hover:text-[#C5A46D]"
          >
            Sign In
          </Link>
        </p>

      </div>
    </div>
  );
};

export default SignUpPage;
