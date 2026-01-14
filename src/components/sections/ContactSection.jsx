"use client";

import Image from "next/image";
import { FaWhatsapp } from "react-icons/fa";
import { FiPhoneCall } from "react-icons/fi";


export default function LogoContact({
  locale = "en",
  logoSrc = "/images/LOGO-PNG.png", 
  whatsappNumber = "971503090203",
  callNumber = "+971503090203",
}) {
  const isRtl = locale === "ar";

  return (
    <div  className="flex flex-col items-center text-center">

      {/* ✅ LOGO IMAGE */}
      <div className="relative w-[500px] md:w-[600px] lg:w-[700px] aspect-[3/1]">
        <Image
          src={logoSrc}
          alt="Logo"
          fill
          priority
          sizes="(max-width: 768px) 220px, (max-width: 1024px) 280px, 320px"
          className="object-contain"
        />
      </div>

      {/* ✅ Buttons under logo */}
      <div className="mt-6 flex flex-row items-center gap-3">
        {/* WhatsApp */}
        <a
          href={`https://wa.me/${whatsappNumber}`}
          target="_blank"
          rel="noreferrer"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 h-12 rounded-full bg-[#85754E] text-white text-sm font-bold shadow-sm hover:bg-[#85754E]/85 transition"
        >
          <FaWhatsapp className="text-[18px]" />
          {isRtl ? "واتساب" : "WhatsApp"}
        </a>

        {/* Call */}
        <a
          href={`tel:${callNumber}`}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 h-12 rounded-full bg-white text-gray-900 text-sm font-bold border border-gray-200 hover:bg-gray-50 transition"
        >
          <FiPhoneCall className="text-[18px]" />
          {isRtl ? "اتصال" : "Call"}
        </a>
      </div>

      {/* Optional note */}
      <p className="mt-4 text-sm text-gray-500 max-w-md">
        {isRtl
          ? "اختر طريقة التواصل المناسبة لك وسنقوم بالرد فورًا."
          : "Choose your preferred contact method and we’ll respond quickly."}
      </p>
    </div>
  );
}


  {/* <DoubleFrame isRtl={isRtl}>
            <div>
              <h2 className="text-[32px] md:text-[38px] font-semibold text-[#0b0e3e]">
                {t(messages, "contact.title")}
              </h2>

              <div className="mt-4 h-[1px] w-full bg-[#d8a55b]" />

              <form className="mt-10 md:mt-12 space-y-8">
                <input
                  placeholder={t(messages, "contact.name")}
                  className="w-full bg-transparent border-b border-[#e6e8f4] pb-4 text-[#6b7280] outline-none"
                />

                <div className="relative">
                  <select className="w-full appearance-none bg-transparent border-b border-[#e6e8f4] pb-4 text-[#6b7280] outline-none">
                    <option>{t(messages, "contact.subject")}</option>
                    <option>{t(messages, "contact.subjects.familyLaw")}</option>
                    <option>
                      {t(messages, "contact.subjects.personalInjury")}
                    </option>
                    <option>
                      {t(messages, "contact.subjects.criminalLaw")}
                    </option>
                    <option>{t(messages, "contact.subjects.Other")}</option>
                  </select>

                  <span
                    className={`absolute top-1/2 -translate-y-1/2 text-[#8c8fa6] ${
                      isRtl ? "left-2" : "right-2"
                    }`}>
                    ▾
                  </span>
                </div>

                <textarea
                  placeholder={t(messages, "contact.message")}
                  className="w-full bg-transparent border-b border-[#e6e8f4] pb-4 text-[#6b7280] outline-none min-h-[120px] resize-none"
                />

                <button
                  type="button"
                  className="mt-8 inline-flex cursor-pointer items-center justify-center rounded-full bg-[#d8a55b] px-10 py-4 text-[#0b0e3e] font-semibold">
                  {t(messages, "contact.btn")}
                </button>
              </form>
            </div>
          </DoubleFrame> */}