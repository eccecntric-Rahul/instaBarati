"use client";

import { useEffect, useState } from "react";
import { getSupabase } from "@/lib/supabase";

type TestimonialRow = {
  id: string;
  sort_order: number;
  names: string;
  relation: string;
  quote: string;
};

export default function TestimonialsEditor() {
  const [rows, setRows] = useState<TestimonialRow[]>([]);
  const [status, setStatus] = useState<string | null>(null);

  const load = async () => {
    const { data, error } = await getSupabase().from("testimonials").select("*").order("sort_order");
    if (error) setStatus(`Couldn’t load: ${error.message} — have you run schema-cms.sql?`);
    else setRows(data as TestimonialRow[]);
  };

  useEffect(() => {
    load();
  }, []);

  const update = (id: string, patch: Partial<TestimonialRow>) =>
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r)));

  const save = async (row: TestimonialRow) => {
    setStatus("Saving…");
    const { error } = await getSupabase()
      .from("testimonials")
      .update({ names: row.names, relation: row.relation, quote: row.quote })
      .eq("id", row.id);
    setStatus(error ? `Save failed: ${error.message}` : "Saved ✓ (live site updates within 5 minutes)");
  };

  const add = async () => {
    const { error } = await getSupabase().from("testimonials").insert({
      names: "Couple’s names",
      relation: "Bride and Groom",
      quote: "Their words…",
      sort_order: rows.length + 1,
    });
    if (!error) load();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this testimonial from the website?")) return;
    const { error } = await getSupabase().from("testimonials").delete().eq("id", id);
    if (!error) setRows((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <>
      <div className="flex items-baseline justify-between">
        <h2 className="font-heading text-2xl font-bold text-navy">Testimonials</h2>
        <button
          onClick={add}
          className="rounded-full bg-navy px-4 py-1.5 text-sm font-medium text-ivory transition hover:bg-navy-deep"
        >
          + Add testimonial
        </button>
      </div>
      {status && <p className="mt-3 text-sm font-medium text-slate">{status}</p>}

      <div className="mt-6 space-y-6">
        {rows.map((row) => (
          <div key={row.id} className="rounded-2xl border border-line bg-white p-5 shadow-sm shadow-navy/5">
            <div className="grid gap-3 sm:grid-cols-2">
              <input
                value={row.names}
                onChange={(e) => update(row.id, { names: e.target.value })}
                placeholder="Names (e.g. Shradha & Tushar)"
                className="rounded-xl border border-line px-4 py-2.5 font-heading font-bold text-navy outline-none focus:border-gold"
              />
              <input
                value={row.relation}
                onChange={(e) => update(row.id, { relation: e.target.value })}
                placeholder="Relation (e.g. Bride and Groom)"
                className="rounded-xl border border-line px-4 py-2.5 text-sm text-navy outline-none focus:border-gold"
              />
            </div>
            <textarea
              rows={4}
              value={row.quote}
              onChange={(e) => update(row.id, { quote: e.target.value })}
              placeholder="Their words…"
              className="mt-3 w-full rounded-xl border border-line px-4 py-3 text-sm text-navy outline-none focus:border-gold"
            />
            <div className="mt-3 flex gap-3">
              <button
                onClick={() => save(row)}
                className="rounded-full bg-navy px-5 py-2 text-sm font-medium text-ivory transition hover:bg-navy-deep"
              >
                Save
              </button>
              <button
                onClick={() => remove(row.id)}
                className="rounded-full border border-rose/40 px-5 py-2 text-sm font-medium text-rose transition hover:bg-blush"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
