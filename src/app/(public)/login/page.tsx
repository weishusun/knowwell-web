'use client';

import Link from 'next/link';
import { FormEvent, useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const callbackUrl = searchParams.get('callbackUrl') ?? '/';

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    const res = await signIn('credentials', {
      email,
      password,
      redirect: false,
      callbackUrl
    });

    if (res?.error) {
      setError('Invalid credentials.');
      return;
    }

    router.push(callbackUrl);
  };

  return (
    <div className="container-page max-w-xl">
      <div className="card">
        <h1 className="text-2xl font-semibold text-slate-900">Log in</h1>
        <p className="text-sm text-slate-600">Welcome back! Continue sharing what you&apos;re learning.</p>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div className="space-y-2">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              required
              placeholder="you@example.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              required
              placeholder="••••••••"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button type="submit" className="btn-primary w-full">
            Continue
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-slate-600">
          New here?{' '}
          <Link href="/register" className="text-brand-700">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
