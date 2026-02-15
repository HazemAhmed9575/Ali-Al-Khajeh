"use client";

import Image from "next/image";
import { t } from "@/i18n/t";

/* ================= BUTTON ================= */
function Button({ children, className = "" }) {
  return (
    <button

      className={`border border-primary px-9 py-[11px] rounded transition active:translate-y-1 select-none ${className}`}
    >
      <span className="text-primary text-lg inline-block font-medium">
        {children}
      </span>
    </button>
  );
}

/* ================= LINK ================= */
function Link({ href, children, className = "" }) {
  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
}

/* ================= SECTION ================= */
export default function AboutSection({ messages, locale }) {
  const isAr = locale === "ar";

  return (
    <section
      className="bg-white xl:bg-[#e7e4df] relative  flex items-center gap-20 shadow-about-us"
      id="about"
    >
      {/* Image */}
      <div className="hidden xl:block flex-shrink-0">
        <Image
          src={isAr ? "/images/ali-about.webp" : "/images/ali-about-en.webp"}
          alt="about"
          className="object-cover"
          height={600}
          width={600}
        />
      </div>

      {/* Text */}
      <div className="max-w-[1300px] mt-20 xl:mt-0 text-center xl:text-start xl:pe-24 px-10 min-[2300px]:mx-auto min-[2300px]:max-w-[2000px]">

        {/* <h2 className="text-primary text-lg">
          <Link href={t(messages, "about.link")}>
            {t(messages, "about.subHeader")}
          </Link>
        </h2> */}

        <h3 className="text-black-1 text-[28px] 2xl:text-[32px] mt-[14px] mb-[18px]">
          {t(messages, "about.header")}
        </h3>

        <p className="leading-[28px] 2xl:leading-[32px] text-lg 2xl:text-xl">
          {t(messages, "about.paragraph")}
        </p>

        <Link href="#consultation" className="pb-10 xl:pb-0 inline-block">
          <Button className="mt-10">
            {t(messages, "about.button")}
          </Button>
        </Link>
      </div>
    </section>
  );
}
