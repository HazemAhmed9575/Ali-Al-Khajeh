"use client";

import Image from "next/image";
import { t } from "@/i18n/t";



/* ================= SECTION ================= */
export default function AboutSection({ messages, locale }) {
  const isAr = locale === "ar";

  return (
    <section
      className=" xl:bg-[#e7e4df] mt-[100vh] flex items-center gap-20 shadow-about-us"
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

             <h2 className="text-4xl text-[#0a1d37] font-bold mb-6">
          {t(messages, "servicesCenter.about.name")}
        </h2>

        <p className="text-lg leading-9 text-[#444]">
          {t(messages, "servicesCenter.about.description")}
        </p>


    
      </div>
    </section>
  );
}
