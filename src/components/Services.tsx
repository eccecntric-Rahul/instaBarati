import { services } from "@/lib/content";
import SectionHeading from "./SectionHeading";

const icons: Record<string, React.ReactNode> = {
  plan: (
    <>
      <rect x="5" y="4" width="14" height="17" rx="2" />
      <path d="M9 2.5h6v3H9zM9 11h6M9 15h4" />
    </>
  ),
  instagram: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17" cy="7" r="0.6" fill="currentColor" />
    </>
  ),
  camera: (
    <>
      <rect x="2.5" y="7" width="13" height="10" rx="2" />
      <path d="M15.5 10.5l6-3.5v10l-6-3.5" />
    </>
  ),
  clapper: (
    <>
      <rect x="3" y="9.5" width="18" height="10" rx="2" />
      <path d="M3.5 9.5l2.2-5h15l-2.2 5M9 4.8l2.2 4.7M14.5 4.8l2.2 4.7" />
    </>
  ),
  live: (
    <>
      <circle cx="12" cy="12" r="2.6" fill="currentColor" stroke="none" />
      <path d="M6.3 6.3a8 8 0 0 0 0 11.4M17.7 6.3a8 8 0 0 1 0 11.4" />
    </>
  ),
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="16" rx="2" />
      <path d="M3.5 9.5h17M8 2.8V6M16 2.8V6M8 13.5h2M14 13.5h2M8 17h2" />
    </>
  ),
  star: (
    <path d="M12 3l2.7 5.6 6 .8-4.4 4.2 1.1 6-5.4-2.9-5.4 2.9 1.1-6L3.3 9.4l6-.8z" />
  ),
  bolt: <path d="M13 2.5L4.5 14H10l-1 7.5L17.5 10H12l1-7.5z" />,
  people: (
    <>
      <circle cx="8.5" cy="8" r="3.2" />
      <path d="M2.5 20a6 6 0 0 1 12 0" />
      <circle cx="16.5" cy="9" r="2.6" />
      <path d="M15.5 14.6a5.4 5.4 0 0 1 6 4.9" />
    </>
  ),
};

const tints = [
  "from-powder to-white",
  "from-blush to-white",
  "from-butter to-white",
];

export default function Services() {
  return (
    <section id="services" className="relative overflow-hidden bg-powder/50 py-16 sm:py-24">
      <div className="absolute -right-28 -top-28 h-72 w-72 rounded-full bg-butter blur-3xl" />
      <div className="absolute -bottom-28 -left-28 h-72 w-72 rounded-full bg-blush/80 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          title={services.heading}
          subtitle="Everything your wedding needs to live on Instagram — planned, shot, edited and posted."
        />

        <div className="grid gap-3.5 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {services.items.map((s, i) => (
            <div
              key={i}
              className={`group relative flex items-center gap-4 overflow-hidden rounded-2xl border border-white bg-gradient-to-br ${tints[i % 3]} p-4 shadow-sm shadow-navy/5 backdrop-blur transition duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-navy/10 sm:p-5`}
            >
              <span
                aria-hidden
                className="absolute -right-3 -top-5 font-heading text-6xl font-bold text-navy/[0.05] transition group-hover:text-gold/25"
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              <span className="flex h-13 w-13 shrink-0 items-center justify-center rounded-xl bg-white text-gold shadow-md shadow-navy/10 ring-1 ring-line transition duration-300 group-hover:bg-navy group-hover:text-gold-light sm:h-14 sm:w-14">
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  {icons[s.icon]}
                </svg>
              </span>

              <div>
                <h3 className="font-heading text-base font-bold leading-snug text-navy sm:text-lg">
                  {s.title}
                </h3>
                <p className="mt-0.5 text-xs text-slate sm:text-sm">{s.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
