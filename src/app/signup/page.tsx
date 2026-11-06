"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function SignUpPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  setLoading(true);
  setErrorMessage("");

  const formData = new FormData(e.currentTarget);

  try {
    const { data, error } = await authClient.signUp.email({
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    });

    console.log("Signup Data:", data);
    console.log("Signup Error:", error);

    if (error) {
      setErrorMessage(error.message || "Signup failed!");
      return;
    }

    if (data) {
      router.push("/");
      router.refresh();
    }
  } catch (error) {
    console.error("Signup Exception:", error);

    setErrorMessage(
      error instanceof Error ? error.message : "Signup failed!"
    );
  } finally {
    setLoading(false);
  }
};

const handleGoogleSignUp = async () => {
  setErrorMessage("");

  try {
    const result = await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });

    console.log("Google Login Result:", result);

    if (result.error) {
      console.error("Google Login Error:", result.error);
      setErrorMessage(result.error.message || "Google login failed!");
    }
  } catch (error) {
    console.error("Google Login Exception:", error);

    setErrorMessage(
      error instanceof Error ? error.message : "Google login failed!"
    );
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

        <form onSubmit={handleSignUp} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              required
              className="w-full rounded-lg border border-[#E8E1D5] px-4 py-3 text-sm outline-none focus:border-[#C5A46D]"
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
                placeholder="Create a password"
                required
                minLength={8}
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
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <div className="my-6 flex items-center gap-4">
          <div className="h-px flex-1 bg-[#E8E1D5]" />
          <span className="text-xs text-slate-400">OR SIGN UP WITH</span>
          <div className="h-px flex-1 bg-[#E8E1D5]" />
        </div>

        <button
          onClick={handleGoogleSignUp}
          type="button"
          className="w-full rounded-lg border border-[#E8E1D5] py-3 text-sm font-semibold text-slate-700 hover:bg-[#FAF7F0]"
        >
          Google
        </button>

        <p className="mt-6 text-center text-sm text-slate-500">
          Already have an account?{" "}
          <Link
            href="/signin"
            className="font-semibold text-[#172554] hover:text-[#C5A46D]"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
