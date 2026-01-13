"use client";

import { t } from "@/i18n/t";
import {
  FaScaleBalanced,
  FaPeopleRoof,
  FaShieldHalved,
  FaIndustry,
  FaGavel,
  FaBriefcase,
} from "react-icons/fa6";

export default function Services({ messages, locale }) {
  const isRtl = locale === "ar";

  const services = [
    {
      icon: FaScaleBalanced,
      titleKey: "services.items.business.title",
   
    },
    {
      icon: FaPeopleRoof,
      titleKey: "services.items.family.title",
  
    },
    {
      icon: FaShieldHalved,
      titleKey: "services.items.insurance.title",
  
    },
    {
      icon: FaIndustry,
      titleKey: "services.items.industrial.title",

    },
    {
      icon: FaGavel,
      titleKey: "services.items.auction.title",
     
    },
    {
      icon: FaBriefcase,
      titleKey: "services.items.employment.title",
     
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
            {t(messages, "services.title")}
          </h2>
       
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((item, idx) => {
            const Icon = item.icon;

            return (
              <article
                key={idx}
                className={`group flex gap-5 p-7 rounded-2xl bg-white/5 border border-white/10
                hover:bg-white/10 hover:border-white/20 transition-all duration-300 items-center
                ${isRtl ? "text-right flex-row-reverse" : "text-left"}`}>
                {/* ICON */}
                <div
                  className="
    shrink-0 w-[66px] h-[66px] rounded-xl bg-white/5 border border-white/10
    flex items-center justify-center
    [perspective:900px]
  ">
                  <div
                    className="
      transition-all duration-700 ease-in-out
      group-hover:[transform:rotateY(180deg)_scale(1.1)]
    "
                    style={{ transformStyle: "preserve-3d" }}>
                    <Icon className="text-[#d8a55b] text-[30px]" />
                  </div>
                </div>

                {/* TEXT */}
                <div>
                  <h3 className="text-white font-serif text-[18px] md:text-[19px] font-semibold">
                    {t(messages, item.titleKey)}
                  </h3>
                  
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
