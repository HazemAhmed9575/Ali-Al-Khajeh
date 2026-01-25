"use client";

import Image from "next/image";
import { FaWhatsapp } from "react-icons/fa";
import { FiPhoneCall } from "react-icons/fi";

export default function LogoContact({
  locale = "en",
  logoSrc = "/images/LOGO-PNG.png",
  whatsappNumber = "971503090203",
  callNumber = "+971503090203",
}) {
  const isRtl = locale === "ar";

  const waLink = `https://wa.me/${whatsappNumber}`;
  const telLink = `tel:${callNumber}`;

  // ✅ unified push
  const pushLinkClick = ({ url, type, position }) => {
    if (typeof window === "undefined") return;

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "link_click",
      variant: "click_url",
      click_url: url,
      click_type: type,       // whatsapp | call
      position: position,     // contact_logo_section
    });
  };

  // ✅ track + open
  const trackAndOpen = (e, url, type) => {
    e.preventDefault();

    pushLinkClick({
      url,
      type,
      position: "contact_logo_section",
    });

    setTimeout(() => {
      if (url.startsWith("tel:")) {
        window.location.href = url; // ✅ call
      } else {
        window.open(url, "_blank", "noopener,noreferrer"); // ✅ whatsapp
      }
    }, 150);
  };

  return (
    <div className="flex flex-col items-center text-center">
      {/* ✅ LOGO IMAGE */}
      <div className="relative w-[320px] sm:w-[420px] md:w-[520px] lg:w-[700px] aspect-[3/1]">
        <Image
          src={logoSrc}
          alt="Logo"
          fill
          priority
          sizes="(max-width: 768px) 320px, (max-width: 1024px) 520px, 700px"
          className="object-contain"
        />
      </div>

      {/* ✅ Buttons under logo */}
      <div className="mt-6 flex flex-col sm:flex-row items-center gap-3 w-full justify-center">
        {/* WhatsApp */}
        <a
          href={waLink}
          target="_blank"
          rel="noreferrer"
          onClick={(e) => trackAndOpen(e, waLink, "whatsapp")}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 h-12 rounded-full bg-[#25D366] text-white text-sm font-bold shadow-sm hover:bg-[#25D366]/85 transition"
          aria-label="WhatsApp"
        >
          <FaWhatsapp className="text-[18px]" />
          {isRtl ? "واتساب" : "WhatsApp"}
        </a>

        {/* Call */}
        <a
          href={telLink}
          onClick={(e) => trackAndOpen(e, telLink, "call")}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 h-12 rounded-full bg-[#85754E] text-white text-sm font-bold shadow-sm hover:bg-[#85754E]/85 transition"
          aria-label="Call"
        >
          <FiPhoneCall className="text-[18px]" />
          {isRtl ? "اتصال" : "Call"}
        </a>
      </div>

      {/* Optional note */}
      <p className="mt-4 text-sm text-gray-500 max-w-md">
        {isRtl
          ? "اختر طريقة التواصل المناسبة لك وسنقوم بالرد فورًا."
          : "Choose your preferred contact method and we’ll respond quickly."}
      </p>
    </div>
  );
}
