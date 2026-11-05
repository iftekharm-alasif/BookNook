
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function SignInPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);

    try {
      const { data, error } = await authClient.signIn.email({
        email: formData.get("email") as string,
        password: formData.get("password") as string,
      });

      if (error) {
        setErrorMessage(error.message || "Login failed!");
        return;
      }

      if (data) {
        router.push("/all-books");
        router.refresh();
      }
    } catch {
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  
const handleGoogleSignIn = async () => {
  setErrorMessage("");

  try {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  } catch {
    setErrorMessage("Google sign in failed. Please try again.");
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
            Welcome back! Continue your reading journey.
          </p>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-bold text-[#172554]">
            Welcome Back
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Sign in to access your account.
          </p>
        </div>

        <form onSubmit={handleSignIn} className="space-y-5">

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              required
              className="w-full rounded-lg border border-[#E8E1D5] px-4 py-3 text-sm outline-none focus:border-[#C5A46D]"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                required
                className="w-full rounded-lg border border-[#E8E1D5] px-4 py-3 pr-16 text-sm outline-none focus:border-[#C5A46D]"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-[#172554]"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between gap-2">
            <label className="flex items-center gap-2 text-sm text-slate-600">
              <input type="checkbox" className="h-4 w-4 accent-[#172554]" />
              Remember Me
            </label>

            <Link
              href="/forgot-password"
              className="text-sm font-semibold text-[#172554] hover:text-[#C5A46D]"
            >
              Forgot Password?
            </Link>
          </div>

          {errorMessage && (
            <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
              {errorMessage}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-[#172554] py-3 font-semibold text-white hover:bg-[#243B73] disabled:opacity-60"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

  
<div className="my-6 flex items-center gap-4">
  <div className="h-px flex-1 bg-[#E8E1D5]" />
  <span className="text-xs text-slate-400">OR SIGN UP WITH</span>
  <div className="h-px flex-1 bg-[#E8E1D5]" />
</div>

<button
  onClick={handleGoogleSignIn}
  type="button"
  className="w-full rounded-lg border border-[#E8E1D5] py-3 text-sm font-semibold text-slate-700 hover:bg-[#FAF7F0]"
>
  Google
</button>


        <p className="mt-6 text-center text-sm text-slate-500">
          Dont have an account?{" "}
          <Link href="/signup" className="font-semibold text-[#172554] hover:text-[#C5A46D]">
            Sign Up
          </Link>
        </p>

      </div>
    </div>
  );
}
