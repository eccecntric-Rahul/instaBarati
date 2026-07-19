"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const links = [
  { href: "#services", label: "Services" },
  { href: "#process", label: "Process" },
  { href: "#packages", label: "Packages" },
  { href: "#portfolio", label: "Our Work" },
  { href: "#testimonials", label: "Love Notes" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "bg-white/80 shadow-md shadow-navy/5 backdrop-blur-lg"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2.5 sm:px-6">
        <a href="#top" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="Insta Baraati"
            width={150}
            height={120}
            priority
            className="h-11 w-auto sm:h-12"
          />
        </a>

        <div className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-navy/80 transition hover:text-gold"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            className="rounded-full bg-navy px-5 py-2 text-sm font-semibold text-ivory shadow-md shadow-navy/20 transition hover:bg-navy-deep"
          >
            Book Now
          </a>
        </div>

        <button
          className="p-2 text-navy md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </nav>

      {open && (
        <div className="flex flex-col gap-1 border-t border-line bg-white/90 px-4 pb-4 pt-2 backdrop-blur-lg md:hidden">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-2 py-2 text-navy/85 hover:bg-powder"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-2 rounded-full bg-navy px-4 py-2 text-center font-semibold text-ivory"
          >
            Book Now
          </a>
        </div>
      )}
    </header>
  );
}
