"use client";

import { useRef, useState } from "react";
import { portfolio, site } from "@/lib/content";
import type { PortfolioCategory } from "@/lib/cms";
import SectionHeading from "./SectionHeading";

export default function Portfolio({ categories }: { categories: PortfolioCategory[] }) {
  const [active, setActive] = useState(categories[0]?.id);
  const [playing, setPlaying] = useState<string | null>(null);
  const videoRefs = useRef<Map<string, HTMLVideoElement>>(new Map());

  const category = categories.find((c) => c.id === active) ?? categories[0];
  if (!category) return null;

  // Only one reel plays at a time — starting one pauses the others.
  const onPlay = (src: string) => {
    videoRefs.current.forEach((v, key) => {
      if (key !== src) v.pause();
    });
    setPlaying(src);
  };

  const selectTab = (id: string) => {
    videoRefs.current.forEach((v) => v.pause());
    setPlaying(null);
    setActive(id);
  };

  return (
    <section id="portfolio" className="relative overflow-hidden bg-butter/50 py-16 sm:py-24">
      <div className="absolute -left-24 top-16 h-72 w-72 rounded-full bg-blush/70 blur-3xl" />
      <div className="absolute -right-24 bottom-16 h-72 w-72 rounded-full bg-powder blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading title={portfolio.heading} subtitle={portfolio.subheading} />

        <div className="mb-8 flex flex-wrap justify-center gap-2 sm:gap-3">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => selectTab(c.id)}
              className={`rounded-full px-4 py-2 font-heading text-sm font-semibold transition sm:px-5 sm:text-base ${
                active === c.id
                  ? "bg-navy text-ivory shadow-md shadow-navy/20"
                  : "bg-white/80 text-navy shadow-sm hover:bg-white"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {category.items.map((item) => (
            <figure
              key={item.video}
              className="group relative overflow-hidden rounded-2xl border-4 border-white bg-navy-deep shadow-lg shadow-navy/15"
            >
              <video
                ref={(el) => {
                  if (el) videoRefs.current.set(item.video, el);
                  else videoRefs.current.delete(item.video);
                }}
                src={item.video}
                poster={item.poster ?? undefined}
                preload="none"
                playsInline
                controls={playing === item.video}
                onPlay={() => onPlay(item.video)}
                onEnded={() => setPlaying(null)}
                className="aspect-[9/16] w-full object-cover"
              />
              {playing !== item.video && (
                <button
                  aria-label={`Play ${item.title}`}
                  onClick={() => {
                    const v = videoRefs.current.get(item.video);
                    if (v) {
                      onPlay(item.video);
                      v.play();
                    }
                  }}
                  className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-navy-deep/70 via-transparent to-transparent"
                >
                  <span className="rounded-full bg-white/25 p-4 backdrop-blur transition group-hover:scale-110">
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="#fff" aria-hidden>
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                  <figcaption className="absolute bottom-3 left-3 right-3 text-left">
                    <span className="font-heading text-sm font-semibold text-white sm:text-base">
                      {item.title}
                    </span>
                  </figcaption>
                </button>
              )}
            </figure>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href={site.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-navy px-6 py-3 font-heading font-semibold text-ivory shadow-md shadow-navy/20 transition hover:bg-navy-deep"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <circle cx="12" cy="12" r="4.5" />
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
            </svg>
            More on Instagram — {site.instagramHandle}
          </a>
        </div>
      </div>
    </section>
  );
}
