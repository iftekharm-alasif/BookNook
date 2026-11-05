
import Link from "next/link";

const steps = [
  {
    number: "01",
    icon: "🔍",
    title: "Explore Books",
    description:
      "Browse our collection and find the book you want to read.",
  },
  {
    number: "02",
    icon: "📖",
    title: "View Details",
    description:
      "Check book information and see how many copies are available.",
  },
  {
    number: "03",
    icon: "🤝",
    title: "Borrow Book",
    description:
      "Sign in to your account and click the Borrow button.",
  },
  {
    number: "04",
    icon: "🔄",
    title: "Return Book",
    description:
      "Enjoy your reading and return the book when you finish.",
  },
];

export default function HowBorrowingWorks() {
  return (
    <section className="bg-[#FAF7F0] px-4 py-16 sm:px-6 lg:py-20">
      <div className="mx-auto max-w-6xl">

        <div className="mb-12 text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#C5A46D]">
            Simple 4-Step Process
          </p>

          <h2 className="text-3xl font-bold text-[#172554] sm:text-4xl">
            How Borrowing Works
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-slate-500">
            Borrow your favorite books in just a few
            simple steps. Start reading with BookNook!
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <div
              key={step.number}
              className="rounded-2xl border border-[#E8E1D5] bg-white p-7 transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="mb-6 flex items-center justify-between">
                <span className="text-3xl font-bold text-[#C5A46D]">
                  {step.number}
                </span>

                <span className="text-3xl">
                  {step.icon}
                </span>
              </div>

              <h3 className="mb-3 text-xl font-bold text-[#172554]">
                {step.title}
              </h3>

              <p className="text-sm leading-7 text-slate-500">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-2xl bg-[#172554] px-6 py-10 text-center">
          <h3 className="text-2xl font-bold text-white">
            Ready to Start Reading?
          </h3>

          <p className="mt-3 text-sm text-slate-300">
            Discover your next favorite book today.
          </p>

          <Link
            href="/all-books"
            className="mt-6 inline-block rounded-lg bg-[#C5A46D] px-7 py-3 font-semibold text-[#172554] transition hover:bg-white"
          >
            Explore Books
          </Link>
        </div>

      </div>
    </section>
  );
}
