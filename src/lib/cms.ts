// Server-side content fetchers. The public site pulls editable content from
// Supabase; if the database is unreachable or empty it falls back to the
// static copy in content.ts so the site never renders blank.

import { createClient } from "@supabase/supabase-js";
import { offer as staticOffer, packages as staticPackages, testimonials as staticTestimonials, portfolio as staticPortfolio, heroVideo as staticHeroVideo } from "./content";

export type OfferSettings = { active: boolean; text: string; note: string };
export type TestimonialVideo = {
  names: string;
  relation: string;
  video: string;
  poster: string | null;
};
export type PackageTier = { name: string; features: string[]; highlighted: boolean };
export type TestimonialItem = { names: string; relation: string; quote: string };
export type PortfolioCategory = {
  id: string;
  label: string;
  items: { title: string; video: string; poster: string | null }[];
};

const categoryLabels: Record<string, string> = {
  bts: "BTS Reels",
  fun: "Fun Concepts",
  talking: "Message Reels",
  vendor: "Vendor Reels",
};

function db() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    { auth: { persistSession: false } }
  );
}

export async function getOffer(): Promise<OfferSettings> {
  try {
    const { data } = await db().from("site_settings").select("*").eq("id", 1).maybeSingle();
    if (data) {
      return { active: data.offer_active, text: data.offer_text, note: data.offer_note };
    }
  } catch {}
  return staticOffer;
}

export async function getHeroVideo(): Promise<string> {
  try {
    const { data } = await db().from("site_settings").select("hero_video_url").eq("id", 1).maybeSingle();
    if (data?.hero_video_url) return data.hero_video_url;
  } catch {}
  return staticHeroVideo;
}

export async function getTestimonialVideos(): Promise<TestimonialVideo[]> {
  try {
    const { data } = await db().from("testimonial_videos").select("*").order("sort_order");
    if (data && data.length > 0) {
      return data.map((t) => ({
        names: t.names,
        relation: t.relation,
        video: t.video_url,
        poster: t.poster_url,
      }));
    }
  } catch {}
  return staticTestimonials.videos.map((v) => ({ ...v, poster: v.poster as string | null }));
}

export async function getPackageTiers(): Promise<PackageTier[]> {
  try {
    const { data } = await db().from("packages").select("*").order("sort_order");
    if (data && data.length > 0) {
      return data.map((p) => ({
        name: p.name,
        features: p.features ?? [],
        highlighted: p.highlighted,
      }));
    }
  } catch {}
  return staticPackages.tiers;
}

export async function getTestimonialItems(): Promise<TestimonialItem[]> {
  try {
    const { data } = await db().from("testimonials").select("*").order("sort_order");
    if (data && data.length > 0) {
      return data.map((t) => ({ names: t.names, relation: t.relation, quote: t.quote }));
    }
  } catch {}
  return staticTestimonials.items;
}

export async function getPortfolioCategories(): Promise<PortfolioCategory[]> {
  try {
    const { data } = await db()
      .from("portfolio_items")
      .select("*")
      .order("sort_order");
    if (data && data.length > 0) {
      return Object.keys(categoryLabels)
        .map((id) => ({
          id,
          label: categoryLabels[id],
          items: data
            .filter((item) => item.category === id)
            .map((item) => ({
              title: item.title,
              video: item.video_url,
              poster: item.poster_url,
            })),
        }))
        .filter((c) => c.items.length > 0);
    }
  } catch {}
  return staticPortfolio.categories.map((c) => ({
    id: c.id,
    label: c.label,
    items: c.items.map((i) => ({ title: i.title, video: i.video, poster: i.poster })),
  }));
}
