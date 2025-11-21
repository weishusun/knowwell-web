export default function WriteReviewPage() {
  const categories = [
    { label: "Smart phones" },
    { label: "Smart wearables" },
    { label: "Vehicles" },
    { label: "Laptop & Computer" },
    { label: "Sports Shoes" },
    { label: "Baby Products" },
    { label: "Beauty" },
  ];

  const reviews = [
    {
      title: "Amazing battery life",
      product: "XPhone Ultra",
      excerpt:
        "The battery easily lasts me through a full day of heavy use with plenty left for the evening.",
    },
    {
      title: "Comfortable and stylish",
      product: "AirStride Running Shoes",
      excerpt:
        "Lightweight cushioning and breathable material make long runs feel effortless and cool.",
    },
    {
      title: "Perfect stroller for city life",
      product: "Urban Glide 2",
      excerpt:
        "Navigates tight spaces with ease and folds up quickly when hopping on public transit.",
    },
    {
      title: "Game changer for productivity",
      product: "FlexBook 14",
      excerpt:
        "Great keyboard feel, bright display, and seamless switching between laptop and tablet modes.",
    },
  ];

  return (
    <div className="bg-slate-50 pb-16">
      <div className="mx-auto max-w-6xl px-4">
        {/* Hero */}
        <section className="mt-12 rounded-3xl bg-white px-8 py-12 shadow-sm md:flex md:items-center md:gap-10">
          <div className="flex-1 space-y-5">
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-purple-600">
              Write a review and win a big gift!
            </div>
            <h1 className="text-4xl font-extrabold leading-tight text-slate-900 md:text-5xl">
              Your sharing will help others make better choices
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-purple-600">
              <a href="#" className="underline decoration-2 underline-offset-4">
                View the prize draw rules
              </a>
              <button className="rounded-full bg-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-200 transition hover:bg-purple-700">
                Write a review
              </button>
            </div>
          </div>
          <div className="mt-10 flex flex-1 justify-center md:mt-0">
            <div className="h-64 w-full max-w-md rounded-2xl bg-gradient-to-br from-purple-50 via-white to-slate-50 p-6 shadow-inner">
              <svg
                className="h-full w-full text-purple-300"
                viewBox="0 0 400 300"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="30" y="40" width="260" height="180" rx="18" fill="currentColor" opacity="0.35" />
                <rect
                  x="70"
                  y="70"
                  width="260"
                  height="180"
                  rx="18"
                  fill="currentColor"
                  opacity="0.2"
                />
                <path
                  d="M150 120C150 108.954 158.954 100 170 100H270C281.046 100 290 108.954 290 120V200C290 211.046 281.046 220 270 220H170C158.954 220 150 211.046 150 200V120Z"
                  fill="currentColor"
                  opacity="0.6"
                />
                <circle cx="190" cy="170" r="22" fill="white" opacity="0.9" />
                <path d="M182 170L188 176L200 160" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        </section>

        {/* Search + categories */}
        <section className="mt-16 space-y-10">
          <div className="flex items-center justify-between gap-6">
            <h2 className="text-2xl font-bold text-slate-900">What are you looking for?</h2>
            <div className="w-full max-w-md rounded-full border border-slate-200 bg-white px-4 py-2 shadow-sm">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Search for a product or brand"
                  className="w-full border-none bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
                />
                <button className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-600 text-white transition hover:bg-purple-700">
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M16 10a6 6 0 11-12 0 6 6 0 0112 0z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 md:grid-cols-4">
            {categories.map((category, index) => (
              <div
                key={category.label}
                className="group flex aspect-square flex-col items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-slate-100 transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                  <svg
                    className="h-7 w-7"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect x="5" y="5" width="14" height="14" rx="3" className="stroke-current" />
                    <path d="M9 9h6v6H9z" className="fill-current opacity-40" />
                  </svg>
                </div>
                <div className="text-center text-sm font-semibold text-slate-800">{category.label}</div>
                {index === 6 && <div className="h-1 w-16 rounded-full bg-purple-100" />}
              </div>
            ))}
          </div>
        </section>

        {/* Recent reviews */}
        <section className="mt-16 rounded-3xl bg-white px-6 py-10 shadow-sm">
          <div className="grid gap-8 md:grid-cols-5 md:items-start">
            <div className="space-y-4">
              <h3 className="text-3xl font-bold text-slate-900">RECENT REVIEWS</h3>
              <p className="text-sm text-slate-600">
                Fresh insights from our community to guide your next purchase.
              </p>
              <button className="rounded-full border border-purple-200 px-5 py-2 text-sm font-semibold text-purple-700 transition hover:border-purple-300 hover:bg-purple-50">
                More
              </button>
            </div>
            <div className="md:col-span-4">
              <div className="grid gap-5 sm:grid-cols-2">
                {reviews.map((review) => (
                  <article
                    key={review.title}
                    className="flex h-full flex-col gap-3 rounded-2xl border border-slate-100 bg-gradient-to-br from-white to-slate-50 p-5 shadow-sm"
                  >
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-purple-600">
                      {review.product}
                    </div>
                    <h4 className="text-lg font-bold text-slate-900">{review.title}</h4>
                    <p className="text-sm text-slate-600">{review.excerpt}</p>
                    <div className="mt-auto pt-2 text-sm font-semibold text-purple-700">Read more</div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Empty state */}
        <section className="mt-16 flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-200 bg-white px-6 py-14 text-center shadow-sm">
          <h4 className="text-xl font-semibold text-slate-900">Can&apos;t find what you are looking for?</h4>
          <p className="mt-2 max-w-2xl text-sm text-slate-600">
            Tell us about the product or brand you want to review. We&apos;ll add it so you and others can share
            experiences.
          </p>
          <button className="mt-6 rounded-full bg-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-200 transition hover:bg-purple-700">
            Add product/brand
          </button>
        </section>
      </div>
    </div>
  );
}
