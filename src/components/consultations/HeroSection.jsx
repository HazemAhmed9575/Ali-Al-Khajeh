"use client";

import { t } from "@/i18n/t";
import { FiArrowLeft, FiPhoneCall, FiCheckCircle, FiLock } from "react-icons/fi";
import { GiGavel } from "react-icons/gi";

export default function HeroSection({ messages, locale }) {
  // 👇 غير الصورة من هنا براحتك
  const backgroundImage = "/images/d40d0141-e611-4375-a71e-79c389708503.jpeg";

  return (
    <section
      className="relative h-[100vh] flex items-center bg-cover bg-center bg-no-repeat "
      style={{ backgroundImage: `url(${backgroundImage})` }}
      id="home"
    >
      <div className="absolute inset-0 bg-black/40  gradient-overlay"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-2xl">
      
        

          {/* Title */}
          <h1 className="font-display font-black text-4xl md:text-6xl text-white leading-tight mb-6 text-shadow">
            {t(messages, "consultations.hero.titleLine1")} <br />
            <span className="text-[#D4AF37]">
              {t(messages, "consultations.hero.titleHighlight")}
            </span>
            <br />
            {t(messages, "consultations.hero.titleLine2")}
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-gray-200 mb-8 font-light leading-relaxed max-w-xl">
            {t(messages, "consultations.hero.desc")}
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#contact"
              className="bg-[#85754E] hover:bg-[#96855b] text-white text-lg px-8 py-4 rounded-lg font-bold shadow-xl transition-all hover:shadow-2xl text-center flex items-center justify-center gap-2 group"
            >
              {t(messages, "consultations.hero.ctaConsult")}
              <FiArrowLeft className="text-xl group-hover:-translate-x-1 transition-transform" />
            </a>

            <a
              href="tel:+971503090203"
              className="bg-white/10 hover:bg-white/20 backdrop-blur border border-white/30 text-white text-lg px-8 py-4 rounded-lg font-bold transition-all text-center flex items-center justify-center gap-2"
            >
              <FiPhoneCall className="text-xl" />
              {t(messages, "consultations.hero.ctaCall")}
            </a>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 flex items-center gap-6 text-gray-300 text-sm flex-wrap">
            {/* <div className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur border border-white/30 p-3 rounded-md">
              <FiCheckCircle className="text-[#85754E] text-lg " />
              <span>{t(messages, "consultations.hero.trust.licensed")}</span>
            </div> */}

            <div className="flex items-center gap-2 bg-[#85754E]  backdrop-blur border border-white/30 p-3 rounded-md">
              <FiLock className="text-[#fff] text-lg" />
              <span>{t(messages, "consultations.hero.trust.privacy")}</span>
            </div>

            <div className="flex items-center gap-2 bg-[#85754E]  backdrop-blur border border-white/30 p-3 rounded-md">
              <GiGavel className="text-[#fff] text-lg" />
              <span>{t(messages, "consultations.hero.trust.experience")}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
