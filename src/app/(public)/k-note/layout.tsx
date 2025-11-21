import type { ReactNode } from 'react';

import { KNoteSidebar } from '@/components/k-note/KNoteSidebar';

export default function KNoteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-gray-50">
      <div className="mx-auto flex min-h-screen max-w-7xl gap-6 px-4 pb-12 pt-10">
        <KNoteSidebar />
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}
