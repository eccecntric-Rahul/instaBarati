"use client";

import { useEffect, useState } from "react";
import { getSupabase } from "@/lib/supabase";

export default function OfferEditor() {
  const [active, setActive] = useState(true);
  const [text, setText] = useState("");
  const [note, setNote] = useState("");
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    getSupabase()
      .from("site_settings")
      .select("*")
      .eq("id", 1)
      .maybeSingle()
      .then(({ data, error }) => {
        if (error) setStatus(`Couldn’t load: ${error.message} — have you run schema-cms.sql?`);
        else if (data) {
          setActive(data.offer_active);
          setText(data.offer_text);
          setNote(data.offer_note);
        }
      });
  }, []);

  const save = async () => {
    setStatus("Saving…");
    const { error } = await getSupabase()
      .from("site_settings")
      .upsert({ id: 1, offer_active: active, offer_text: text, offer_note: note });
    setStatus(error ? `Save failed: ${error.message}` : "Saved ✓ (live site updates within 5 minutes)");
  };

  return (
    <>
      <h2 className="font-heading text-2xl font-bold text-navy">Offer banner</h2>
      <p className="mt-1 text-sm text-slate">
        Shown at the top of the homepage and above the booking form.
      </p>
      {status && <p className="mt-3 text-sm font-medium text-slate">{status}</p>}

      <div className="mt-6 max-w-xl rounded-2xl border border-line bg-white p-5 shadow-sm shadow-navy/5">
        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={active}
            onChange={(e) => setActive(e.target.checked)}
            className="h-5 w-5 accent-gold"
          />
          <span className="font-medium text-navy">Show the offer on the website</span>
        </label>

        <p className="mt-4 text-xs text-slate">Offer text:</p>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="e.g. Limited-time wedding season discount"
          className="mt-1 w-full rounded-xl border border-line px-4 py-2.5 text-navy outline-none focus:border-gold"
        />

        <p className="mt-4 text-xs text-slate">Small note:</p>
        <input
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="e.g. For limited slots only"
          className="mt-1 w-full rounded-xl border border-line px-4 py-2.5 text-navy outline-none focus:border-gold"
        />

        <div className="mt-5 rounded-xl bg-butter/60 p-3 text-center text-sm text-navy">
          Preview: ✨ {text || "…"} — {note || "…"}
        </div>

        <button
          onClick={save}
          className="mt-5 rounded-full bg-navy px-6 py-2.5 font-medium text-ivory transition hover:bg-navy-deep"
        >
          Save
        </button>
      </div>
    </>
  );
}
