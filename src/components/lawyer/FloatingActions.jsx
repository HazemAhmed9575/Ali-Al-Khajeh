"use client";

import { useState } from "react";
import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";
import { FaWpforms } from "react-icons/fa6";
import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2";
import { t } from "@/i18n/t";

export default function FloatingActions({
  phone = "+971503090203",
  whatsapp = "971503090203",
  messages,
}) {
  const [open, setOpen] = useState(false);

  const waLink = `https://wa.me/${whatsapp}`;
  const telLink = `tel:${phone}`;

  const scrollToConsultation = () => {
    const section = document.getElementById("consultation");
    if (!section) return;

    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    setOpen(false);
  };

  return (
    <>
      {/* ================= MOBILE ================= */}
      <div className="fixed bottom-5 right-5 z-[99999] md:hidden">
        <div className="flex flex-col items-center gap-3">
          {/* Actions */}
          <div
            className={`flex flex-col gap-3 transition-all duration-300 ${
              open
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4 pointer-events-none"
            }`}
          >
            {/* Form */}
            <button
              onClick={scrollToConsultation}
              className="w-14 h-14 rounded-2xl bg-[#85754E] text-white
              flex items-center justify-center shadow-lg"
            >
              <FaWpforms className="text-[24px]" />
            </button>

       

            {/* Call */}
            <a
              href={telLink}
              className="w-14 h-14 rounded-2xl bg-[#85754E] text-[#0b1220]
              flex items-center justify-center shadow-lg"
            >
              <FaPhoneAlt className="text-[22px]" />
            </a>
          </div>
     {/* WhatsApp */}
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-14 h-14 rounded-2xl bg-[#25D366] text-white
              flex items-center justify-center shadow-lg"
            >
              <FaWhatsapp className="text-[26px]" />
            </a>
          {/* Toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="w-16 h-16 rounded-full bg-[#85754E] text-white
            flex items-center justify-center shadow-xl"
          >
            <HiOutlineChatBubbleLeftRight
              className={`text-[28px] transition-transform ${
                open ? "rotate-12 scale-110" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* ================= DESKTOP LEFT (Form) ================= */}
      <div className="fixed bottom-5 left-5 z-[99999] hidden md:block">
        <button
          onClick={scrollToConsultation}
          className="
            group relative flex items-center gap-3
            px-4 h-14 rounded-2xl
            bg-[#151513] text-white shadow-lg
            hover:bg-[#85754E] transition-all duration-300
          "
          aria-label={t(
            messages,
            "corporateIssues.consulting.cta.ariaLabel"
          )}
        >
          <FaWpforms className="text-[22px]" />
          <span
            className="max-w-0 overflow-hidden group-hover:max-w-[160px]
            transition-all duration-300 whitespace-nowrap"
          >
            {t(messages, "corporateIssues.consulting.cta.label")}
          </span>
        </button>
      </div>

      {/* ================= DESKTOP RIGHT (Form + WhatsApp + Call) ================= */}
      <div className="fixed bottom-5 right-5 z-[99999] hidden md:block">
        <div className="flex flex-col gap-3 items-end">
          {/* Form */}
     

          {/* WhatsApp */}
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center
            w-14 h-14 rounded-2xl bg-[#25D366] text-white
            shadow-lg hover:scale-105 transition-all"
          >
            <FaWhatsapp className="text-[26px]" />
          </a>

          {/* Call */}
          <a
            href={telLink}
            className="flex items-center justify-center
            w-14 h-14 rounded-2xl bg-[#85754E] text-[#0b1220]
            shadow-lg hover:scale-105 transition-all"
          >
            <FaPhoneAlt className="text-[22px]" />
          </a>
        </div>
      </div>
    </>
  );
}
