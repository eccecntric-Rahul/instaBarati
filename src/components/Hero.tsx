import { site } from "@/lib/content";
import type { OfferSettings } from "@/lib/cms";

export default function Hero({
  offer,
  heroVideo,
}: {
  offer: OfferSettings;
  heroVideo: string;
}) {
  return (
    <section id="top" className="relative overflow-hidden">
      {/* Pastel wash + floating blobs */}
      <div className="absolute inset-0 bg-gradient-to-br from-butter via-ivory to-powder" />
      <div className="absolute -left-32 top-16 h-96 w-96 rounded-full bg-blush/70 blur-3xl" />
      <div className="absolute -right-24 top-1/3 h-80 w-80 rounded-full bg-powder blur-3xl" />
      <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-gold-light/30 blur-3xl" />
      <div className="absolute inset-0 opacity-[0.5] [background-image:radial-gradient(#d9a84e22_1.5px,transparent_2px)] [background-size:28px_28px]" />

      {/* Mobile: full-bleed background video under a soft ivory veil */}
      <div className="absolute inset-0 lg:hidden">
        <video
          src={heroVideo}
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ivory/85 via-ivory/65 to-ivory/90" />
      </div>

      <div className="relative mx-auto grid min-h-svh w-full max-w-6xl items-center gap-12 px-4 pb-16 pt-28 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8">
        {/* Copy */}
        <div className="text-center lg:text-left">
          {offer.active && (
            <a
              href="#contact"
              className="mb-6 inline-block rounded-full border border-gold/40 bg-white/70 px-4 py-1.5 text-xs font-medium text-navy shadow-sm backdrop-blur transition hover:border-gold sm:text-sm"
            >
              ✨ {offer.text} — {offer.note}
            </a>
          )}

          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-slate sm:text-sm">
            {site.roles[0]}
          </p>

          <h1 className="text-4xl font-bold leading-[1.12] text-navy sm:text-5xl xl:text-6xl">
            Aap mahol banao,
            <span className="font-script mt-3 block text-5xl font-normal leading-[1.15] sm:text-6xl xl:text-7xl">
              <span className="text-gold-gradient">memory hum capture kar lenge</span>
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-base text-slate sm:text-lg lg:mx-0">
            {site.roles[1]} — {site.subTagline.toLowerCase()}.
          </p>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <a
              href="#contact"
              className="w-full max-w-xs rounded-full bg-navy px-8 py-3.5 text-center font-heading text-lg font-semibold text-ivory shadow-lg shadow-navy/25 transition hover:-translate-y-0.5 hover:bg-navy-deep sm:w-auto"
            >
              Book Your Baraati
            </a>
            <a
              href="#portfolio"
              className="w-full max-w-xs rounded-full border border-navy/25 bg-white/60 px-8 py-3.5 text-center font-heading text-lg font-semibold text-navy backdrop-blur transition hover:border-gold hover:text-gold sm:w-auto"
            >
              See Our Work
            </a>
          </div>

        </div>

        {/* Reel frame — desktop only; mobile gets the background video instead */}
        <div className="relative hidden justify-center lg:flex">
          <div className="absolute top-1/2 h-[24rem] w-[24rem] -translate-y-1/2 rounded-full bg-gold-light/40 blur-3xl" />
          <div className="absolute top-1/2 -translate-y-1/2 translate-x-8 -rotate-6">
            <div className="h-[26rem] w-56 rounded-[2rem] bg-gradient-to-b from-blush to-powder sm:h-[30rem] sm:w-64" />
          </div>
          <div className="relative rotate-2 overflow-hidden rounded-[2rem] border-[6px] border-white bg-white shadow-2xl shadow-navy/20 ring-1 ring-line transition duration-500 hover:rotate-0">
            <video
              src={heroVideo}
              autoPlay
              muted
              loop
              playsInline
              className="aspect-[9/16] w-60 object-cover sm:w-72 xl:w-80"
            />
            <span className="absolute left-1/2 top-3 h-1.5 w-14 -translate-x-1/2 rounded-full bg-navy/20" />
            <span className="absolute bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-white/80 px-3.5 py-1.5 text-xs font-medium text-navy shadow-sm backdrop-blur">
              ▶ Straight from a real wedding
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
