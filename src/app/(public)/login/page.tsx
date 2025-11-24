'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AuthModal from '@/components/auth/AuthModal';

export default function LoginPage() {
  const router = useRouter();
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
    router.push('/');
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-black to-slate-950">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(168,85,247,0.35),transparent_30%),radial-gradient(circle_at_80%_30%,rgba(167,139,250,0.25),transparent_30%)]" />
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative flex min-h-screen items-center justify-center p-6">
        <AuthModal open={open} onClose={handleClose} />
      </div>
    </div>
  );
}
