"use client";

import type React from "react";
import { useEffect, useMemo, useState } from "react";
import { signIn } from "next-auth/react";

type TabKey = "email" | "code" | "signup";

interface AuthModalProps {
  open?: boolean;
  onClose?: () => void;
  defaultTab?: TabKey;
}

const tabs: { key: TabKey; label: string }[] = [
  { key: "email", label: "Email address" },
  { key: "code", label: "Verification code" },
  { key: "signup", label: "Sign up" },
];

export function AuthModal({ open = true, onClose, defaultTab = "email" }: AuthModalProps) {
  const [activeTab, setActiveTab] = useState<TabKey>(defaultTab);

  const [emailLogin, setEmailLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loginLoading, setLoginLoading] = useState(false);

  const [codeEmail, setCodeEmail] = useState("");
  const [codeValue, setCodeValue] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [codeError, setCodeError] = useState<string | null>(null);
  const [codeLoading, setCodeLoading] = useState(false);

  const [nameSignup, setNameSignup] = useState("");
  const [emailSignup, setEmailSignup] = useState("");
  const [passwordSignup, setPasswordSignup] = useState("");
  const [signupError, setSignupError] = useState<string | null>(null);
  const [signupLoading, setSignupLoading] = useState(false);

  useEffect(() => {
    setActiveTab(defaultTab);
  }, [defaultTab]);

  const tabCopy = useMemo(
    () => ({
      title:
        activeTab === "email"
          ? "Email address"
          : activeTab === "code"
            ? "Verification code"
            : "Create your account",
      description:
        activeTab === "email"
          ? "Enter your email and password to continue."
          : activeTab === "code"
            ? codeSent
              ? "Enter the code we sent to your email."
              : "Send a login code to your email to sign in."
            : "Sign up to save your progress across devices."
    }),
    [activeTab, codeSent]
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && open) {
        onClose?.();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, open]);

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose?.();
    }
  };

  const handleEmailLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoginError(null);
    setLoginLoading(true);

    try {
      const result = await signIn("credentials", {
        email: emailLogin,
        password: passwordLogin,
        mode: "password",
        redirect: false,
      });

      if (result?.error) {
        setLoginError(result.error);
      } else {
        onClose?.();
      }
    } catch (error) {
      setLoginError(error instanceof Error ? error.message : "Unable to sign in.");
    } finally {
      setLoginLoading(false);
    }
  };

  const handleSendCode = async () => {
    setCodeError(null);
    setCodeLoading(true);

    try {
      const response = await fetch("/api/auth/send-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: codeEmail }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data?.error || "Failed to send verification code.");
      }

      setCodeSent(true);
      setActiveTab("code");
    } catch (error) {
      setCodeError(error instanceof Error ? error.message : "Failed to send verification code.");
    } finally {
      setCodeLoading(false);
    }
  };

  const handleCodeLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setCodeError(null);
    setCodeLoading(true);

    try {
      const verifyResponse = await fetch("/api/auth/verify-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: codeEmail, code: codeValue }),
      });

      if (!verifyResponse.ok) {
        const data = await verifyResponse.json().catch(() => ({}));
        throw new Error(data?.error || "Invalid verification code.");
      }

      const result = await signIn("credentials", {
        email: codeEmail,
        mode: "code",
        redirect: false,
      });

      if (result?.error) {
        setCodeError(result.error);
      } else {
        onClose?.();
      }
    } catch (error) {
      setCodeError(error instanceof Error ? error.message : "Unable to sign in with code.");
    } finally {
      setCodeLoading(false);
    }
  };

  const handleSignup = async (event: React.FormEvent) => {
    event.preventDefault();
    setSignupError(null);
    setSignupLoading(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: nameSignup || undefined, email: emailSignup, password: passwordSignup }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data?.error || "Unable to sign up.");
      }

      const result = await signIn("credentials", {
        email: emailSignup,
        password: passwordSignup,
        mode: "password",
        redirect: false,
      });

      if (result?.error) {
        setSignupError(result.error);
      } else {
        onClose?.();
      }
    } catch (error) {
      setSignupError(error instanceof Error ? error.message : "Unable to sign up.");
    } finally {
      setSignupLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 sm:p-6"
      onClick={handleBackdropClick}
      aria-modal
      role="dialog"
    >
      <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-white/10 bg-black text-white shadow-[0_25px_70px_rgba(0,0,0,0.35)]">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close login dialog"
          className="absolute right-4 top-4 rounded-full bg-white/10 px-2 py-1 text-sm text-gray-300 transition hover:bg-white/20 hover:text-white"
        >
          ×
        </button>

        <div className="flex flex-col items-center gap-2 px-8 pt-8 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-purple-700 text-xl font-bold shadow-lg">
            K
          </div>
          <p className="text-lg font-semibold">KnowWell</p>
          <p className="text-sm text-gray-400">Welcome back, explorer</p>
        </div>

        <div className="mt-8 flex items-center justify-center gap-3 px-8">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 rounded-xl border px-4 py-3 text-sm font-semibold transition ${
                activeTab === tab.key
                  ? "border-purple-500/70 bg-white/10 text-white"
                  : "border-white/5 bg-white/5 text-gray-400 hover:border-white/15 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="mt-8 px-8 pb-10">
          <div className="flex items-start justify-between gap-4 text-sm text-gray-300">
            <div>
              <p className="font-semibold text-white">{tabCopy.title}</p>
              <p className="text-gray-400">{tabCopy.description}</p>
            </div>
            <button type="button" className="text-xs font-semibold text-purple-300 hover:text-purple-200">
              Help
            </button>
          </div>

          {activeTab === "email" && (
            <form onSubmit={handleEmailLogin} className="mt-6 space-y-4">
              <label className="block text-sm text-gray-300">
                <span className="mb-2 block text-xs uppercase tracking-[0.08em] text-gray-400">Email address</span>
                <input
                  type="email"
                  value={emailLogin}
                  onChange={(event) => setEmailLogin(event.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-gray-500 outline-none transition focus:border-purple-500/70"
                  required
                />
              </label>

              <label className="block text-sm text-gray-300">
                <span className="mb-2 block text-xs uppercase tracking-[0.08em] text-gray-400">Password</span>
                <input
                  type="password"
                  value={passwordLogin}
                  onChange={(event) => setPasswordLogin(event.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-gray-500 outline-none transition focus:border-purple-500/70"
                  required
                />
              </label>

              {loginError && <p className="text-sm text-red-400">{loginError}</p>}

              <button
                type="submit"
                disabled={loginLoading}
                className="relative inline-flex w-full items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-purple-500 via-purple-600 to-purple-500 px-6 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-white shadow-lg transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <span className="absolute inset-0 bg-white/10 opacity-0 transition-opacity duration-300 hover:opacity-10" />
              <span className="relative">{loginLoading ? "Logging in..." : "Login"}</span>
            </button>

              <div className="text-center text-sm text-gray-400">
                No account?
                <button
                  type="button"
                  onClick={() => setActiveTab("signup")}
                  className="ml-2 font-semibold text-purple-300 transition hover:text-purple-200"
                >
                  Sign up
                </button>
              </div>
            </form>
          )}

          {activeTab === "code" && (
            <div className="mt-6 space-y-4">
              <label className="block text-sm text-gray-300">
                <span className="mb-2 block text-xs uppercase tracking-[0.08em] text-gray-400">Email address</span>
                <input
                  type="email"
                  value={codeEmail}
                  onChange={(event) => setCodeEmail(event.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-gray-500 outline-none transition focus:border-purple-500/70"
                  required
                />
              </label>

              {!codeSent && (
                <button
                  type="button"
                  onClick={handleSendCode}
                  disabled={codeLoading}
                  className="w-full rounded-xl border border-purple-500/50 bg-purple-600/70 px-4 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-purple-600 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {codeLoading ? "Sending..." : "Send verification code"}
                </button>
              )}

              {codeSent && (
                <form onSubmit={handleCodeLogin} className="space-y-4">
                  <label className="block text-sm text-gray-300">
                    <span className="mb-2 block text-xs uppercase tracking-[0.08em] text-gray-400">Verification code</span>
                    <input
                      type="text"
                      value={codeValue}
                      onChange={(event) => setCodeValue(event.target.value)}
                      placeholder="Enter the code"
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-gray-500 outline-none transition focus:border-purple-500/70"
                      required
                    />
                  </label>

                  {codeError && <p className="text-sm text-red-400">{codeError}</p>}

                  <button
                    type="submit"
                    disabled={codeLoading}
                    className="relative inline-flex w-full items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-purple-500 via-purple-600 to-purple-500 px-6 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-white shadow-lg transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <span className="absolute inset-0 bg-white/10 opacity-0 transition-opacity duration-300 hover:opacity-10" />
                    <span className="relative">{codeLoading ? "Verifying..." : "Login"}</span>
                  </button>
                </form>
              )}

              {codeError && !codeSent && <p className="text-sm text-red-400">{codeError}</p>}
            </div>
          )}

          {activeTab === "signup" && (
            <form onSubmit={handleSignup} className="mt-6 space-y-4">
              <label className="block text-sm text-gray-300">
                <span className="mb-2 block text-xs uppercase tracking-[0.08em] text-gray-400">Name (optional)</span>
                <input
                  type="text"
                  value={nameSignup}
                  onChange={(event) => setNameSignup(event.target.value)}
                  placeholder="Your name"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-gray-500 outline-none transition focus:border-purple-500/70"
                />
              </label>

              <label className="block text-sm text-gray-300">
                <span className="mb-2 block text-xs uppercase tracking-[0.08em] text-gray-400">Email address</span>
                <input
                  type="email"
                  value={emailSignup}
                  onChange={(event) => setEmailSignup(event.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-gray-500 outline-none transition focus:border-purple-500/70"
                  required
                />
              </label>

              <label className="block text-sm text-gray-300">
                <span className="mb-2 block text-xs uppercase tracking-[0.08em] text-gray-400">Password</span>
                <input
                  type="password"
                  value={passwordSignup}
                  onChange={(event) => setPasswordSignup(event.target.value)}
                  placeholder="Create a strong password"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-gray-500 outline-none transition focus:border-purple-500/70"
                  required
                />
              </label>

              {signupError && <p className="text-sm text-red-400">{signupError}</p>}

              <button
                type="submit"
                disabled={signupLoading}
                className="relative inline-flex w-full items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-purple-500 via-purple-600 to-purple-500 px-6 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-white shadow-lg transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <span className="absolute inset-0 bg-white/10 opacity-0 transition-opacity duration-300 hover:opacity-10" />
                <span className="relative">{signupLoading ? "Signing up..." : "Sign up"}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default AuthModal;
