import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-slate-100 bg-slate-50">
      <div className="container-page flex flex-col gap-4 py-8 text-sm text-slate-600 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2 text-slate-700">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-sm font-semibold text-white">KW</span>
          <span>KnowWell • Crafted for knowledge seekers.</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/">Home</Link>
          <Link href="/notes/new">Create</Link>
          <Link href="/login">Login</Link>
        </div>
      </div>
    </footer>
  );
}
