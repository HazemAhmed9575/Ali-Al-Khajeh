"use client";

import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";
import { FaWpforms } from "react-icons/fa6";
import { t } from "@/i18n/t";

export default function FloatingActions({
  phone = "+971503090203",
  whatsapp = "971503090203",
  messages={messages}
}) {
  const waLink = `https://wa.me/${whatsapp}`;
  const telLink = `tel:${phone}`;

  const scrollToConsultation = () => {
    const section = document.getElementById("consultation");
    if (!section) return;

    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <>
      {/* 👉 Form Icon (LEFT) */}
      <div className="fixed bottom-5 left-5 z-[99999]">
    <button
  onClick={scrollToConsultation}
  className="group relative flex items-center gap-3 px-4 h-14 rounded-2xl
  bg-[#151513] text-white shadow-lg
  hover:bg-[#85754E] transition-all duration-300"
  aria-label={t(
    messages,
    "corporateIssues.consulting.cta.ariaLabel",
  )}
>
  <FaWpforms className="text-[22px]" />

  {/* Hover Text */}
  <span className="max-w-0 overflow-hidden group-hover:max-w-[160px] transition-all duration-300 whitespace-nowrap">
    {t(messages, "corporateIssues.consulting.cta.label")}
  </span>
</button>
      </div>

      {/* 👉 WhatsApp + Call (RIGHT) */}
      <div className="fixed bottom-5 right-5 z-[99999]">
        <div className="flex flex-col gap-3">
          {/* WhatsApp */}
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-14 h-14 rounded-2xl bg-[#25D366] text-white
            shadow-lg hover:scale-105 transition-all"
            aria-label="WhatsApp"
          >
            <FaWhatsapp className="text-[26px]" />
          </a>

          {/* Call */}
          <a
            href={telLink}
            className="flex items-center justify-center w-14 h-14 rounded-2xl bg-[#85754E] text-[#0b1220]
            shadow-lg hover:scale-105 transition-all"
            aria-label="Call"
          >
            <FaPhoneAlt className="text-[22px]" />
          </a>
        </div>
      </div>
    </>
  );
}
