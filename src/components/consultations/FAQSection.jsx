"use client";

import { t } from "@/i18n/t";
import { FiChevronDown } from "react-icons/fi";

export default function FAQSection({ messages, locale }) {
  return (
    <section className="py-20 bg-white" id="faq">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-gray-900">
            {t(messages, "consultations.faq.title")}
          </h2>
          <p className="mt-4 text-gray-600">
            {t(messages, "consultations.faq.subtitle")}
          </p>
        </div>

        {/* Items */}
        <div className="space-y-4">

          <details className="group bg-[#FDFBF7] rounded-lg overflow-hidden transition-all duration-300 open:shadow-md">
            <summary className="flex justify-between items-center p-6 cursor-pointer select-none">
              <span className="font-bold text-lg text-gray-800">
                {t(messages, "consultations.faq.items.q1.question")}
              </span>
              <FiChevronDown className="text-[#85754E] transform group-open:rotate-180 transition-transform" />
            </summary>
            <div className="px-6 pb-6 text-gray-600 leading-relaxed border-t border-gray-200 pt-4">
              {t(messages, "consultations.faq.items.q1.answer")}
            </div>
          </details>

          <details className="group bg-[#FDFBF7] rounded-lg overflow-hidden transition-all duration-300 open:shadow-md">
            <summary className="flex justify-between items-center p-6 cursor-pointer select-none">
              <span className="font-bold text-lg text-gray-800">
                {t(messages, "consultations.faq.items.q2.question")}
              </span>
              <FiChevronDown className="text-[#85754E] transform group-open:rotate-180 transition-transform" />
            </summary>
            <div className="px-6 pb-6 text-gray-600 leading-relaxed border-t border-gray-200 pt-4">
              {t(messages, "consultations.faq.items.q2.answer")}
            </div>
          </details>

          <details className="group bg-[#FDFBF7] rounded-lg overflow-hidden transition-all duration-300 open:shadow-md">
            <summary className="flex justify-between items-center p-6 cursor-pointer select-none">
              <span className="font-bold text-lg text-gray-800">
                {t(messages, "consultations.faq.items.q3.question")}
              </span>
              <FiChevronDown className="text-[#85754E] transform group-open:rotate-180 transition-transform" />
            </summary>
            <div className="px-6 pb-6 text-gray-600 leading-relaxed border-t border-gray-200 pt-4">
              {t(messages, "consultations.faq.items.q3.answer")}
            </div>
          </details>
          <details className="group bg-[#FDFBF7] rounded-lg overflow-hidden transition-all duration-300 open:shadow-md">
            <summary className="flex justify-between items-center p-6 cursor-pointer select-none">
              <span className="font-bold text-lg text-gray-800">
                {t(messages, "consultations.faq.items.q4.question")}
              </span>
              <FiChevronDown className="text-[#85754E] transform group-open:rotate-180 transition-transform" />
            </summary>
            <div className="px-6 pb-6 text-gray-600 leading-relaxed border-t border-gray-200 pt-4">
              {t(messages, "consultations.faq.items.q4.answer")}
            </div>
          </details>
          <details className="group bg-[#FDFBF7] rounded-lg overflow-hidden transition-all duration-300 open:shadow-md">
            <summary className="flex justify-between items-center p-6 cursor-pointer select-none">
              <span className="font-bold text-lg text-gray-800">
                {t(messages, "consultations.faq.items.q5.question")}
              </span>
              <FiChevronDown className="text-[#85754E] transform group-open:rotate-180 transition-transform" />
            </summary>
            <div className="px-6 pb-6 text-gray-600 leading-relaxed border-t border-gray-200 pt-4">
              {t(messages, "consultations.faq.items.q5.answer")}
            </div>
          </details>

        </div>
      </div>
    </section>
  );
}
