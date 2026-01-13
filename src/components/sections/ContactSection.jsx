"use client";
import { useEffect, useRef, useState } from "react";
import DoubleFrame from "../ui/DoubleFrame";
import PinsAnimation from "../ui/PinsAnimation";
import { t } from "@/i18n/t";
export default function ContactSection({ messages, locale }) {
  const isRtl = locale === "ar";

  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);


useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="contact" ref={sectionRef} className="relative py-16 md:py-24 bg-white overflow-hidden">
         <div className="absolute inset-0 top-48 z-10 opacity-35 pointer-events-none">
  {isVisible && <PinsAnimation isRtl={isRtl} />}
</div>
      <div className="container mx-auto px-4 md:px-12 lg:px-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <DoubleFrame isRtl={isRtl}>
            <div>
              <h2 className="text-[32px] md:text-[38px] font-semibold text-[#0b0e3e]">
                {t(messages, "contact.title")}
              </h2>

              <div className="mt-4 h-[1px] w-full bg-[#d8a55b]" />

              <form className="mt-10 md:mt-12 space-y-8">
                <input
                  placeholder={t(messages, "contact.name")}
                  className="w-full bg-transparent border-b border-[#e6e8f4] pb-4 text-[#6b7280] outline-none"
                />

                <div className="relative">
                  <select className="w-full appearance-none bg-transparent border-b border-[#e6e8f4] pb-4 text-[#6b7280] outline-none">
                    <option>{t(messages, "contact.subject")}</option>
                    <option>{t(messages, "contact.subjects.familyLaw")}</option>
                    <option>
                      {t(messages, "contact.subjects.personalInjury")}
                    </option>
                    <option>
                      {t(messages, "contact.subjects.criminalLaw")}
                    </option>
                    <option>{t(messages, "contact.subjects.Other")}</option>
                  </select>

                  <span
                    className={`absolute top-1/2 -translate-y-1/2 text-[#8c8fa6] ${
                      isRtl ? "left-2" : "right-2"
                    }`}>
                    ▾
                  </span>
                </div>

                <textarea
                  placeholder={t(messages, "contact.message")}
                  className="w-full bg-transparent border-b border-[#e6e8f4] pb-4 text-[#6b7280] outline-none min-h-[120px] resize-none"
                />

                <button
                  type="button"
                  className="mt-8 inline-flex cursor-pointer items-center justify-center rounded-full bg-[#d8a55b] px-10 py-4 text-[#0b0e3e] font-semibold">
                  {t(messages, "contact.btn")}
                </button>
              </form>
            </div>
          </DoubleFrame>

          <div className="relative">
            <div
              className={`pointer-events-none absolute z-0 select-none hidden md:block
    -top-32 md:-top-40
    ${isRtl ? "-right-10 md:-right-20" : "-left-10 md:-left-20"}
  `}>
              <span className="text-[520px] md:text-[700px] leading-none font-extrabold text-slate-100/70">
                A
              </span>
            </div>

            <div className="relative z-10 pt-10 md:pt-15">
              <div className="w-[110px] h-[6px] bg-[#85754E] mb-6 mx-auto" />

              <h2
                className={`relative z-50 font-serif  text-[#0b0e3e]
                  text-[34px] md:text-[46px] leading-tight
                  ${
                    locale === "ar"
                      ? "text-right lg:translate-x-20 py-3"
                      : "text-left"
                  }
                  lg:-translate-x-20`}>
                {t(messages, "hero.title")}
              </h2>

              <p
                className={`mt-6 text-[#6b7280] leading-8 max-w-[520px] text-xl
                  ${locale === "ar" ? "text-right " : "text-left"}`}>
                {t(messages, "hero.desc")}
              </p>

              <div className="mt-8 flex flex-wrap gap-3 justify-start">
                <span className="px-5 py-2 rounded-full border border-[#d8a55b] text-[#0b0e3e] text-sm font-semibold">
                  {t(messages, "hero.badges.licensed")}
                </span>

                <span className="px-5 py-2 rounded-full border border-[#d8a55b] text-[#0b0e3e] text-sm font-semibold">
                  {t(messages, "hero.badges.confidential")}
                </span>

                <span className="px-5 py-2 rounded-full border border-[#d8a55b] text-[#0b0e3e] text-sm font-semibold">
                  {t(messages, "hero.badges.fast")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
