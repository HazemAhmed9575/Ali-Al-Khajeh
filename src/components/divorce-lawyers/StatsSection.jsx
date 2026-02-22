"use client";

import { t } from "@/i18n/t";

import { GiJusticeStar } from "react-icons/gi";
import { FaBalanceScale } from "react-icons/fa";
import { HiOutlineBuildingLibrary } from "react-icons/hi2";

export default function StatsSection({ messages, locale }) {
  return (
    <section  className="py-16 bg-[#85754E] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Numbers */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-x-reverse divide-white/20">

          <div className="p-4">
            <div className="text-4xl md:text-5xl font-display font-black mb-2 text-[#FDFBF7]">
              {t(messages, "personalStatus.stats.items.cases.number")}
            </div>
            <div className="text-sm md:text-base font-medium text-white/80">
              {t(messages, "personalStatus.stats.items.cases.label")}
            </div>
          </div>

          <div className="p-4">
            <div className="text-4xl md:text-5xl font-display font-black mb-2 text-[#FDFBF7]">
              {t(messages, "personalStatus.stats.items.satisfaction.number")}
            </div>
            <div className="text-sm md:text-base font-medium text-white/80">
              {t(messages, "personalStatus.stats.items.satisfaction.label")}
            </div>
          </div>

          <div className="p-4">
            <div className="text-4xl md:text-5xl font-display font-black mb-2 text-[#FDFBF7]">
              {t(messages, "personalStatus.stats.items.experience.number")}
            </div>
            <div className="text-sm md:text-base font-medium text-white/80">
              {t(messages, "personalStatus.stats.items.experience.label")}
            </div>
          </div>

          <div className="p-4">
            <div className="text-4xl md:text-5xl font-display font-black mb-2 text-[#FDFBF7]">
              {t(messages, "personalStatus.stats.items.support.number")}
            </div>
            <div className="text-sm md:text-base font-medium text-white/80">
              {t(messages, "personalStatus.stats.items.support.label")}
            </div>
          </div>
        </div>

     
      
      </div>
    </section>
  );
}
