
"use client";

import { useEffect, useRef, useState } from "react";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";

export default function Profile() {
  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setImage(user.image || "");
    }
  }, [user]);

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setMessage("Please select a valid image.");
      return;
    }

    if (file.size > 1024 * 1024) {
      setMessage("Image size must be less than 1 MB.");
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result as string);
      setMessage("");
    };

    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    if (!name.trim()) {
      setMessage("Name cannot be empty.");
      return;
    }

    setSaving(true);
    setMessage("");

    try {
      const { error } = await authClient.updateUser({
        name: name.trim(),
        image: image || undefined,
      });

      if (error) {
        setMessage(error.message || "Failed to update profile.");
      } else {
        setMessage("Profile updated successfully!");
      }
    } catch {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    await authClient.signOut();
    window.location.href = "/";
  };

  if (isPending) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-[#FAF7F0]">
        <p className="font-medium text-[#172554]">
          Loading profile...
        </p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center bg-[#FAF7F0] px-4">
        <h2 className="text-2xl font-bold text-[#172554]">
          Please Sign In
        </h2>

        <p className="mt-2 text-slate-500">
          You need to login to view your profile.
        </p>

        <Link
          href="/signin"
          className="mt-5 rounded-lg bg-[#172554] px-6 py-3 font-semibold text-white hover:bg-[#243B73]"
        >
          Sign In
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAF7F0] px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-3xl">

        {/* Heading */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-[#172554] sm:text-4xl">
            My Profile
          </h1>

          <p className="mt-2 text-slate-500">
            Manage your BookNook account.
          </p>
        </div>

        {/* Profile Card */}
        <div className="overflow-hidden rounded-2xl border border-[#E8E1D5] bg-white shadow-sm">

          {/* Banner */}
          <div className="h-32 bg-[#172554] sm:h-40" />

          <div className="px-6 pb-8 sm:px-10">

            {/* Profile Image */}
            <div className="-mt-14">
              <div className="relative h-28 w-28">

                {image ? (
                  <img
                    src={image}
                    alt="Profile"
                    className="h-28 w-28 rounded-full border-4 border-white object-cover shadow-md"
                  />
                ) : (
                  <div className="flex h-28 w-28 items-center justify-center rounded-full border-4 border-white bg-[#C5A46D] text-4xl font-bold text-white shadow-md">
                    {name?.charAt(0).toUpperCase() || "U"}
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-1 right-1 flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-[#172554] text-white transition hover:bg-[#243B73]"
                  title="Change profile picture"
                >
                  ✎
                </button>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>

              <p className="mt-3 text-xs text-slate-500">
                Click the edit icon to change your photo (Max 1 MB).
              </p>
            </div>

            {/* User Name */}
            <div className="mt-6">
              <h2 className="text-2xl font-bold text-[#172554]">
                {user.name}
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                BookNook Member
              </p>
            </div>

            {/* Profile Form */}
            <div className="mt-8 space-y-5">

              {/* Name */}
              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#C5A46D]">
                  Full Name
                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full rounded-xl border border-[#E8E1D5] bg-[#FAF7F0] px-4 py-3 font-medium text-[#172554] outline-none transition focus:border-[#C5A46D]"
                />
              </div>

              {/* Email */}
              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#C5A46D]">
                  Email Address
                </label>

                <input
                  type="email"
                  value={user.email}
                  readOnly
                  className="w-full cursor-not-allowed rounded-xl border border-[#E8E1D5] bg-gray-100 px-4 py-3 font-medium text-slate-500 outline-none"
                />

                <p className="mt-2 text-xs text-slate-400">
                  Email address cannot be changed here.
                </p>
              </div>

              {/* Account Created */}
              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#C5A46D]">
                  Account Created
                </label>

                <div className="rounded-xl border border-[#E8E1D5] bg-[#FAF7F0] px-4 py-3 font-medium text-[#172554]">
                  {user.createdAt
                    ? new Date(user.createdAt).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )
                    : "Not available"}
                </div>
              </div>

            </div>

            {/* Message */}
            {message && (
              <p className="mt-5 text-sm font-medium text-[#172554]">
                {message}
              </p>
            )}

            {/* Buttons */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">

              <button
                onClick={handleSave}
                disabled={saving}
                className="flex flex-1 items-center justify-center rounded-lg bg-[#172554] px-5 py-3 font-semibold text-white transition hover:bg-[#243B73] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>

              <Link
                href="/all-books"
                className="flex flex-1 items-center justify-center rounded-lg border border-[#E8E1D5] px-5 py-3 font-semibold text-[#172554] transition hover:bg-[#FAF7F0]"
              >
                Explore Books
              </Link>

              <button
                onClick={handleLogout}
                className="flex flex-1 items-center justify-center rounded-lg border border-red-400 px-5 py-3 font-semibold text-red-600 transition hover:bg-red-50"
              >
                Logout
              </button>

            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
