"use client";

import { useState } from "react";
import { t } from "@/i18n/t";
import { FiChevronDown } from "react-icons/fi";

export default function Faq({ messages, locale }) {
  const isRtl = locale === "ar";
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: "faq.items.q1.question",
      a: "faq.items.q1.answer",
    },
    {
      q: "faq.items.q2.question",
      a: "faq.items.q2.answer",
    },
    {
      q: "faq.items.q3.question",
      a: "faq.items.q3.answer",
    },
    {
      q: "faq.items.q4.question",
      a: "faq.items.q4.answer",
    },
  ];

  const toggle = (idx) => {
    setOpenIndex((prev) => (prev === idx ? -1 : idx));
  };

  return (
    <section id="faq" className="py-20 md:py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-12 lg:px-32">
        {/* Header */}
        <div className={`text-center mb-12 ${isRtl ? "rtl" : ""}`}>
          <h2 className="text-[#0b0e3e] text-[30px] md:text-[40px] font-serif font-bold">
            {t(messages, "faq.title")}
          </h2>
          <p className="mt-4 text-[#6b7280] text-[16px] md:text-[18px] leading-8 max-w-[720px] mx-auto">
            {t(messages, "faq.subtitle")}
          </p>
        </div>

        {/* Accordion */}
        <div className="max-w-[900px] mx-auto space-y-5">
          {faqs.map((item, idx) => {
            const opened = openIndex === idx;

            return (
              <div
                key={idx}
                className="rounded-2xl border border-[#eef1ff] bg-[#f7f8ff] overflow-hidden"
              >
                {/* Question */}
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className={`w-full flex items-center justify-between gap-4 px-6 md:px-8 py-5 md:py-6 text-[#0b0e3e] font-semibold text-[16px] md:text-[18px] ${
                    isRtl ? "text-right flex-row-reverse" : "text-left"
                  }`}
                >
                  <span>{t(messages, item.q)}</span>

                  <span
                    className={`shrink-0 transition-transform duration-300 ${
                      opened ? "rotate-180" : ""
                    }`}
                  >
                    <FiChevronDown className="text-[22px]" />
                  </span>
                </button>

                {/* Answer */}
                <div
                  className={`grid transition-all duration-300 ${
                    opened ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div
                      className={`px-6 md:px-8 pb-6 md:pb-7 text-[#6b7280] leading-8 ${
                        isRtl ? "text-right" : "text-left"
                      }`}
                    >
                      {t(messages, item.a)}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
