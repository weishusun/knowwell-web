import Link from 'next/link';

const navItems = [
  { label: 'Home', href: '/', icon: '🏠' },
  { label: 'Note Manage', href: '/notes', icon: '📝' },
  { label: 'Dashboard', href: '/dashboard', icon: '📊' },
  { label: 'Content Analysis', href: '/analysis', icon: '📈' },
  { label: 'Data', href: '/data', icon: '📂' },
  { label: 'Activity', href: '/activity', icon: '🔔' }
];

export function NoteSidebar() {
  return (
    <aside className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <div className="mb-6 flex justify-center">
        <Link
          href="/notes/new"
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#6d5ae6] px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-[#5a48d6]"
        >
          <span className="text-lg">＋</span>
          Create Note
        </Link>
      </div>
      <nav className="space-y-2 text-sm font-medium text-slate-700">
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="flex items-center gap-3 rounded-xl px-3 py-2 transition hover:bg-slate-100"
          >
            <span className="text-base" aria-hidden>
              {item.icon}
            </span>
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}

export default NoteSidebar;
