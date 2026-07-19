import { site } from "@/lib/content";

export default function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(
        "Hi Insta Baraati! I'm interested in wedding content creation. 💍"
      )}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-lg shadow-black/25 transition hover:scale-110"
    >
      <svg width="30" height="30" viewBox="0 0 32 32" fill="#fff" aria-hidden>
        <path d="M16 3C9.4 3 4 8.3 4 14.9c0 2.6.8 5 2.3 7L4 29l7.3-2.2c1.9 1 3.9 1.5 4.7 1.5 6.6 0 12-5.3 12-11.9S22.6 3 16 3zm0 21.8c-1.6 0-3.2-.4-4.6-1.2l-.3-.2-4.3 1.3 1.3-4.1-.2-.3c-1-1.5-1.5-3.3-1.5-5.4 0-5.4 4.3-9.7 9.6-9.7s9.6 4.3 9.6 9.7-4.3 9.9-9.6 9.9zm5.4-7.3c-.3-.2-1.7-.9-2-1s-.5-.2-.7.2-.8 1-.9 1.2-.3.2-.6.1c-.3-.2-1.2-.5-2.4-1.5-.9-.8-1.5-1.8-1.6-2.1s0-.5.1-.6l.4-.5c.2-.2.2-.3.3-.5s.1-.4 0-.5c-.1-.2-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.7-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.7-.5z" />
      </svg>
    </a>
  );
}
