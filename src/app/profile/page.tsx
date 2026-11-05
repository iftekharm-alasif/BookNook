
"use client";

import { useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

type ProfileUser = {
  id: string;
  name: string;
  email: string;
  image?: string | null;
  createdAt?: Date | string;
};

export default function Profile() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-[#FAF7F0]">
        <p className="font-medium text-[#172554]">
          Loading profile...
        </p>
      </div>
    );
  }

  if (!session?.user) {
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

  return <ProfileForm user={session.user} />;
}

function ProfileForm({ user }: { user: ProfileUser }) {
  const [name, setName] = useState(user.name || "");
  const [image, setImage] = useState(user.image || "");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const handleSave = async () => {
    if (!name.trim()) {
      setMessage("Name cannot be empty.");
      return;
    }

    const imageUrl = image.trim();

    if (imageUrl && !/^https?:\/\/.+/i.test(imageUrl)) {
      setMessage("Please enter a valid image URL.");
      return;
    }

    setSaving(true);
    setMessage("");

    try {
      const { error } = await authClient.updateUser({
        name: name.trim(),
        image: imageUrl || undefined,
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
    try {
      await authClient.signOut();
      window.location.href = "/";
    } catch {
      setMessage("Logout failed. Please try again.");
    }
  };

  return (
    <main className="min-h-screen bg-[#FAF7F0] px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-[#172554] sm:text-4xl">
            My Profile
          </h1>

          <p className="mt-2 text-slate-500">
            Manage your BookNook account.
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-[#E8E1D5] bg-white shadow-sm">
          <div className="h-32 bg-[#172554] sm:h-40" />

          <div className="px-6 pb-8 sm:px-10">
            <div className="-mt-14">
              {image ? (
                <img
                  src={image}
                  alt="Profile"
                  className="h-28 w-28 rounded-full border-4 border-white object-cover shadow-md"
                  onError={() =>
                    setMessage("Image URL could not be loaded.")
                  }
                />
              ) : (
                <div className="flex h-28 w-28 items-center justify-center rounded-full border-4 border-white bg-[#C5A46D] text-4xl font-bold text-white shadow-md">
                  {name.charAt(0).toUpperCase() || "U"}
                </div>
              )}

              <p className="mt-3 text-xs text-slate-500">
                Your profile picture.
              </p>
            </div>

            <div className="mt-6">
              <h2 className="text-2xl font-bold text-[#172554]">
                {name || user.name}
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                BookNook Member
              </p>
            </div>

            <div className="mt-8 space-y-5">
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

              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#C5A46D]">
                  Profile Image URL
                </label>

                <input
                  type="url"
                  value={image}
                  onChange={(e) => {
                    setImage(e.target.value);
                    setMessage("");
                  }}
                  placeholder="Paste your image URL here"
                  className="w-full rounded-xl border border-[#E8E1D5] bg-[#FAF7F0] px-4 py-3 font-medium text-[#172554] outline-none transition focus:border-[#C5A46D]"
                />

                <p className="mt-2 text-xs text-slate-400">
                  Paste a direct image link (JPG, PNG or WebP).
                </p>
              </div>

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

              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#C5A46D]">
                  Account Created
                </label>

                <div className="rounded-xl border border-[#E8E1D5] bg-[#FAF7F0] px-4 py-3 font-medium text-[#172554]">
                  {user.createdAt
                    ? new Date(user.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : "Not available"}
                </div>
              </div>
            </div>

            {message && (
              <p className="mt-5 text-sm font-medium text-[#172554]">
                {message}
              </p>
            )}

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
