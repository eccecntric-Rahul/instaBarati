import { packages } from "@/lib/content";
import type { PackageTier } from "@/lib/cms";
import SectionHeading from "./SectionHeading";

export default function Packages({ tiers }: { tiers: PackageTier[] }) {
  return (
    <section id="packages" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
      <SectionHeading title={packages.heading} subtitle={packages.subheading} />

      <div className="grid gap-6 lg:grid-cols-3">
        {tiers.map((tier) => (
          <div
            key={tier.name}
            className={`relative flex flex-col rounded-3xl p-6 sm:p-8 ${
              tier.highlighted
                ? "bg-navy text-ivory shadow-xl shadow-navy/25 lg:-my-3"
                : "border border-line bg-white shadow-sm shadow-navy/5"
            }`}
          >
            {tier.highlighted && (
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-gold px-4 py-1 font-heading text-xs font-bold uppercase tracking-wide text-white">
                Most popular
              </span>
            )}
            <h3
              className={`font-heading text-2xl font-bold ${
                tier.highlighted ? "text-gold-light" : "text-navy"
              }`}
            >
              {tier.name}
            </h3>
            <ul
              className={`mt-5 flex-1 space-y-2.5 text-sm ${
                tier.highlighted ? "text-ivory/90" : "text-slate"
              }`}
            >
              {tier.features.map((f, i) => (
                <li key={i} className="flex gap-2">
                  <span className={tier.highlighted ? "text-gold-light" : "text-gold"} aria-hidden>
                    ✓
                  </span>
                  {f}
                </li>
              ))}
            </ul>
            <a
              href="#contact"
              className={`mt-7 rounded-full py-3 text-center font-heading font-semibold transition ${
                tier.highlighted
                  ? "bg-gold text-white hover:bg-gold-light hover:text-navy"
                  : "border border-navy/30 text-navy hover:bg-navy hover:text-ivory"
              }`}
            >
              Enquire for pricing
            </a>
          </div>
        ))}
      </div>

      <p className="mx-auto mt-8 max-w-3xl text-center text-xs text-slate/80 sm:text-sm">
        {packages.note}
      </p>
    </section>
  );
}
