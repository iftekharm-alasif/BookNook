
export default function Loading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#FAF7F0] px-4">
      <div className="text-center">
        <div className="relative mx-auto mb-7 h-20 w-20">
          <div className="absolute inset-0 animate-spin rounded-full border-4 border-[#E8E1D5] border-t-[#C5A46D]" />

          <div className="absolute inset-0 flex items-center justify-center text-3xl">
            📚
          </div>
        </div>

        <h2 className="text-2xl font-bold text-[#172554]">
          BookNook
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          Your next great read is waiting...
        </p>

        <div className="mx-auto mt-6 h-1.5 w-40 overflow-hidden rounded-full bg-[#E8E1D5]">
          <div className="h-full w-1/2 animate-[loading_1.5s_ease-in-out_infinite] rounded-full bg-[#C5A46D]" />
        </div>
      </div>
    </main>
  );
}
