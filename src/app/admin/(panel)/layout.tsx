"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getSupabase } from "@/lib/supabase";

const tabs = [
  { href: "/admin", label: "Enquiries" },
  { href: "/admin/packages", label: "Packages" },
  { href: "/admin/testimonials", label: "Testimonials" },
  { href: "/admin/reels", label: "Reels" },
  { href: "/admin/media", label: "Media" },
  { href: "/admin/offer", label: "Offer" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    getSupabase()
      .auth.getUser()
      .then(({ data }) => {
        if (!data.user) router.replace("/admin/login");
        else setChecking(false);
      });
  }, [router]);

  const signOut = async () => {
    await getSupabase().auth.signOut();
    router.replace("/admin/login");
  };

  if (checking) {
    return (
      <main className="flex min-h-svh items-center justify-center bg-ivory">
        <p className="text-slate">Checking login…</p>
      </main>
    );
  }

  return (
    <main className="min-h-svh bg-ivory pb-16">
      <header className="sticky top-0 z-40 border-b border-line bg-white/85 backdrop-blur">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <Image src="/logo.png" alt="Insta Baraati" width={100} height={80} className="h-10 w-auto" />
            <h1 className="font-heading text-lg font-bold text-navy">Admin</h1>
          </div>
          <button
            onClick={signOut}
            className="rounded-full border border-navy/25 px-4 py-1.5 text-sm font-medium text-navy transition hover:bg-navy hover:text-ivory"
          >
            Sign out
          </button>
        </div>
        <nav className="mx-auto flex max-w-4xl gap-1 overflow-x-auto px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {tabs.map((t) => (
            <Link
              key={t.href}
              href={t.href}
              className={`whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium transition ${
                pathname === t.href
                  ? "bg-navy text-ivory"
                  : "text-slate hover:bg-powder hover:text-navy"
              }`}
            >
              {t.label}
            </Link>
          ))}
        </nav>
      </header>

      <div className="mx-auto max-w-4xl px-4 pt-8">{children}</div>
    </main>
  );
}
