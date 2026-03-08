import { t } from "@/i18n/t";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";

import Link from "next/link";

export default function Hero({ messages ,locale}) {
   const isArabic = locale === "ar";
  return (
<section
  className="h-screen fixed top-0 left-0 w-full z-0 flex flex-col justify-center items-center text-center text-white"
  style={{
    backgroundImage: "url('/images/ttt.webp')",
    backgroundSize: "cover",
  
  }}
  id="home"
>
    <div className="absolute inset-0 bg-black/60 z-0"></div>
    
      <div className="max-w-4xl px-4 z-10 ">

        <h1 className="text-3xl md:text-6xl font-bold mb-6 leading-tight">
          {t(messages, "servicesCenter.hero.title")}
        </h1>

        <p className="inline-block bg-[#c5a059]/20 backdrop-blur-md px-10 py-4 rounded-4xl md:rounded-full border border-white/20 text-lg md:text-xl">
          {t(messages, "servicesCenter.hero.subtitle")}
        </p>

      </div>
      

  <a href="#services" className="inline-block group mt-12">
      <button
        className="
          relative flex items-center gap-3
          border border-[#85754E]
         cursor-pointer
          px-9 py-[11px]
          rounded
          transition-all duration-300
          bg-[#85754E]
          text-white
            hover:bg-[#766845]
         
        "
      >
        <span className="text-lg font-medium">
          ابدأ الآن
        </span>
        {/* Arrow */}
        <span className="animate-arrow text-xl">
          {isArabic ? <FaAngleDoubleLeft /> : <FaAngleDoubleRight />}
        </span>

        {/* Text */}
      </button>
    </a>

    </section>
  );
}