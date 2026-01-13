"use client";

import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";

export default function FloatingActions({
  phone = "+971503090203",
  whatsapp = "971503090203", // بدون +
}) {
  const waLink = `https://wa.me/${whatsapp}`;
  const telLink = `tel:${phone}`;

  return (
    <div className="fixed bottom-5 right-5 z-[9999] flex flex-col gap-3">
      {/* WhatsApp */}
      <a
        href={waLink}
        target="_blank"
        rel="noreferrer"
        className="group relative flex items-center justify-center  w-14 h-14 rounded-2xl bg-[#25D366] text-white shadow-[0_10px_30px_rgba(0,0,0,0.25)] border border-white/15 hover:scale-[1.06] active:scale-[0.98] transition-all duration-300"
        aria-label="WhatsApp"
      >
        <FaWhatsapp className="text-[26px]" />

        {/* Tooltip */}
        <span
          className="pointer-events-none absolute right-[70px] top-1/2 -translate-y-1/2  whitespace-nowrap rounded-xl bg-[#0b1220] text-white/90 px-3 py-1.5 text-xs border border-white/10 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
        >
          WhatsApp
        </span>
      </a>

      {/* Call */}
      <a
        href={telLink}
        className="group relative flex items-center justify-center w-14 h-14 rounded-2xl bg-[#85754E] text-[#0b1220] shadow-[0_10px_30px_rgba(0,0,0,0.25)] border border-white/15 hover:scale-[1.06] active:scale-[0.98] transition-all duration-300"
        aria-label="Call"
      >
        <FaPhoneAlt className="text-[22px]" />

        {/* Tooltip */}
        <span
          className="pointer-events-none absolute right-[70px] top-1/2 -translate-y-1/2 whitespace-nowrap rounded-xl bg-[#0b1220] text-white/90 px-3 py-1.5 text-xs border border-white/10 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
        >
          Call now
        </span>
      </a>
    </div>
  );
}
