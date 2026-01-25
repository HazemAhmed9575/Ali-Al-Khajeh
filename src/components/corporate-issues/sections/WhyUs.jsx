"use client";

import Image from "next/image";
import { t } from "@/i18n/t";
import LandingIntroAnimation from "../ui/LandingIntroAnimation";
import { useEffect, useRef, useState } from "react";
import { FaLocationDot, FaClock, FaCircleCheck } from "react-icons/fa6";

export default function WhyUs({ messages, locale }) {
  const isRtl = locale === "ar";

  const cards = [
    {
      icon: FaLocationDot,
      titleKey: "corporateIssues.whyChoose.cards.confidentiality.title",
      descKey: "corporateIssues.whyChoose.cards.confidentiality.desc",
    },
    {
      icon: FaClock,
      titleKey: "corporateIssues.whyChoose.cards.strategy.title",
      descKey: "corporateIssues.whyChoose.cards.strategy.desc",
    },
    {
      icon: FaCircleCheck,
      titleKey: "corporateIssues.whyChoose.cards.results.title",
      descKey: "corporateIssues.whyChoose.cards.results.desc",
    },
    {
  icon: FaCircleCheck,
  titleKey: "corporateIssues.whyChoose.cards.trademark.title",
  descKey: "corporateIssues.whyChoose.cards.trademark.desc",
},
  ];

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
    <section
      ref={sectionRef}
      id="why-us"
      className="py-20 md:py-24 bg-white overflow-hidden relative"
    >
      <div className="absolute inset-0 top-48 z-10 opacity-35 pointer-events-none">
        {isVisible && <LandingIntroAnimation isRtl={isRtl} duration={6} />}
      </div>

      <div className="max-w-[1280px] mx-auto px-4 md:px-12 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-16 items-center">
          {/* LEFT */}
          <div className={isRtl ? "text-right" : "text-left"}>
            <h2 className="text-[#d8a55b] text-sm font-bold uppercase tracking-[0.3em] mb-4">
              {t(messages, "corporateIssues.whyChoose.kicker")}
            </h2>

            <h3 className="text-3xl md:text-4xl font-extrabold mb-8 text-[#0b0e3e]">
              {t(messages, "corporateIssues.whyChoose.title")}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {cards.map((card, idx) => (
                <div
                  key={idx}
                  className="flex flex-col gap-2 p-5 rounded-xl bg-[#d8a55b]/50"
                >
                  <div className="text-[#0b0e3e] text-[26px]">
                    <card.icon />
                  </div>

                  <h5 className="font-bold text-[#0b0e3e]">
                    {t(messages, card.titleKey)}
                  </h5>

                  <p className="text-sm text-[#636f88] leading-7">
                    {t(messages, card.descKey)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div className="relative rounded-2xl overflow-hidden aspect-square">
            <Image
              src="/images/why-choose-us.png"
              alt={t(messages, "corporateIssues.whyChoose.imageAlt")}
              fill
              className="object-cover"
              priority={false}
            />
            <div className="absolute inset-0 bg-black/20" />
          </div>
        </div>
      </div>
    </section>
  );
}
