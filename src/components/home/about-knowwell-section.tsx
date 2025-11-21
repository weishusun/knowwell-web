export function AboutKnowWellSection() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 lg:px-0">
      <div className="overflow-hidden rounded-[32px] bg-gradient-to-r from-purple-900 via-purple-800 to-blue-900 p-10 text-white shadow-2xl lg:p-12">
        <div className="grid gap-8 lg:grid-cols-[1fr,0.8fr] lg:items-center">
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-purple-200">About KnowWell</p>
            <h2 className="text-3xl font-bold">The most trusted reference for real voices</h2>
            <p className="text-sm leading-relaxed text-purple-100">
              KnowWell is the platform where concise knowledge meets thoughtful feedback. We believe the best buying decisions
              come from authentic experiences and transparent sharing. Join the community to discover top-ranked products,
              publish beautiful K-Notes, and find the gear that fits your life.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-white/10 p-4 shadow-lg">
              <p className="text-3xl font-bold">24K+</p>
              <p className="text-sm text-purple-100">Community members</p>
            </div>
            <div className="rounded-2xl bg-white/10 p-4 shadow-lg">
              <p className="text-3xl font-bold">5K+</p>
              <p className="text-sm text-purple-100">Curated K-Notes</p>
            </div>
            <div className="rounded-2xl bg-white/10 p-4 shadow-lg">
              <p className="text-3xl font-bold">1K+</p>
              <p className="text-sm text-purple-100">Trending rankings</p>
            </div>
            <div className="rounded-2xl bg-white/10 p-4 shadow-lg">
              <p className="text-3xl font-bold">120</p>
              <p className="text-sm text-purple-100">Categories covered</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
