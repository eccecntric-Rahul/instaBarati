import { different } from "@/lib/content";

export default function Different() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blush/60 via-ivory to-powder/70 py-16 sm:py-24">
      <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-butter blur-3xl" />
      <div className="absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-powder blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-14">
          <h2 className="text-2xl font-bold text-navy sm:text-3xl">
            {different.heading}
          </h2>
          <p className="font-script mt-3 text-4xl sm:text-5xl">
            <span className="text-gold-gradient">{different.subheading}</span>
          </p>
          <div className="mx-auto mt-5 flex items-center justify-center gap-2" aria-hidden>
            <span className="h-px w-12 bg-gold/50" />
            <span className="text-sm text-gold">❖</span>
            <span className="h-px w-12 bg-gold/50" />
          </div>
        </div>

        {/* Mobile: two swipeable slides · md+: side by side */}
        <div className="-mx-4 flex snap-x snap-mandatory gap-6 overflow-x-auto px-4 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:grid md:grid-cols-2 md:overflow-visible md:px-0 md:pb-0">
          <div className="w-[88%] shrink-0 snap-center rounded-3xl border border-white bg-white/75 p-6 shadow-lg shadow-navy/5 backdrop-blur sm:p-8 md:w-auto">
            <h3 className="font-heading text-xl font-bold text-navy">
              {different.usTitle}
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-slate sm:text-base">
              {different.us.map((line, i) => (
                <li key={i} className="flex gap-2.5">
                  <span className="text-gold" aria-hidden>✦</span>
                  {line}
                </li>
              ))}
            </ul>
          </div>

          <div className="w-[88%] shrink-0 snap-center rounded-3xl border border-white bg-white/75 p-6 shadow-lg shadow-navy/5 backdrop-blur sm:p-8 md:w-auto">
            <h3 className="font-heading text-xl font-bold text-navy">
              {different.youTitle}
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-slate sm:text-base">
              {different.you.map((line, i) => (
                <li key={i} className="flex gap-2.5">
                  <span className="text-rose" aria-hidden>♥</span>
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
