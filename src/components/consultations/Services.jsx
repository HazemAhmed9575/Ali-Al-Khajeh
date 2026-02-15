"use client";

import { t } from "@/i18n/t";
import {
  FaScaleBalanced,
  FaPeopleRoof,
  FaShieldHalved,
  FaIndustry,
} from "react-icons/fa6";

export default function Services({ messages, locale }) {
  const isRtl = locale === "ar";

  const services = [
    {
      icon: FaScaleBalanced,
      titleKey: "consultations.services.items.business.title",
      descKey: "consultations.services.items.business.desc",
    },
    {
      icon: FaPeopleRoof,
      titleKey: "consultations.services.items.family.title",
      descKey: "consultations.services.items.family.desc",
    },
    {
      icon: FaShieldHalved,
      titleKey: "consultations.services.items.insurance.title",
      descKey: "consultations.services.items.insurance.desc",
    },
    {
      icon: FaIndustry,
      titleKey: "consultations.services.items.industrial.title",
      descKey: "consultations.services.items.industrial.desc",
    },
  ];

  return (
    <section id="services" className="relative py-20 md:py-28 overflow-hidden">
      {/* BG */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-center bg-cover"
          style={{ backgroundImage: "url(/images/practice1-bg.jpg)" }}
        />
        <div className="absolute inset-0 bg-[#000]/85" />
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-12 lg:px-20">
        {/* Title */}
        <div className="text-center mb-14">
          <h2 className="text-[#d8a55b] font-serif text-[28px] md:text-[34px] font-semibold">
            {t(messages, "consultations.services.title")}
          </h2>
          <h3 className="text-white font-serif text-[18px] md:text-[19px] font-semibold">
            {t(messages, "consultations.services.doc")}
          </h3>
        </div>

        {/* Grid */}
        <div
          className="
  flex gap-6 overflow-x-auto snap-x snap-mandatory
  md:grid md:grid-cols-2 lg:grid-cols-3 md:overflow-visible
">
          {services.map((item, idx) => {
            const isLastAlone =
              services.length % 3 === 1 && idx === services.length - 1;
            const Icon = item.icon;

            return (
              <article
                key={idx}
                className={`group min-w-[85%] snap-start md:min-w-0 w-full max-w-[420px] flex gap-5 p-7 rounded-2xl bg-white/5 border border-white/10
  hover:bg-white/10 hover:border-white/20 transition-all duration-300
  items-start min-h-[130px]
  ${isLastAlone ? "lg:col-span-3 lg:mx-auto" : ""}
  ${isRtl ? "text-right flex-row-reverse" : "text-left"}`}>
                {/* ICON */}
                <div className="shrink-0 w-[66px] h-[66px] rounded-xl bg-white/5 border border-white/10 flex items-center justify-center [perspective:900px]">
                  <div
                    className="transition-all duration-700 ease-in-out group-hover:[transform:rotateY(180deg)_scale(1.1)]"
                    style={{ transformStyle: "preserve-3d" }}>
                    <Icon className="text-[#d8a55b] text-[30px]" />
                  </div>
                </div>

                {/* TEXT */}
                <div className="flex-1 flex flex-col justify-center">
                  <h3 className="text-white font-serif text-[18px] md:text-[19px] font-semibold mb-2">
                    {t(messages, item.titleKey)}
                  </h3>

                  <p
                    className="
                      text-white/70 text-[14px] leading-relaxed
                      opacity-0 group-hover:opacity-100
                      transition-opacity duration-500
                      max-md:opacity-100
                    ">
                    {t(messages, item.descKey)}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
