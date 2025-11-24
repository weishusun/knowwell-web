import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export default async function MePage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect('/login');
  }

  const user = session.user?.id
    ? await prisma.user.findUnique({
        where: { id: session.user.id },
        select: { name: true, email: true, image: true, createdAt: true }
      })
    : null;

  const displayName = user?.name ?? session.user.name ?? 'User';
  const email = user?.email ?? session.user.email ?? '';
  const initial = displayName.charAt(0).toUpperCase();
  const joinDate = user?.createdAt ? user.createdAt.toLocaleDateString() : null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-purple-50/40 to-white">
      <main className="container-page gap-8 pb-16 pt-10">
        <div className="flex flex-col gap-3">
          <h1 className="text-3xl font-bold text-slate-900">My Account</h1>
          <p className="text-base text-slate-600">Manage your KnowWell profile and quickly jump back into your work.</p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="card col-span-2 flex flex-col gap-6">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 text-2xl font-semibold text-purple-700">
                {initial}
              </div>
              <div className="space-y-1">
                <div className="text-lg font-semibold text-slate-900">{displayName}</div>
                {email ? <div className="text-sm text-muted-foreground">{email}</div> : null}
                {joinDate ? <div className="text-sm text-muted-foreground">Joined {joinDate}</div> : null}
              </div>
            </div>
            <div className="rounded-2xl border border-purple-100 bg-purple-50/50 p-4 text-sm text-slate-700">
              Keep your profile details up to date so we can personalize your KnowWell experience.
            </div>
          </div>

          <div className="card space-y-4">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Quick links</h2>
              <p className="text-sm text-muted-foreground">Jump to the places you use most.</p>
            </div>
            <div className="flex flex-col gap-3">
              <Link href="/dashboard/k-note" className="btn-primary flex items-center justify-center gap-2">
                My K-Notes
              </Link>
              <Link href="/dashboard/k-note/new" className="btn-secondary flex items-center justify-center gap-2">
                Create K-Note
              </Link>
              <button
                type="button"
                disabled
                className="btn-secondary flex items-center justify-center gap-2 opacity-60 hover:opacity-60"
              >
                My Reviews (coming soon)
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
