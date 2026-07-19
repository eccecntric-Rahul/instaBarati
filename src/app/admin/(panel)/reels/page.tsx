"use client";

import { useEffect, useState } from "react";
import { getSupabase } from "@/lib/supabase";
import { capturePoster } from "@/lib/video";

type ReelRow = {
  id: string;
  category: string;
  sort_order: number;
  title: string;
  video_url: string;
  poster_url: string | null;
};

const categories = [
  { id: "bts", label: "BTS Reels" },
  { id: "fun", label: "Fun Concepts" },
  { id: "talking", label: "Message Reels" },
  { id: "vendor", label: "Vendor Reels" },
];

const MAX_MB = 45;

export default function ReelsEditor() {
  const [rows, setRows] = useState<ReelRow[]>([]);
  const [status, setStatus] = useState<string | null>(null);
  const [uploading, setUploading] = useState<string | null>(null);

  const load = async () => {
    const { data, error } = await getSupabase()
      .from("portfolio_items")
      .select("*")
      .order("sort_order");
    if (error) setStatus(`Couldn’t load: ${error.message} — have you run schema-cms.sql?`);
    else setRows(data as ReelRow[]);
  };

  useEffect(() => {
    load();
  }, []);

  const saveTitle = async (row: ReelRow) => {
    const { error } = await getSupabase()
      .from("portfolio_items")
      .update({ title: row.title })
      .eq("id", row.id);
    setStatus(error ? `Save failed: ${error.message}` : "Saved ✓ (live site updates within 5 minutes)");
  };

  const remove = async (row: ReelRow) => {
    if (!confirm(`Remove “${row.title}” from the website?`)) return;
    const { error } = await getSupabase().from("portfolio_items").delete().eq("id", row.id);
    if (error) {
      setStatus(`Delete failed: ${error.message}`);
      return;
    }
    // Clean up uploaded files (seeded /videos/... files live in the repo and are skipped).
    const supabase = getSupabase();
    const paths = [row.video_url, row.poster_url]
      .filter((u): u is string => !!u && u.includes("/reels/"))
      .map((u) => u.split("/reels/")[1]);
    if (paths.length) await supabase.storage.from("reels").remove(paths);
    setRows((prev) => prev.filter((r) => r.id !== row.id));
  };

  const upload = async (category: string, file: File) => {
    if (file.size > MAX_MB * 1024 * 1024) {
      setStatus(
        `“${file.name}” is ${(file.size / 1024 / 1024).toFixed(0)}MB — too big. Please compress it under ${MAX_MB}MB first (WhatsApp-quality exports work great).`
      );
      return;
    }
    setUploading(category);
    setStatus(`Uploading ${file.name}…`);
    try {
      const supabase = getSupabase();
      const stamp = Date.now();
      const ext = file.name.split(".").pop()?.toLowerCase() || "mp4";
      const videoPath = `${category}/${stamp}.${ext}`;

      const { error: upErr } = await supabase.storage.from("reels").upload(videoPath, file, {
        contentType: file.type || "video/mp4",
      });
      if (upErr) throw new Error(upErr.message);
      const videoUrl = supabase.storage.from("reels").getPublicUrl(videoPath).data.publicUrl;

      let posterUrl: string | null = null;
      const poster = await capturePoster(file);
      if (poster) {
        const posterPath = `${category}/${stamp}.jpg`;
        const { error: pErr } = await supabase.storage
          .from("reels")
          .upload(posterPath, poster, { contentType: "image/jpeg" });
        if (!pErr) {
          posterUrl = supabase.storage.from("reels").getPublicUrl(posterPath).data.publicUrl;
        }
      }

      const maxOrder = Math.max(0, ...rows.filter((r) => r.category === category).map((r) => r.sort_order));
      const { error: insErr } = await supabase.from("portfolio_items").insert({
        category,
        sort_order: maxOrder + 1,
        title: file.name.replace(/\.[^.]+$/, "").replace(/[-_]/g, " "),
        video_url: videoUrl,
        poster_url: posterUrl,
      });
      if (insErr) throw new Error(insErr.message);

      setStatus("Uploaded ✓ — edit the title below. Live site updates within 5 minutes.");
      load();
    } catch (err) {
      setStatus(`Upload failed: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setUploading(null);
    }
  };

  return (
    <>
      <h2 className="font-heading text-2xl font-bold text-navy">Reels</h2>
      <p className="mt-1 text-sm text-slate">
        Upload portrait (9:16) videos under {MAX_MB}MB. A thumbnail is created automatically.
      </p>
      {status && <p className="mt-3 text-sm font-medium text-slate">{status}</p>}

      <div className="mt-6 space-y-10">
        {categories.map((cat) => (
          <section key={cat.id}>
            <div className="flex items-center justify-between">
              <h3 className="font-heading text-lg font-bold text-navy">{cat.label}</h3>
              <label
                className={`cursor-pointer rounded-full px-4 py-1.5 text-sm font-medium transition ${
                  uploading === cat.id
                    ? "bg-line text-slate"
                    : "bg-navy text-ivory hover:bg-navy-deep"
                }`}
              >
                {uploading === cat.id ? "Uploading…" : "+ Upload reel"}
                <input
                  type="file"
                  accept="video/mp4,video/quicktime,video/webm"
                  className="hidden"
                  disabled={uploading !== null}
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) upload(cat.id, f);
                    e.target.value = "";
                  }}
                />
              </label>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
              {rows
                .filter((r) => r.category === cat.id)
                .map((row) => (
                  <figure key={row.id} className="rounded-xl border border-line bg-white p-2 shadow-sm">
                    <video
                      src={row.video_url}
                      poster={row.poster_url ?? undefined}
                      preload="none"
                      playsInline
                      controls
                      className="aspect-[9/16] w-full rounded-lg bg-navy-deep object-cover"
                    />
                    <input
                      value={row.title}
                      onChange={(e) =>
                        setRows((prev) =>
                          prev.map((r) => (r.id === row.id ? { ...r, title: e.target.value } : r))
                        )
                      }
                      onBlur={() => saveTitle(rows.find((r) => r.id === row.id)!)}
                      className="mt-2 w-full rounded-lg border border-transparent px-2 py-1 text-sm text-navy outline-none transition focus:border-gold"
                    />
                    <button
                      onClick={() => remove(row)}
                      className="mt-1 w-full rounded-lg py-1 text-xs font-medium text-rose transition hover:bg-blush"
                    >
                      Remove
                    </button>
                  </figure>
                ))}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
