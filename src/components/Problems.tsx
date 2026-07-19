import { problems } from "@/lib/content";

export default function Problems() {
  return (
    <section id="why" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-2xl font-bold leading-snug text-navy sm:text-3xl">
          {problems.heading}
        </h2>
        <p className="font-script mt-4 text-4xl sm:text-5xl">
          <span className="text-gold-gradient">{problems.punchline}</span>
        </p>
      </div>

      <h3 className="mb-8 mt-14 text-center font-heading text-xl font-semibold text-slate sm:text-2xl">
        {problems.solvedHeading}
      </h3>

      {/* Mobile: swipeable carousel · sm+: grid */}
      <ol className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3">
        {problems.items.map((item, i) => (
          <li
            key={i}
            className="w-[80%] shrink-0 snap-center rounded-2xl border border-line bg-white p-6 shadow-sm shadow-navy/5 transition hover:-translate-y-1 hover:shadow-lg hover:shadow-navy/10 sm:w-auto"
          >
            <span className="font-heading text-3xl font-bold text-gold">
              {String(i + 1).padStart(2, "0")}
            </span>
            <p className="mt-2 text-slate">{item.problem}</p>
            <p className="mt-3 font-semibold text-navy">✦ {item.solution}</p>
          </li>
        ))}

        <li className="w-[80%] shrink-0 snap-center rounded-2xl bg-gradient-to-br from-powder to-blush p-6 shadow-sm sm:w-auto">
          <h4 className="font-heading text-lg font-bold text-navy">
            {problems.standsFor.heading}
          </h4>
          <p className="mt-2 text-sm text-navy/75">{problems.standsFor.intro}</p>
          <ul className="mt-3 space-y-2 text-sm text-navy/65">
            {problems.standsFor.points.map((p, i) => (
              <li key={i}>• {p}</li>
            ))}
          </ul>
        </li>
      </ol>
    </section>
  );
}
