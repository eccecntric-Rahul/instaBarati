"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { getSupabase } from "@/lib/supabase";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { error } = await getSupabase().auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);
    if (error) {
      setError("Wrong email or password. Try again.");
      return;
    }
    router.replace("/admin");
  };

  return (
    <main className="flex min-h-svh items-center justify-center bg-gradient-to-br from-powder via-ivory to-blush px-4">
      <div className="w-full max-w-sm rounded-3xl border border-white bg-white/80 p-8 shadow-xl shadow-navy/10 backdrop-blur">
        <Image
          src="/logo.png"
          alt="Insta Baraati"
          width={150}
          height={120}
          className="mx-auto h-16 w-auto"
        />
        <h1 className="mt-4 text-center font-heading text-xl font-bold text-navy">
          Admin login
        </h1>
        <form onSubmit={submit} className="mt-6 grid gap-3">
          <input
            type="email"
            required
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-line bg-white px-4 py-3 text-navy shadow-sm outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/20"
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              required
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-line bg-white px-4 py-3 pr-12 text-navy shadow-sm outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/20"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate transition hover:text-navy"
            >
              {showPassword ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M17.94 17.94A10.4 10.4 0 0 1 12 19.5c-5.5 0-9.3-4.5-10.5-7.5a12.3 12.3 0 0 1 4.06-5.19M9.9 4.74A10.6 10.6 0 0 1 12 4.5c5.5 0 9.3 4.5 10.5 7.5a12.5 12.5 0 0 1-2.67 3.95" />
                  <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                  <path d="M2 2l20 20" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M1.5 12S5.5 4.5 12 4.5 22.5 12 22.5 12 18.5 19.5 12 19.5 1.5 12 1.5 12z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </button>
          </div>
          {error && <p className="text-sm font-medium text-rose">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="rounded-full bg-navy py-3 font-heading font-semibold text-ivory shadow-lg shadow-navy/25 transition hover:bg-navy-deep disabled:opacity-60"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </main>
  );
}
