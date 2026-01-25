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
  className="relative overflow-hidden bg-white text-gray-900 min-h-screen lg:h-screen overflow-x-hidden"
>
  <div className="max-w-[1280px] mx-auto flex min-h-screen lg:h-full flex-col lg:flex-row items-stretch">
    
    {/* Left */}
    <div className="flex-none lg:flex-1 px-6 lg:px-10 pt-10 pb-6 lg:py-28 z-10 flex flex-col justify-start lg:justify-center">
      
      {/* Title */}
      <h1 className="text-3xl sm:text-4xl lg:text-6xl font-extrabold leading-[1.15] lg:leading-[1.1] mb-4 lg:mb-6 tracking-tight text-gray-900">
        {titleLines.map((line, idx) => (
          <span key={idx} className="block">
            {line}
          </span>
        ))}
      </h1>

      {/* Desc */}
      <p className="text-[14px] sm:text-[15px] lg:text-base mb-6 lg:mb-10 max-w-xl leading-relaxed text-gray-600">
        {t(messages, "hero.desc")}
      </p>

      {/* Badges */}
      <div className="flex flex-wrap gap-3">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#85754E]/10 border border-[#85754E]/30">
          <span className="size-2 rounded-full bg-[#85754E]" />
          <span className="text-sm font-bold text-[#85754E]">
            {t(messages, "hero.badges.licensed")}
          </span>
        </div>

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 border border-gray-200">
          <span className="size-2 rounded-full bg-gray-500" />
          <span className="text-sm font-bold text-gray-800">
            {t(messages, "hero.badges.confidential")}
          </span>
        </div>

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 border border-gray-200">
          <span className="size-2 rounded-full bg-gray-500" />
          <span className="text-sm font-bold text-gray-800">
            {t(messages, "hero.badges.fast")}
          </span>
        </div>
      </div>
    </div>

    {/* Right Image */}
    <div className="relative w-full flex-1 min-h-[320px] lg:flex-1 overflow-hidden">
      <Image
        src="/images/hero-bg-mobile.03cc67d3.webp"
        alt="Hero Background"
        fill
        priority
        className="object-cover object-top lg:object-center"
      />

      {/* overlay desktop */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/30 to-transparent hidden lg:block" />
    </div>
  </div>
</section>

  );
}
