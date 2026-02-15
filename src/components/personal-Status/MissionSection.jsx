"use client";

import { t } from "@/i18n/t";

export default function MissionSection({ messages, locale }) {
  return (
    <section className="py-20 bg-white  relative overflow-hidden" id="Ourmessage">
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-[#85754E]/5 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 rounded-full bg-[#85754E]/5 blur-3xl"></div>

      <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
        <span className="text-[#85754E] font-bold tracking-wider uppercase mb-2 block">
          {t(messages, "personalStatus.mission.badge")}
        </span>

        <h2 className="font-display font-bold text-3xl md:text-4xl text-gray-900  mb-8">
          {t(messages, "personalStatus.mission.title")}
        </h2>

        <p className="text-lg text-gray-600  leading-loose">
          {t(messages, "personalStatus.mission.desc")}
        </p>
      </div>
    </section>
  );
}
