"use client";

import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";

export default function FloatingActions({
  phone = "+971503090203",
  whatsapp = "971503090203",
  position = "floating_actions",
}) {
  const waLink = `https://wa.me/${whatsapp}`;
  const telLink = `tel:${phone}`;

  const pushLinkClick = ({ url, type }) => {
    if (typeof window === "undefined") return;

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "link_click",
      variant: "click_url",

      // ✅ ده اللي انت محتاجه (Click URL العادي)
      "Click URL": url,

      // ✅ سيبه كمان احتياطًا (لو فيه Variables تانية بتستخدمه)
      click_url: url,

      click_type: type,
      position,
    });
  };

  const trackAndOpen = (e, url, type) => {
    e.preventDefault();

    pushLinkClick({ url, type });

    setTimeout(() => {
      try {
        if (url.startsWith("tel:")) {
          window.location.href = url;
        } else {
          window.open(url, "_blank", "noopener,noreferrer");
        }
      } catch {
        window.location.href = url;
      }
    }, 150);
  };

  return (
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
        </a>
      </div>
    </div>
  );
}
