"use client";

import { t } from "@/i18n/t";

export default function ProcessSection({ messages, locale }) {
  return (
    <section className="py-20 bg-[#FDFBF7]" id="steps">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-[#85754E] font-bold tracking-wider uppercase mb-2 block">
            {t(messages, "consultations.process.badge")}
          </span>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-gray-900">
            {t(messages, "consultations.process.title")}
          </h2>
        </div>

        <div className="relative">
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2 z-0 mx-20"></div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">

            {/* Step 1 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-white rounded-full border-4 border-[#85754E] flex items-center justify-center text-[#85754E] shadow-lg mb-6">
                <span className="font-display font-bold text-2xl">01</span>
              </div>
              <h3 className="font-display font-bold text-xl text-gray-900 mb-3">
                {t(messages, "consultations.process.steps.step1.title")}
              </h3>
              <p className="text-gray-600 text-sm px-4">
                {t(messages, "consultations.process.steps.step1.desc")}
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-[#85754E] text-white rounded-full border-4 border-white flex items-center justify-center shadow-lg mb-6">
                <span className="font-display font-bold text-2xl">02</span>
              </div>
              <h3 className="font-display font-bold text-xl text-gray-900 mb-3">
                {t(messages, "consultations.process.steps.step2.title")}
              </h3>
              <p className="text-gray-600 text-sm px-4">
                {t(messages, "consultations.process.steps.step2.desc")}
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-white rounded-full border-4 border-[#85754E] flex items-center justify-center text-[#85754E] shadow-lg mb-6">
                <span className="font-display font-bold text-2xl">03</span>
              </div>
              <h3 className="font-display font-bold text-xl text-gray-900 mb-3">
                {t(messages, "consultations.process.steps.step3.title")}
              </h3>
              <p className="text-gray-600 text-sm px-4">
                {t(messages, "consultations.process.steps.step3.desc")}
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
