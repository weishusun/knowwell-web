import Link from 'next/link';

export function SiteFooter() {
  return (
    <footer className="mt-16 bg-gradient-to-r from-[#4b2fb5] via-[#6a3ccf] to-[#8d52ff] text-white">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-12 lg:grid-cols-[1.1fr,1fr,1fr] lg:px-0">
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-lg font-semibold">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-lg font-bold">K</span>
            <span className="text-xl font-bold">KnowWell</span>
          </div>
          <p className="text-sm leading-relaxed text-white/80">
            KnowWell is a new friend for every new experience. We gather and amplify authentic voices to guide better decisions
            for modern consumers.
          </p>
          <div className="space-y-2 text-sm text-white/80">
            <p className="font-semibold text-white">Contact:</p>
            <p>jingxuanjiang@knowwell.org</p>
            <p>janengu@knowwell.org</p>
            <p>jingxuanjiang@knowwell.org</p>
          </div>
        </div>

        <div>
          <h3 className="mb-3 text-lg font-semibold">Newsletter</h3>
          <p className="text-sm text-white/80">
            Subscribe for product trends, featured reviews, and ranking updates.
          </p>
          <form className="mt-4 flex flex-col gap-3 sm:flex-row">
            <input
              type="email"
              placeholder="Enter your email"
              className="h-12 w-full rounded-full border border-white/30 bg-white/10 px-4 text-sm text-white placeholder:text-purple-100 focus:border-white focus:ring-0"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-full bg-white px-5 py-2 text-sm font-semibold text-purple-700 shadow-md transition hover:bg-purple-50"
            >
              Subscribe
            </button>
          </form>
        </div>

        <div className="grid grid-cols-2 gap-6 text-sm">
          <div className="space-y-2">
            <h4 className="text-base font-semibold text-white">Explore</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/whats-new" className="text-white/90 hover:text-white">
                  What's New
                </Link>
              </li>
              <li>
                <Link href="/k-ranking" className="text-white/90 hover:text-white">
                  K-Ranking
                </Link>
              </li>
              <li>
                <Link href="/k-note" className="text-white/90 hover:text-white">
                  K-Note
                </Link>
              </li>
              <li>
                <Link href="/smart-buy" className="text-white/90 hover:text-white">
                  Smart Buy
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-2">
            <h4 className="text-base font-semibold text-white">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/business" className="text-white/90 hover:text-white">
                  To Business
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="text-white/90 hover:text-white">
                  Write a review
                </Link>
              </li>
              <li>
                <Link href="/" className="text-white/90 hover:text-white">
                  About KnowWell
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-white/90 hover:text-white">
                  Privacy & Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-white/20 py-4 text-center text-xs text-purple-100">
        © {new Date().getFullYear()} KnowWell. All rights reserved.
      </div>
    </footer>
  );
}
