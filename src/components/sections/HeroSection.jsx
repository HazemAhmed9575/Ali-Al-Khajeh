"use client";

import { t } from "@/i18n/t";
import Image from "next/image";

export default function HeroSection({ messages, locale }) {
  const bgUrl =
    "https://www.alialkhajeh.ae/_next/static/media/hero-bg-mobile.03cc67d3.webp";

  const isRTL = locale === "ar";

  // ✅ title includes \n -> render lines
  const title = t(messages, "hero.title") || "";
  const titleLines = title.split("\n");

  return (
    <section
      id="home"
      dir={isRTL ? "rtl" : "ltr"}
      className="relative overflow-hidden bg-white text-gray-900 h-screen">
      <div className="max-w-[1280px] h-full mx-auto flex flex-col lg:flex-row items-stretch">
        {/* Left */}
        <div className="flex-1 px-6 lg:px-10 py-16 lg:py-28 z-10 flex flex-col justify-center">
          {/* Title */}
          <h1 className="text-4xl lg:text-6xl font-extrabold leading-[1.1] mb-6 tracking-tight text-gray-900">
            {titleLines.map((line, idx) => (
              <span key={idx} className="block">
                {line}
              </span>
            ))}
          </h1>

          {/* Desc */}
          <p className="text-[15px] lg:text-base mb-10 max-w-xl leading-relaxed text-gray-600">
            {t(messages, "hero.desc")}
          </p>

          {/* ✅ Badges بدل Buttons */}
          <div className="flex flex-wrap gap-3">
            {/* Licensed */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#85754E]/10 border border-[#85754E]/30">
              <span className="size-2 rounded-full bg-[#85754E]" />
              <span className="text-sm font-bold text-[#85754E]">
                {t(messages, "hero.badges.licensed")}
              </span>
            </div>

            {/* Confidential */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 border border-gray-200">
              <span className="size-2 rounded-full bg-gray-500" />
              <span className="text-sm font-bold text-gray-800">
                {t(messages, "hero.badges.confidential")}
              </span>
            </div>

            {/* Fast */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 border border-gray-200">
              <span className="size-2 rounded-full bg-gray-500" />
              <span className="text-sm font-bold text-gray-800">
                {t(messages, "hero.badges.fast")}
              </span>
            </div>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex-1 relative w-full">
          <Image
            src="/images/hero-bg-mobile.03cc67d3.webp"
            alt="Hero Background"
            fill
            priority
            className="object-cover object-center"
          />

          {/* overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/30 to-transparent hidden lg:block" />
        </div>
      </div>
    </section>
  );
}
