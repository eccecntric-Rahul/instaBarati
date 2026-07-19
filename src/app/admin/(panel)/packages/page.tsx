"use client";

import { useEffect, useState } from "react";
import { getSupabase } from "@/lib/supabase";

type PackageRow = {
  id: string;
  sort_order: number;
  name: string;
  features: string[];
  highlighted: boolean;
};

export default function PackagesEditor() {
  const [rows, setRows] = useState<PackageRow[]>([]);
  const [status, setStatus] = useState<string | null>(null);

  const load = async () => {
    const { data, error } = await getSupabase().from("packages").select("*").order("sort_order");
    if (error) setStatus(`Couldn’t load: ${error.message} — have you run schema-cms.sql?`);
    else setRows(data as PackageRow[]);
  };

  useEffect(() => {
    load();
  }, []);

  const update = (id: string, patch: Partial<PackageRow>) =>
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r)));

  const save = async (row: PackageRow) => {
    setStatus("Saving…");
    const { error } = await getSupabase()
      .from("packages")
      .update({
        name: row.name,
        features: row.features.filter((f) => f.trim() !== ""),
        highlighted: row.highlighted,
      })
      .eq("id", row.id);
    setStatus(error ? `Save failed: ${error.message}` : "Saved ✓ (live site updates within 5 minutes)");
  };

  const addPackage = async () => {
    const { error } = await getSupabase().from("packages").insert({
      name: "New package",
      features: ["Edit me"],
      sort_order: rows.length + 1,
    });
    if (!error) load();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this package from the website?")) return;
    const { error } = await getSupabase().from("packages").delete().eq("id", id);
    if (!error) setRows((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <>
      <div className="flex items-baseline justify-between">
        <h2 className="font-heading text-2xl font-bold text-navy">Packages</h2>
        <button
          onClick={addPackage}
          className="rounded-full bg-navy px-4 py-1.5 text-sm font-medium text-ivory transition hover:bg-navy-deep"
        >
          + Add package
        </button>
      </div>
      {status && <p className="mt-3 text-sm font-medium text-slate">{status}</p>}

      <div className="mt-6 space-y-6">
        {rows.map((row) => (
          <div key={row.id} className="rounded-2xl border border-line bg-white p-5 shadow-sm shadow-navy/5">
            <div className="flex flex-wrap items-center gap-3">
              <input
                value={row.name}
                onChange={(e) => update(row.id, { name: e.target.value })}
                className="flex-1 rounded-xl border border-line px-4 py-2.5 font-heading text-lg font-bold text-navy outline-none focus:border-gold"
              />
              <label className="flex items-center gap-2 text-sm text-slate">
                <input
                  type="checkbox"
                  checked={row.highlighted}
                  onChange={(e) => update(row.id, { highlighted: e.target.checked })}
                  className="h-4 w-4 accent-gold"
                />
                “Most popular” badge
              </label>
            </div>
            <p className="mt-3 text-xs text-slate">One feature per line:</p>
            <textarea
              rows={Math.max(4, row.features.length + 1)}
              value={row.features.join("\n")}
              onChange={(e) => update(row.id, { features: e.target.value.split("\n") })}
              className="mt-1 w-full rounded-xl border border-line px-4 py-3 text-sm text-navy outline-none focus:border-gold"
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
