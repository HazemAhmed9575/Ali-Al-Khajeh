"use client";

import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";

/**
 * ✅ FloatingActions (SAFE)
 * - Works with GTM DataLayer
 * - event: link_click
 * - variant: click_url
 * - opens WhatsApp / Call after tracking
 * - prevents layout bugs by using isolated z-index + pointer-events
 */
export default function FloatingActions({
  phone = "+971503090203",
  whatsapp = "971503090203", // بدون +
  position = "floating_actions",
}) {
  const waLink = `https://wa.me/${whatsapp}`;
  const telLink = `tel:${phone}`;

  // ✅ unified push
  const pushLinkClick = ({ url, type }) => {
    if (typeof window === "undefined") return;

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "link_click",
      variant: "click_url",
      click_url: url,
      click_type: type, // whatsapp | call
      position,
    });
  };

  // ✅ track + open safely
  const trackAndOpen = (e, url, type) => {
    e.preventDefault();

    // Push to GTM
    pushLinkClick({ url, type });

    // ✅ open after 150ms (enough for GTM)
    setTimeout(() => {
      try {
        if (url.startsWith("tel:")) {
          window.location.href = url;
        } else {
          window.open(url, "_blank", "noopener,noreferrer");
        }
      } catch (err) {
        // fallback
        window.location.href = url;
      }
    }, 150);
  };

  return (
    // ✅ IMPORTANT: pointer-events-none on wrapper, pointer-events-auto on buttons
    <div className="fixed bottom-5 right-5 z-[99999] pointer-events-none">
      <div className="flex flex-col gap-3 pointer-events-auto">
        {/* WhatsApp */}
        <a
          href={waLink}
          onClick={(e) => trackAndOpen(e, waLink, "whatsapp")}
          className="group relative flex items-center justify-center w-14 h-14 rounded-2xl bg-[#25D366] text-white
          shadow-[0_10px_30px_rgba(0,0,0,0.25)] border border-white/15
          hover:scale-[1.06] active:scale-[0.98] transition-all duration-300 cursor-pointer"
          aria-label="WhatsApp"
        >
          <FaWhatsapp className="text-[26px]" />

          {/* Tooltip Desktop only */}
          <span
            className="pointer-events-none absolute hidden lg:block
            right-[70px] top-1/2 -translate-y-1/2 whitespace-nowrap
            rounded-xl bg-[#0b1220] text-white/90 px-3 py-1.5 text-xs
            border border-white/10 opacity-0 translate-x-2
            group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
          >
            WhatsApp
          </span>
        </a>

        {/* Call */}
        <a
          href={telLink}
          onClick={(e) => trackAndOpen(e, telLink, "call")}
          className="group relative flex items-center justify-center w-14 h-14 rounded-2xl bg-[#85754E] text-[#0b1220]
          shadow-[0_10px_30px_rgba(0,0,0,0.25)] border border-white/15
          hover:scale-[1.06] active:scale-[0.98] transition-all duration-300 cursor-pointer"
          aria-label="Call"
        >
          <FaPhoneAlt className="text-[22px]" />

          {/* Tooltip Desktop only */}
          <span
            className="pointer-events-none absolute hidden lg:block
            right-[70px] top-1/2 -translate-y-1/2 whitespace-nowrap
            rounded-xl bg-[#0b1220] text-white/90 px-3 py-1.5 text-xs
            border border-white/10 opacity-0 translate-x-2
            group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
          >
            Call now
          </span>
        </a>
      </div>
    </div>
  );
}
