
"use client";

import React from "react";
import Link from "next/link";

const SignInPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FAF7F0] px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-[#E8E1D5] bg-white p-8 shadow-lg sm:p-10">

        {/* Logo */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-[#172554]">
            Book<span className="text-[#C5A46D]">Nook</span>
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Welcome back! Continue your reading journey.
          </p>
        </div>

        {/* Heading */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-[#172554]">
            Welcome Back
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Sign in to access your account.
          </p>
        </div>

        {/* Sign In Form */}
        <form className="space-y-5">

          {/* Email */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Email Address
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full rounded-lg border border-[#E8E1D5] px-4 py-3 text-sm outline-none transition focus:border-[#C5A46D] focus:ring-2 focus:ring-[#C5A46D]/20"
            />
          </div>

          {/* Password */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              className="w-full rounded-lg border border-[#E8E1D5] px-4 py-3 text-sm outline-none transition focus:border-[#C5A46D] focus:ring-2 focus:ring-[#C5A46D]/20"
            />
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between gap-2">
            <label className="flex items-center gap-2 text-sm text-slate-600">
              <input
                type="checkbox"
                className="h-4 w-4 accent-[#172554]"
              />
              Remember Me
            </label>

            <Link
              href="/forgot-password"
              className="text-sm font-semibold text-[#172554] transition hover:text-[#C5A46D]"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className="w-full rounded-lg bg-[#172554] py-3 font-semibold text-white transition hover:bg-[#243B73]"
          >
            Sign In
          </button>

        </form>

        {/* Divider */}
        <div className="my-6 flex items-center gap-4">
          <div className="h-px flex-1 bg-[#E8E1D5]" />
          <span className="text-xs text-slate-400">
            OR SIGN IN WITH
          </span>
          <div className="h-px flex-1 bg-[#E8E1D5]" />
        </div>

        {/* Google & GitHub */}
        <div className="grid grid-cols-2 gap-4">

          {/* Google */}
          <button
            type="button"
            className="flex items-center justify-center gap-2 rounded-lg border border-[#E8E1D5] py-3 text-sm font-semibold text-slate-700 transition hover:bg-[#FAF7F0]"
          >
            <svg viewBox="0 0 48 48" className="h-5 w-5">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5Z"/>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.73 7.18l7.27 5.64c4.25-3.92 7.5-9.71 7.5-17.29Z"/>
              <path fill="#FBBC05" d="M10.53 28.59A14.4 14.4 0 0 1 9.75 24c0-1.59.27-3.12.75-4.59l-7.98-6.19A23.93 23.93 0 0 0 0 24c0 3.88.93 7.53 2.56 10.78l7.97-6.19Z"/>
              <path fill="#34A853" d="M24 48c6.47 0 11.92-2.13 15.48-5.79l-7.27-5.64c-2.01 1.35-4.59 2.15-8.21 2.15-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 43.62 14.62 48 24 48Z"/>
            </svg>
            Google
          </button>

          {/* GitHub */}
          <button
            type="button"
            className="flex items-center justify-center gap-2 rounded-lg border border-[#E8E1D5] py-3 text-sm font-semibold text-slate-700 transition hover:bg-[#FAF7F0]"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
              <path d="M12 .5A12 12 0 0 0 8.2 23.9c.6.1.8-.3.8-.6v-2.1c-3.3.7-4-1.4-4-1.4-.5-1.3-1.3-1.6-1.3-1.6-1.1-.8.1-.8.1-.8 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.3.8 1 .8 2v3c0 .3.2.7.8.6A12 12 0 0 0 12 .5Z"/>
            </svg>
            GitHub
          </button>

        </div>

        {/* Sign Up Link */}
        <p className="mt-6 text-center text-sm text-slate-500">
          Don't have an account?{" "}
          <Link
            href="/signup"
            className="font-semibold text-[#172554] transition hover:text-[#C5A46D]"
          >
            Sign Up
          </Link>
        </p>

      </div>
    </div>
  );
};

export default SignInPage;
