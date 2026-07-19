import Image from "next/image";
import { site } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-white/60 px-4 py-10 text-center backdrop-blur">
      <Image
        src="/logo.png"
        alt="Insta Baraati"
        width={150}
        height={120}
        className="mx-auto h-14 w-auto"
      />
      <p className="font-script mt-3 text-3xl text-navy">Insta Baraati</p>
      <p className="mt-1 text-xs text-slate">{site.subTagline}</p>
      <p className="mt-5 text-xs text-slate/70">
        © {new Date().getFullYear()} {site.name}. All rights reserved.
      </p>
      <p className="mt-2 text-xs text-slate/70">
        Made with{" "}
        <span aria-label="love" className="text-rose">
          ♥
        </span>{" "}
        by{" "}
        <a
          href="https://www.linkedin.com/in/rahulkumar-webdev/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-navy underline-offset-2 transition hover:text-gold hover:underline"
        >
          Rahul Kumar
        </a>
      </p>
    </footer>
  );
}
