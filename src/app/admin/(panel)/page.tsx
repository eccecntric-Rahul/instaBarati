"use client";

import { useCallback, useEffect, useState } from "react";
import { getSupabase, type Enquiry } from "@/lib/supabase";

const statusStyles: Record<Enquiry["status"], string> = {
  new: "bg-butter text-navy",
  contacted: "bg-powder text-navy",
  closed: "bg-line text-slate",
};

export default function EnquiriesPage() {
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
    load();
  }, [load]);

  const setStatus = async (id: string, status: Enquiry["status"]) => {
    setEnquiries((prev) => prev.map((e) => (e.id === id ? { ...e, status } : e)));
    const { error } = await getSupabase().from("enquiries").update({ status }).eq("id", id);
    if (error) load();
  };

  const newCount = enquiries.filter((e) => e.status === "new").length;

  return (
    <>
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
          <li key={e.id} className="rounded-2xl border border-line bg-white p-5 shadow-sm shadow-navy/5">
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
    </>
  );
}
