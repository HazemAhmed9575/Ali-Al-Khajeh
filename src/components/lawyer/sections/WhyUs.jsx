"use client";

import Image from "next/image";
import { t } from "@/i18n/t";
import LandingIntroAnimation from "../ui/LandingIntroAnimation";
import { useEffect, useRef, useState } from "react";
import { FaUsers, FaBriefcase, FaGavel, FaHome } from "react-icons/fa";

export default function WhyUs({ messages, locale }) {
  const isRtl = locale === "ar";

  const cards = [
    {
      icon: FaUsers,
      titleKey: "lawyer.whyChoose.cards.confidentiality.title",
      descKey: "lawyer.whyChoose.cards.confidentiality.desc",
    },
    {
      icon: FaBriefcase,
      titleKey: "lawyer.whyChoose.cards.strategy.title",
      descKey: "lawyer.whyChoose.cards.strategy.desc",
    },
    {
      icon: FaGavel,
      titleKey: "lawyer.whyChoose.cards.results.title",
      descKey: "lawyer.whyChoose.cards.results.desc",
    },
    {
      icon: FaHome,
      titleKey: "lawyer.whyChoose.cards.results2.title",
      descKey: "lawyer.whyChoose.cards.results2.desc",
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
      { threshold: 0.3 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="py-20 md:py-24 bg-white overflow-hidden relative">
      <div className="absolute inset-0 top-48 z-10 opacity-35 pointer-events-none">
        {isVisible && <LandingIntroAnimation isRtl={isRtl} duration={6} />}
      </div>

      <div className="mx-auto px-4 md:px-12 text-center ">
        {/* LEFT */}
        <div className="text-center">
          <h2 className="text-[#d8a55b] text-sm font-bold uppercase tracking-[0.3em] mb-4">
            {t(messages, "lawyer.whyChoose.kicker")}
          </h2>

          <h3 className="text-3xl md:text-4xl font-extrabold mb-8 text-[#0b0e3e]">
            {t(messages, "lawyer.whyChoose.title")}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {cards.map((card, idx) => (
              <div
                key={idx}
                className="flex flex-col gap-3 p-6 rounded-xl items-center text-center bg-[#d8a55b]/50 hover:shadow-lg transition">
                <div className="text-[#0b0e3e] text-[28px]">
                  <card.icon />
                </div>

                <h5 className="font-bold text-[#0b0e3e] text-lg">
                  {t(messages, card.titleKey)}
                </h5>

                <p className="text-sm text-[#0b0e3e]/80 leading-7">
                  {t(messages, card.descKey)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
