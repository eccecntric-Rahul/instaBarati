"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { getSupabase } from "@/lib/supabase";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
          <input
            type="password"
            required
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border border-line bg-white px-4 py-3 text-navy shadow-sm outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/20"
          />
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
