"use client";

import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";
import { pushDataLayer } from "@/lib/datalayer";

export default function FloatingActions({
  phone = "+971503090203",
  whatsapp = "971503090203",
}) {
  const waLink = `https://wa.me/${whatsapp}`;
  const telLink = `tel:${phone}`;

  const trackAndOpen = (e, url, type) => {
    e.preventDefault();

    // ✅ DataLayer push (exactly what you asked)
    pushDataLayer({
      event: "link_click",
      variant: "click_url",
      click_type: type,        // whatsapp | call  (optional but useful)
      click_url: url,
    });

    setTimeout(() => {
      if (url.startsWith("tel:")) {
        window.location.href = url;
      } else {
        window.open(url, "_blank", "noopener,noreferrer");
      }
    }, 150);
  };

  return (
    <div className="fixed bottom-5 right-5 z-[9999] flex flex-col gap-3">
      {/* WhatsApp */}
      <a
        href={waLink}
        onClick={(e) => trackAndOpen(e, waLink, "whatsapp")}
        target="_blank"
        rel="noreferrer"
        className="group relative flex items-center justify-center w-14 h-14 rounded-2xl bg-[#25D366] text-white shadow-[0_10px_30px_rgba(0,0,0,0.25)] border border-white/15 hover:scale-[1.06] active:scale-[0.98] transition-all duration-300"
        aria-label="WhatsApp"
      >
        <FaWhatsapp className="text-[26px]" />
      </a>

      {/* Call */}
      <a
        href={telLink}
        onClick={(e) => trackAndOpen(e, telLink, "call")}
        className="group relative flex items-center justify-center w-14 h-14 rounded-2xl bg-[#85754E] text-[#0b1220] shadow-[0_10px_30px_rgba(0,0,0,0.25)] border border-white/15 hover:scale-[1.06] active:scale-[0.98] transition-all duration-300"
        aria-label="Call"
      >
        <FaPhoneAlt className="text-[22px]" />
      </a>
    </div>
  );
}
