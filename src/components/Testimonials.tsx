import { testimonials } from "@/lib/content";
import SectionHeading from "./SectionHeading";

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative overflow-hidden py-16 sm:py-24">
      <div className="absolute inset-0 bg-gradient-to-b from-ivory via-blush/40 to-ivory" />
      <span
        aria-hidden
        className="font-script absolute -top-2 left-4 text-[10rem] leading-none text-gold/15 sm:text-[14rem]"
      >
        “
      </span>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          title={testimonials.heading}
          subtitle="What couples (and their families) say about us."
        />

        {/* Video testimonials — phone-format reels; swipeable on mobile */}
        <div className="-mx-4 mb-14 flex snap-x snap-mandatory items-start gap-6 overflow-x-auto px-6 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:flex-wrap sm:justify-center sm:gap-12 sm:overflow-visible sm:px-0 sm:pb-0">
          {testimonials.videos.map((t) => (
            <figure key={t.video} className="w-60 shrink-0 snap-center sm:w-64 sm:shrink">
              <div className="group relative overflow-hidden rounded-[1.75rem] border-[6px] border-white bg-navy-deep shadow-xl shadow-navy/20 ring-1 ring-line transition hover:ring-gold/50">
                <video
                  src={t.video}
                  poster={t.poster}
                  preload="none"
                  playsInline
                  controls
                  className="aspect-[9/16] w-full object-cover"
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute left-1/2 top-2.5 h-1.5 w-14 -translate-x-1/2 rounded-full bg-navy/20"
                />
              </div>
              <figcaption className="mt-3 text-center">
                <p className="font-script text-3xl text-navy">{t.names}</p>
                <p className="text-xs text-slate">{t.relation}</p>
              </figcaption>
            </figure>
          ))}
        </div>

        {/* Written quotes; swipeable on mobile */}
        <div className="-mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0 md:pb-0">
          {testimonials.items.map((t, i) => (
            <figure
              key={i}
              className="flex w-[82%] shrink-0 snap-center flex-col rounded-3xl border border-line bg-white p-6 shadow-sm shadow-navy/5 transition hover:-translate-y-1 hover:shadow-lg hover:shadow-navy/10 sm:p-7 md:w-auto"
            >
              <div className="flex gap-1 text-gold" aria-hidden>
                {"★★★★★".split("").map((s, j) => (
                  <span key={j} className="text-sm">{s}</span>
                ))}
              </div>
              <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-slate sm:text-base">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3 border-t border-line pt-4">
                <span
                  aria-hidden
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-gold-light to-blush font-heading text-sm font-bold text-navy"
                >
                  {t.names.charAt(0)}
                </span>
                <span>
                  <p className="font-heading font-bold leading-tight text-navy">{t.names}</p>
                  <p className="text-xs text-slate">{t.relation}</p>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
