"use client";

import { t } from "@/i18n/t";
import { FiArrowLeft } from "react-icons/fi";
import { GiBrokenHeart, GiFamilyHouse, GiScrollUnfurled, GiBigDiamondRing } from "react-icons/gi";

export default function ServicesSection({ messages, locale }) {
  return (
    <section className="py-20 bg-white relative" id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <span className="text-[#85754E] font-bold tracking-wider uppercase mb-2 block">
              {t(messages, "personalStatus.services.badge")}
            </span>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-gray-900">
              {t(messages, "personalStatus.services.title")}
            </h2>
          </div>

          <a
            href="#contact"
            className="hidden md:flex items-center gap-2 text-[#85754E] font-bold hover:text-[#85754E]-dark transition-colors mt-4 md:mt-0"
          >
            {t(messages, "personalStatus.services.viewAll")}
            <FiArrowLeft />
          </a>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          {/* Card 1 */}
          <div className="group relative overflow-hidden rounded-2xl cursor-pointer">
            <img
              src="/images/divorce.png"
              alt="divorce"
              className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6 flex flex-col justify-end">
              <div className="w-10 h-10 bg-[#85754E] rounded-lg flex items-center justify-center text-white mb-4">
                <GiBrokenHeart />
              </div>
              <h3 className="text-white font-display font-bold text-xl mb-1">
                {t(messages, "personalStatus.services.items.divorce.title")}
              </h3>
              <p className="text-gray-300 text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                {t(messages, "personalStatus.services.items.divorce.desc")}
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="group relative overflow-hidden rounded-2xl cursor-pointer">
            <img
              src="/images/custody.jpeg"
              alt="custody"
              className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6 flex flex-col justify-end">
              <div className="w-10 h-10 bg-[#85754E] rounded-lg flex items-center justify-center text-white mb-4">
                <GiFamilyHouse />
              </div>
              <h3 className="text-white font-display font-bold text-xl mb-1">
                {t(messages, "personalStatus.services.items.custody.title")}
              </h3>
              <p className="text-gray-300 text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                {t(messages, "personalStatus.services.items.custody.desc")}
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="group relative overflow-hidden rounded-2xl cursor-pointer">
            <img
              src="/images/will.jpeg"
              alt="will"
              className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6 flex flex-col justify-end">
              <div className="w-10 h-10 bg-[#85754E] rounded-lg flex items-center justify-center text-white mb-4">
                <GiScrollUnfurled />
              </div>
              <h3 className="text-white font-display font-bold text-xl mb-1">
                {t(messages, "personalStatus.services.items.will.title")}
              </h3>
              <p className="text-gray-300 text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                {t(messages, "personalStatus.services.items.will.desc")}
              </p>
            </div>
          </div>

          {/* Card 4 */}
          <div className="group relative overflow-hidden rounded-2xl cursor-pointer">
            <img
              src="/images/marriage.jpeg"
              alt="marriage"
              className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6 flex flex-col justify-end">
              <div className="w-10 h-10 bg-[#85754E] rounded-lg flex items-center justify-center text-white mb-4">
                <GiBigDiamondRing />
              </div>
              <h3 className="text-white font-display font-bold text-xl mb-1">
                {t(messages, "personalStatus.services.items.marriage.title")}
              </h3>
              <p className="text-gray-300 text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                {t(messages, "personalStatus.services.items.marriage.desc")}
              </p>
            </div>
          </div>
        </div>

        {/* Mobile Button */}
        <div className="mt-8 text-center md:hidden">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-[#85754E] font-bold hover:text-[#85754E]-dark transition-colors"
          >
            {t(messages, "personalStatus.services.viewAll")}
            <FiArrowLeft />
          </a>
        </div>
      </div>
    </section>
  );
}
