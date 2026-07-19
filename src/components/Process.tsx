import { process } from "@/lib/content";
import SectionHeading from "./SectionHeading";

export default function Process() {
  return (
    <section id="process" className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24">
      <SectionHeading title={process.heading} subtitle={process.subheading} />

      <div className="relative">
        {/* timeline line: left rail on mobile, center spine on lg */}
        <div className="absolute bottom-4 left-5 top-4 w-0.5 bg-gradient-to-b from-gold/15 via-gold/60 to-gold/15 lg:left-1/2 lg:-translate-x-1/2" />

        <ol className="space-y-8 lg:space-y-0">
          {process.steps.map((step, i) => {
            const left = i % 2 === 0;
            return (
              <li key={i} className="relative lg:grid lg:grid-cols-2 lg:gap-16 lg:py-4">
                <span
                  className={`absolute left-5 top-1/2 z-10 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gold font-heading text-sm font-bold text-white shadow-md shadow-gold/40 ring-4 ring-ivory lg:left-1/2 lg:h-12 lg:w-12 lg:text-base`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div
                  className={`ml-12 rounded-2xl border border-line bg-white p-5 shadow-sm shadow-navy/5 transition hover:-translate-y-0.5 hover:border-gold/40 hover:shadow-md sm:p-6 lg:ml-0 ${
                    left
                      ? "lg:col-start-1 lg:mr-4 lg:text-right"
                      : "lg:col-start-2 lg:ml-4"
                  }`}
                >
                  <h3 className="font-heading text-lg font-bold text-navy sm:text-xl">
                    {step.title}
                  </h3>
                  <p className="mt-1 text-sm text-slate sm:text-base">{step.detail}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>

      <p className="mt-12 text-center text-lg text-slate sm:text-xl">
        <span className="font-script text-3xl sm:text-4xl">
          <span className="text-gold-gradient">Shaadi aapki, tension humari</span>
        </span>
        <span className="mt-1 block text-sm">from story to screen in 7 steps</span>
      </p>
    </section>
  );
}
