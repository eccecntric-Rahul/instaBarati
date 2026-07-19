"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { getSupabase, type Enquiry } from "@/lib/supabase";

const statusStyles: Record<Enquiry["status"], string> = {
  new: "bg-butter text-navy",
  contacted: "bg-powder text-navy",
  closed: "bg-line text-slate",
};

export default function AdminDashboard() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loadError, setLoadError] = useState<string | null>(null);

  const load = useCallback(async () => {
    const { data, error } = await getSupabase()
      .from("enquiries")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) setLoadError(error.message);
    else {
      setLoadError(null);
      setEnquiries(data as Enquiry[]);
    }
  }, []);

  useEffect(() => {
    getSupabase()
      .auth.getUser()
      .then(({ data }) => {
        if (!data.user) {
          router.replace("/admin/login");
        } else {
          setChecking(false);
          load();
        }
      });
  }, [router, load]);

  const setStatus = async (id: string, status: Enquiry["status"]) => {
    setEnquiries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, status } : e))
    );
    const { error } = await getSupabase()
      .from("enquiries")
      .update({ status })
      .eq("id", id);
    if (error) load();
  };

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

  const newCount = enquiries.filter((e) => e.status === "new").length;

  return (
    <main className="min-h-svh bg-ivory pb-16">
      <header className="border-b border-line bg-white/80 backdrop-blur">
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
      </header>

      <div className="mx-auto max-w-4xl px-4 pt-8">
        <div className="flex items-baseline justify-between">
          <h2 className="font-heading text-2xl font-bold text-navy">
            Enquiries
            {newCount > 0 && (
              <span className="ml-2 rounded-full bg-gold px-2.5 py-0.5 text-sm font-semibold text-white">
                {newCount} new
              </span>
            )}
          </h2>
          <button onClick={load} className="text-sm text-slate underline-offset-2 hover:underline">
            Refresh
          </button>
        </div>

        {loadError && (
          <p className="mt-6 rounded-xl bg-blush p-4 text-sm text-navy">
            Couldn’t load enquiries: {loadError}
          </p>
        )}

        {!loadError && enquiries.length === 0 && (
          <p className="mt-10 text-center text-slate">
            No enquiries yet. They’ll appear here as soon as someone submits the contact form.
          </p>
        )}

        <ul className="mt-6 space-y-4">
          {enquiries.map((e) => (
            <li
              key={e.id}
              className="rounded-2xl border border-line bg-white p-5 shadow-sm shadow-navy/5"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-heading text-lg font-bold text-navy">{e.name}</p>
                  <p className="mt-0.5 text-sm text-slate">
                    {e.city}
                    {e.event_date &&
                      ` · ${new Date(e.event_date).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}`}
                    {" · "}
                    {new Date(e.created_at).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                    })}
                  </p>
                </div>
                <select
                  value={e.status}
                  onChange={(ev) => setStatus(e.id, ev.target.value as Enquiry["status"])}
                  className={`rounded-full px-3 py-1.5 text-sm font-medium outline-none ${statusStyles[e.status]}`}
                >
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="closed">Closed</option>
                </select>
              </div>
              {e.message && <p className="mt-3 text-sm text-slate">{e.message}</p>}
              <div className="mt-4 flex gap-3 text-sm font-medium">
                <a
                  href={`https://wa.me/91${e.phone.replace(/\D/g, "").slice(-10)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-navy px-4 py-1.5 text-ivory transition hover:bg-navy-deep"
                >
                  WhatsApp
                </a>
                <a
                  href={`tel:${e.phone}`}
                  className="rounded-full border border-navy/25 px-4 py-1.5 text-navy transition hover:bg-powder"
                >
                  Call {e.phone}
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
