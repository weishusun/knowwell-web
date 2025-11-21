import Link from "next/link";

const favoriteOptions = [
  "Long-lasting battery",
  "Stunning camera",
  "Sleek design",
  "Fast performance",
];

const dislikeOptions = [
  "High price",
  "Limited colors",
  "Fragile glass",
  "Charger not included",
];

const sourceOptions = [
  { value: "purchase", label: "Purchase" },
  { value: "other", label: "Other" },
];

const submitButtons = [
  { label: "Google", className: "bg-amber-100 text-amber-800" },
  { label: "Facebook", className: "bg-blue-100 text-blue-800" },
  { label: "Twitter (X)", className: "bg-slate-100 text-slate-800" },
  { label: "Email", className: "bg-purple-100 text-purple-800" },
];

export default function ReviewsPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#f6f1ff] via-[#f2e9ff] to-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 -top-24 h-72 w-72 rounded-full bg-purple-200/40 blur-3xl" />
        <div className="absolute -right-24 top-10 h-80 w-80 rounded-full bg-indigo-200/30 blur-3xl" />
        <div className="absolute inset-x-0 bottom-[-60px] h-60 bg-[radial-gradient(circle_at_50%_0,_rgba(168,138,255,0.35)_0,rgba(246,241,255,0)_70%)]" />
      </div>

      <section className="relative z-10 mx-auto flex max-w-5xl items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl ring-1 ring-purple-100">
          <div className="flex items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-purple-200 to-indigo-200 text-lg font-semibold text-purple-900">
              
            </div>
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-purple-500">Apple</p>
              <h1 className="text-2xl font-semibold text-slate-900">iPhone 16</h1>
            </div>
          </div>

          <p className="mt-6 text-center text-xs font-semibold uppercase tracking-[0.3em] text-purple-400">
            Welcome to post your review
          </p>

          <div className="mt-6 space-y-6">
            <div className="space-y-3">
              <p className="text-sm font-semibold text-slate-700">Rate your experience</p>
              <div className="flex items-center gap-2 text-2xl text-purple-500 drop-shadow-sm">
                {Array.from({ length: 5 }).map((_, index) => (
                  <span key={index} aria-hidden="true">
                    ★
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-sm font-semibold text-slate-700">What do you like most?</p>
              <div className="grid grid-cols-2 gap-3">
                {favoriteOptions.map((option) => (
                  <label
                    key={option}
                    className="group flex cursor-pointer items-center gap-3 rounded-2xl border border-purple-100 bg-purple-50/60 px-4 py-3 text-sm font-medium text-slate-800 transition hover:border-purple-300 hover:bg-purple-50"
                  >
                    <input
                      type="radio"
                      name="favorite"
                      className="h-4 w-4 rounded-full border-purple-300 text-purple-500 focus:ring-purple-400"
                    />
                    <span className="group-hover:text-purple-700">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-sm font-semibold text-slate-700">What do you dislike most?</p>
              <div className="grid grid-cols-2 gap-3">
                {dislikeOptions.map((option) => (
                  <label
                    key={option}
                    className="group flex cursor-pointer items-center gap-3 rounded-2xl border border-purple-100 bg-white px-4 py-3 text-sm font-medium text-slate-800 shadow-sm transition hover:border-purple-300 hover:bg-purple-50"
                  >
                    <input
                      type="radio"
                      name="dislike"
                      className="h-4 w-4 rounded-full border-purple-300 text-purple-500 focus:ring-purple-400"
                    />
                    <span className="group-hover:text-purple-700">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-semibold text-slate-700">Share your review</p>
              <textarea
                rows={4}
                className="w-full resize-none rounded-2xl border border-purple-100 bg-purple-50/60 px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-200"
                placeholder="Tell us about your genuine experience with iPhone 16"
              />
              <Link
                href="#"
                className="text-xs font-medium text-purple-500 underline underline-offset-4 hover:text-purple-600"
              >
                Read guidelines for reviewers
              </Link>
            </div>

            <div className="space-y-3">
              <p className="text-sm font-semibold text-slate-700">This review is based on</p>
              <div className="grid grid-cols-2 gap-3">
                {sourceOptions.map((option) => (
                  <label
                    key={option.value}
                    className="group flex cursor-pointer items-center gap-3 rounded-2xl border border-purple-100 bg-white px-4 py-3 text-sm font-medium text-slate-800 shadow-sm transition hover:border-purple-300 hover:bg-purple-50"
                  >
                    <input
                      type="radio"
                      name="source"
                      className="h-4 w-4 rounded-full border-purple-300 text-purple-500 focus:ring-purple-400"
                    />
                    <span className="group-hover:text-purple-700">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <Link
              href="#"
              className="block text-center text-sm font-semibold text-purple-600 underline underline-offset-4 hover:text-purple-700"
            >
              View the latest reviews of iPhone 16
            </Link>

            <div className="space-y-4">
              <p className="text-sm font-semibold text-slate-700">Submit your review with</p>
              <div className="grid grid-cols-2 gap-3">
                {submitButtons.map((button) => (
                  <button
                    key={button.label}
                    type="button"
                    className={`flex items-center justify-center rounded-2xl px-4 py-4 text-sm font-semibold shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${button.className}`}
                  >
                    {button.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
