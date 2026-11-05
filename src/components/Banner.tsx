
"use client";

import { useState } from "react";
import Link from "next/link";

const categories = [
  {
    title: "Science Fiction",
    description:
      "Explore futuristic concepts, advanced technology, space exploration, time travel, and imaginative scientific possibilities.",
    symbol: "🚀",
    category: "science-fiction",
    gradient: "from-[#172554] via-[#243B73] to-[#475569]",
  },
  {
    title: "Mystery",
    description:
      "Uncover hidden secrets, solve mysterious puzzles, and follow thrilling detective stories filled with unexpected discoveries.",
    symbol: "🔎",
    category: "mystery",
    gradient: "from-[#312E81] via-[#4338CA] to-[#64748B]",
  },
  {
    title: "Thriller",
    description:
      "Experience high-stakes adventures, psychological mind games, unexpected twists, and stories full of suspense.",
    symbol: "⚡",
    category: "thriller",
    gradient: "from-[#7F1D1D] via-[#991B1B] to-[#334155]",
  },
  {
    title: "Religion",
    description:
      "Discover faith, spiritual beliefs, sacred texts, theology, and the history and philosophy of world religions.",
    symbol: "📖",
    category: "religion",
    gradient: "from-[#78350F] via-[#A16207] to-[#C5A46D]",
  },
  {
    title: "Science",
    description:
      "Learn about natural phenomena, physics, biology, technology, space, and evidence-based scientific discoveries.",
    symbol: "🔬",
    category: "science",
    gradient: "from-[#164E63] via-[#0E7490] to-[#475569]",
  },
  {
    title: "Fantasy",
    description:
      "Enter magical worlds filled with mythical creatures, powerful magic, epic quests, and supernatural adventures.",
    symbol: "🐉",
    category: "fantasy",
    gradient: "from-[#4C1D95] via-[#6D28D9] to-[#9333EA]",
  },
  {
    title: "Romance",
    description:
      "Enjoy heartfelt stories about romantic love, emotional connections, relationships, and meaningful bonds.",
    symbol: "❤️",
    category: "romance",
    gradient: "from-[#9D174D] via-[#BE185D] to-[#C5A46D]",
  },
  {
    title: "Historical",
    description:
      "Travel through different eras with stories inspired by historical events, authentic details, and unforgettable people.",
    symbol: "🏛️",
    category: "historical",
    gradient: "from-[#78350F] via-[#92400E] to-[#475569]",
  },
  {
    title: "Horror",
    description:
      "Discover terrifying stories filled with fear, eerie atmospheres, mysterious creatures, and psychological suspense.",
    symbol: "👻",
    category: "horror",
    gradient: "from-[#111827] via-[#1F2937] to-[#7F1D1D]",
  },
  {
    title: "Action",
    description:
      "Dive into fast-paced adventures, intense conflicts, heroic journeys, danger, and adrenaline-filled moments.",
    symbol: "🔥",
    category: "action",
    gradient: "from-[#9A3412] via-[#C2410C] to-[#78350F]",
  },
  {
    title: "Comic",
    description:
      "Enjoy visual storytelling through illustrations and sequential panels, from superheroes to personal memoirs.",
    symbol: "💥",
    category: "comic",
    gradient: "from-[#1D4ED8] via-[#2563EB] to-[#C5A46D]",
  },
];

export default function Banner() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const previousSlide = () => {
    setCurrentIndex((current) =>
      current === 0 ? categories.length - 1 : current - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((current) =>
      current === categories.length - 1 ? 0 : current + 1
    );
  };

  return (
    <section className="bg-[#FAF7F0] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mb-6 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.25em] text-[#C5A46D]">
            Find Your Next Favorite
          </p>

          <h2 className="text-3xl font-bold tracking-tight text-[#172554] sm:text-4xl">
            Explore Book Genres
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
            Discover amazing stories, explore new ideas, and find books
            that match your interests.
          </p>
        </div>

        {/* Slider */}
        <div className="relative overflow-hidden rounded-2xl">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {categories.map((item, index) => (
              <div
                key={item.category}
                className="min-w-full"
                aria-hidden={currentIndex !== index}
              >
                <div
                  className={`relative flex min-h-[340px] flex-col justify-center overflow-hidden bg-gradient-to-br ${item.gradient} px-8 py-12 text-white shadow-lg sm:min-h-[390px] sm:px-14 md:px-20`}
                >
                  {/* Decorative Background */}
                  <div className="pointer-events-none absolute -right-10 -top-10 h-64 w-64 rounded-full border border-white/10" />

                  <div className="pointer-events-none absolute -right-5 -top-5 h-48 w-48 rounded-full border border-white/10" />

                  <div className="pointer-events-none absolute -bottom-20 right-20 h-64 w-64 rounded-full bg-white/5 blur-3xl" />

                  {/* Content */}
                  <div className="relative z-10 max-w-2xl">
                    <span className="mb-5 inline-flex rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-medium tracking-wider text-white/90 backdrop-blur-sm">
                      GENRE {String(index + 1).padStart(2, "0")} / 11
                    </span>

                    <div className="mb-4 flex items-center gap-3">
                      <span className="text-4xl sm:text-5xl">
                        {item.symbol}
                      </span>

                      <h3 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                        {item.title}
                      </h3>
                    </div>

                    <p className="max-w-xl text-sm leading-7 text-white/85 sm:text-base sm:leading-8">
                      {item.description}
                    </p>

                    <Link
                      href={`/books?category=${item.category}`}
                      tabIndex={currentIndex === index ? 0 : -1}
                      className="mt-7 inline-flex items-center gap-3 rounded-lg bg-[#FAF7F0] px-6 py-3 text-sm font-semibold text-[#172554] shadow-md transition-all duration-300 hover:bg-[#C5A46D] hover:text-white"
                    >
                      Browse Books
                      <span aria-hidden="true">→</span>
                    </Link>
                  </div>

                  {/* Decorative Symbol */}
                  <div className="pointer-events-none absolute bottom-5 right-8 hidden select-none text-[150px] opacity-15 sm:block md:right-16 md:text-[190px]">
                    {item.symbol}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Previous Button */}
          <button
            type="button"
            onClick={previousSlide}
            aria-label="Previous slide"
            className="absolute left-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#172554] shadow-lg transition-colors hover:bg-[#C5A46D] hover:text-white sm:left-5 sm:h-12 sm:w-12"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>

          {/* Next Button */}
          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next slide"
            className="absolute right-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#172554] shadow-lg transition-colors hover:bg-[#C5A46D] hover:text-white sm:right-5 sm:h-12 sm:w-12"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </div>

        {/* Slide Indicator */}
        <div className="mt-5 flex items-center justify-center gap-2">
          {categories.map((item, index) => (
            <button
              key={item.category}
              type="button"
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to ${item.title} slide`}
              aria-current={currentIndex === index ? "true" : undefined}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentIndex === index
                  ? "w-7 bg-[#172554]"
                  : "w-2 bg-[#C5A46D]/50 hover:bg-[#C5A46D]"
              }`}
            />
          ))}
        </div>

        <p className="mt-3 text-center text-xs text-slate-500">
          {String(currentIndex + 1).padStart(2, "0")} / 11 — Explore all book genres
        </p>
      </div>
    </section>
  );
}
