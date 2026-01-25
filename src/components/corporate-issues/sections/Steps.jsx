"use client";

import { t } from "@/i18n/t";

export default function Steps({ messages, locale }) {
  const isRtl = locale === "ar";

  const steps = [
    {
      num: 1,
      titleKey: "corporateIssues.process.steps.review.title",
      descKey: "corporateIssues.process.steps.review.desc",
    },
    {
      num: 2,
      titleKey: "corporateIssues.process.steps.strategy.title",
      descKey: "corporateIssues.process.steps.strategy.desc",
    },
    {
      num: 3,
      titleKey: "corporateIssues.process.steps.action.title",
      descKey: "corporateIssues.process.steps.action.desc",
    }
  ];

  return (
    <section   className="py-20 md:py-24 bg-[#F6F7FB]" id="steps">
      <div className="max-w-[1280px] mx-auto px-4 md:px-12 lg:px-10">
        {/* Heading */}
        <div className="text-center mb-14 md:mb-16">
          <h2 className="text-[#d8a55b] text-xl font-bold uppercase tracking-[0.3em] mb-4">
            {t(messages, "corporateIssues.process.kicker")}
          </h2>

          <h3 className="text-3xl md:text-4xl font-extrabold text-[#000]">
            {t(messages, "corporateIssues.process.title")}
          </h3>
        </div>

        {/* Steps */}
        <div className="relative flex flex-col md:flex-row justify-between gap-10 md:gap-4">
          {/* line */}
          <div className="absolute top-8 left-0 w-full h-[2px] bg-gray-200 hidden md:block z-0" />

          {steps.map((step) => (
            <div
              key={step.num}
              className="flex-1 flex flex-col items-center text-center relative z-10"
            >
              <div
                className="size-16 rounded-full bg-[#d8a55b] text-white flex items-center justify-center mb-6
                           text-2xl font-black shadow-xl shadow-[#0b0e3e]/20"
              >
                {step.num}
              </div>

              <h5 className="font-bold text-lg mb-2 text-[#000]">
                {t(messages, step.titleKey)}
              </h5>

              <p className="text-sm text-[#636f88] max-w-[220px] leading-7">
                {t(messages, step.descKey)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
