"use client";

import { useEffect, useState } from "react";
import { getSupabase } from "@/lib/supabase";
import { capturePoster } from "@/lib/video";

type TestimonialVideoRow = {
  id: string;
  sort_order: number;
  names: string;
  relation: string;
  video_url: string;
  poster_url: string | null;
};

const MAX_MB = 45;
const HERO_RECOMMENDED_MB = 10;

export default function MediaEditor() {
  const [heroUrl, setHeroUrl] = useState<string | null>(null);
  const [videos, setVideos] = useState<TestimonialVideoRow[]>([]);
  const [status, setStatus] = useState<string | null>(null);
  const [uploading, setUploading] = useState<"hero" | "testimonial" | null>(null);

  const load = async () => {
    const supabase = getSupabase();
    const [{ data: settings }, { data: tv, error }] = await Promise.all([
      supabase.from("site_settings").select("hero_video_url").eq("id", 1).maybeSingle(),
      supabase.from("testimonial_videos").select("*").order("sort_order"),
    ]);
    if (error) {
      setStatus(`Couldn’t load: ${error.message} — have you run schema-media.sql?`);
      return;
    }
    setHeroUrl(settings?.hero_video_url ?? null);
    setVideos((tv as TestimonialVideoRow[]) ?? []);
  };

  useEffect(() => {
    load();
  }, []);

  const uploadToStorage = async (folder: string, file: File) => {
    const supabase = getSupabase();
    const stamp = Date.now();
    const ext = file.name.split(".").pop()?.toLowerCase() || "mp4";
    const videoPath = `${folder}/${stamp}.${ext}`;
    const { error } = await supabase.storage.from("reels").upload(videoPath, file, {
      contentType: file.type || "video/mp4",
    });
    if (error) throw new Error(error.message);
    const videoUrl = supabase.storage.from("reels").getPublicUrl(videoPath).data.publicUrl;

    let posterUrl: string | null = null;
    const poster = await capturePoster(file);
    if (poster) {
      const posterPath = `${folder}/${stamp}.jpg`;
      const { error: pErr } = await supabase.storage
        .from("reels")
        .upload(posterPath, poster, { contentType: "image/jpeg" });
      if (!pErr) posterUrl = supabase.storage.from("reels").getPublicUrl(posterPath).data.publicUrl;
    }
    return { videoUrl, posterUrl };
  };

  const uploadHero = async (file: File) => {
    if (file.size > MAX_MB * 1024 * 1024) {
      setStatus(`File is too big (max ${MAX_MB}MB).`);
      return;
    }
    if (file.size > HERO_RECOMMENDED_MB * 1024 * 1024) {
      if (
        !confirm(
          `This file is ${(file.size / 1024 / 1024).toFixed(0)}MB. The hero video auto-plays for every visitor, so under ${HERO_RECOMMENDED_MB}MB is strongly recommended. Upload anyway?`
        )
      )
        return;
    }
    setUploading("hero");
    setStatus("Uploading hero video…");
    try {
      const { videoUrl } = await uploadToStorage("hero", file);
      const { error } = await getSupabase()
        .from("site_settings")
        .upsert({ id: 1, hero_video_url: videoUrl });
      if (error) throw new Error(error.message);
      setHeroUrl(videoUrl);
      setStatus("Hero video updated ✓ (live site updates within 5 minutes)");
    } catch (err) {
      setStatus(`Upload failed: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setUploading(null);
    }
  };

  const resetHero = async () => {
    if (!confirm("Go back to the original hero video?")) return;
    const { error } = await getSupabase()
      .from("site_settings")
      .upsert({ id: 1, hero_video_url: null });
    if (!error) {
      setHeroUrl(null);
      setStatus("Reset to the original hero video ✓");
    }
  };

  const uploadTestimonial = async (file: File) => {
    if (file.size > MAX_MB * 1024 * 1024) {
      setStatus(`File is too big (max ${MAX_MB}MB). Please compress it first.`);
      return;
    }
    setUploading("testimonial");
    setStatus("Uploading testimonial video…");
    try {
      const { videoUrl, posterUrl } = await uploadToStorage("testimonials", file);
      const maxOrder = Math.max(0, ...videos.map((v) => v.sort_order));
      const { error } = await getSupabase().from("testimonial_videos").insert({
        sort_order: maxOrder + 1,
        names: "New testimonial",
        relation: "Edit name & relation below",
        video_url: videoUrl,
        poster_url: posterUrl,
      });
      if (error) throw new Error(error.message);
      setStatus("Uploaded ✓ — edit the name below. Live site updates within 5 minutes.");
      load();
    } catch (err) {
      setStatus(`Upload failed: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setUploading(null);
    }
  };

  const updateVideo = (id: string, patch: Partial<TestimonialVideoRow>) =>
    setVideos((prev) => prev.map((v) => (v.id === id ? { ...v, ...patch } : v)));

  const saveVideo = async (row: TestimonialVideoRow) => {
    const { error } = await getSupabase()
      .from("testimonial_videos")
      .update({ names: row.names, relation: row.relation })
      .eq("id", row.id);
    setStatus(error ? `Save failed: ${error.message}` : "Saved ✓");
  };

  const removeVideo = async (row: TestimonialVideoRow) => {
    if (!confirm(`Remove “${row.names}” from the website?`)) return;
    const { error } = await getSupabase().from("testimonial_videos").delete().eq("id", row.id);
    if (error) {
      setStatus(`Delete failed: ${error.message}`);
      return;
    }
    const paths = [row.video_url, row.poster_url]
      .filter((u): u is string => !!u && u.includes("/reels/"))
      .map((u) => u.split("/reels/")[1]);
    if (paths.length) await getSupabase().storage.from("reels").remove(paths);
    setVideos((prev) => prev.filter((v) => v.id !== row.id));
  };

  return (
    <>
      <h2 className="font-heading text-2xl font-bold text-navy">Media</h2>
      {status && <p className="mt-3 text-sm font-medium text-slate">{status}</p>}

      {/* Hero video */}
      <section className="mt-6 rounded-2xl border border-line bg-white p-5 shadow-sm shadow-navy/5">
        <h3 className="font-heading text-lg font-bold text-navy">Hero background video</h3>
        <p className="mt-1 text-sm text-slate">
          Plays automatically behind the main heading. Keep it short and under{" "}
          {HERO_RECOMMENDED_MB}MB — every visitor downloads it.
        </p>
        <div className="mt-4 flex flex-wrap items-start gap-5">
          <video
            key={heroUrl ?? "default"}
            src={heroUrl ?? "/videos/hero.mp4"}
            muted
            loop
            playsInline
            autoPlay
            className="aspect-[9/16] w-40 rounded-xl bg-navy-deep object-cover"
          />
          <div className="flex flex-col gap-3">
            <label
              className={`cursor-pointer rounded-full px-5 py-2 text-center text-sm font-medium transition ${
                uploading === "hero" ? "bg-line text-slate" : "bg-navy text-ivory hover:bg-navy-deep"
              }`}
            >
              {uploading === "hero" ? "Uploading…" : "Upload new hero video"}
              <input
                type="file"
                accept="video/mp4,video/quicktime,video/webm"
                className="hidden"
                disabled={uploading !== null}
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) uploadHero(f);
                  e.target.value = "";
                }}
              />
            </label>
            {heroUrl && (
              <button
                onClick={resetHero}
                className="rounded-full border border-navy/25 px-5 py-2 text-sm font-medium text-navy transition hover:bg-powder"
              >
                Reset to original
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Video testimonials */}
      <section className="mt-8">
        <div className="flex items-center justify-between">
          <h3 className="font-heading text-lg font-bold text-navy">Video testimonials</h3>
          <label
            className={`cursor-pointer rounded-full px-4 py-1.5 text-sm font-medium transition ${
              uploading === "testimonial"
                ? "bg-line text-slate"
                : "bg-navy text-ivory hover:bg-navy-deep"
            }`}
          >
            {uploading === "testimonial" ? "Uploading…" : "+ Upload video"}
            <input
              type="file"
              accept="video/mp4,video/quicktime,video/webm"
              className="hidden"
              disabled={uploading !== null}
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) uploadTestimonial(f);
                e.target.value = "";
              }}
            />
          </label>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {videos.map((row) => (
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
                value={row.names}
                onChange={(e) => updateVideo(row.id, { names: e.target.value })}
                onBlur={() => saveVideo(videos.find((v) => v.id === row.id)!)}
                placeholder="Name"
                className="mt-2 w-full rounded-lg border border-transparent px-2 py-1 text-sm font-semibold text-navy outline-none transition focus:border-gold"
              />
              <input
                value={row.relation}
                onChange={(e) => updateVideo(row.id, { relation: e.target.value })}
                onBlur={() => saveVideo(videos.find((v) => v.id === row.id)!)}
                placeholder="Relation (e.g. Bride’s Sister)"
                className="w-full rounded-lg border border-transparent px-2 py-1 text-xs text-slate outline-none transition focus:border-gold"
              />
              <button
                onClick={() => removeVideo(row)}
                className="mt-1 w-full rounded-lg py-1 text-xs font-medium text-rose transition hover:bg-blush"
              >
                Remove
              </button>
            </figure>
          ))}
        </div>
      </section>
    </>
  );
}
