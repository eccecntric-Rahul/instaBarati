"use client";

import { useState } from "react";
import { booking, offer, site } from "@/lib/content";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    eventDate: "",
    city: "",
    message: "",
  });
  const [sent, setSent] = useState(false);

  const update = (field: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm({ ...form, [field]: e.target.value });

  // Phase 1: the enquiry opens WhatsApp with a prefilled message.
  // Phase 3 replaces this with Supabase insert + Resend email.
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = encodeURIComponent(
      `Hi Insta Baraati! 👋\n\nI'd love to book you for my wedding.\n\nName: ${form.name}\nPhone: ${form.phone}\nEvent date: ${form.eventDate || "not decided yet"}\nCity: ${form.city}\n\n${form.message}`
    );
    window.open(`https://wa.me/${site.whatsappNumber}?text=${text}`, "_blank");
    setSent(true);
  };

  const inputClass =
    "w-full rounded-xl border border-line bg-white px-4 py-3 text-navy placeholder:text-slate/50 shadow-sm outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/20";

  return (
    <section id="contact" className="relative overflow-hidden py-16 sm:py-24">
      <div className="absolute inset-0 bg-gradient-to-br from-powder via-ivory to-blush" />
      <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-gold-light/30 blur-3xl" />
      <div className="absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-blush blur-3xl" />

      <div className="relative mx-auto max-w-3xl px-4 sm:px-6">
        <div className="text-center">
          {offer.active && (
            <p className="mb-4 inline-block rounded-full border border-gold/40 bg-white/80 px-4 py-1.5 text-xs font-medium text-navy shadow-sm sm:text-sm">
              ✨ {offer.text} ({offer.note})
            </p>
          )}
          <h2 className="font-script text-5xl sm:text-6xl">
            <span className="text-gold-gradient">{booking.heading}</span>
          </h2>
          <p className="mt-4 text-slate sm:text-lg">{booking.subheading}</p>
        </div>

        <form
          onSubmit={submit}
          className="mt-10 grid gap-4 rounded-3xl border border-white bg-white/70 p-6 shadow-xl shadow-navy/10 backdrop-blur sm:grid-cols-2 sm:p-8"
        >
          <input required placeholder="Your name" value={form.name} onChange={update("name")} className={inputClass} />
          <input required type="tel" placeholder="Phone number" value={form.phone} onChange={update("phone")} className={inputClass} />
          <input type="date" aria-label="Event date" value={form.eventDate} onChange={update("eventDate")} className={inputClass} />
          <input required placeholder="Wedding city" value={form.city} onChange={update("city")} className={inputClass} />
          <textarea
            rows={4}
            placeholder="Tell us about your wedding — events, dates, what you have in mind…"
            value={form.message}
            onChange={update("message")}
            className={`${inputClass} sm:col-span-2`}
          />
          <button
            type="submit"
            className="rounded-full bg-navy py-3.5 font-heading text-lg font-semibold text-ivory shadow-lg shadow-navy/25 transition hover:-translate-y-0.5 hover:bg-navy-deep sm:col-span-2"
          >
            Send enquiry on WhatsApp
          </button>
        </form>

        {sent && (
          <p className="mt-4 text-center text-sm font-medium text-navy">
            WhatsApp should have opened with your message — just hit send! 🎉
          </p>
        )}

        <div className="mt-8 flex flex-col items-center justify-center gap-3 text-sm text-slate sm:flex-row sm:gap-6">
          <a
            href={site.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-gold"
          >
            DM us on Instagram → {site.instagramHandle}
          </a>
        </div>
      </div>
    </section>
  );
}
