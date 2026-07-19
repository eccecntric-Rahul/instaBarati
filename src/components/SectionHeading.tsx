export default function SectionHeading({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
  dark?: boolean; // legacy prop, ignored in the light theme
}) {
  return (
    <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-14">
      <h2 className="font-script text-5xl text-navy sm:text-6xl">
        <span className="text-gold-gradient">{title}</span>
      </h2>
      {subtitle && <p className="mt-4 text-base text-slate sm:text-lg">{subtitle}</p>}
      <div className="mx-auto mt-5 flex items-center justify-center gap-2" aria-hidden>
        <span className="h-px w-12 bg-gold/50" />
        <span className="text-sm text-gold">❖</span>
        <span className="h-px w-12 bg-gold/50" />
      </div>
    </div>
  );
}
