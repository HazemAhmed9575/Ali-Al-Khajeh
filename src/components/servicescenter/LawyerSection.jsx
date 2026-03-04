import Image from "next/image";
import { t } from "@/i18n/t";

export default function LawyerSection({ messages, locale }) {
  const isAr = locale === "ar";

  return (
    <section className="py-20 px-[10%] grid md:grid-cols-2 gap-16 items-center bg-white" id="about">

      {/* Image */}
      <div className="text-center">
        <Image
          src={isAr ? "/images/ali-about.webp" : "/images/ali-about-en.webp"}
          alt={t(messages, "servicesCenter.about.imageAlt")}
          width={600}
          height={600}
          className="object-cover mx-auto"
        />
      </div>

      {/* Text */}
      <div>
        <h2 className="text-4xl text-[#0a1d37] font-bold mb-6">
          {t(messages, "servicesCenter.about.name")}
        </h2>

        <p className="text-lg leading-9 text-[#444]">
          {t(messages, "servicesCenter.about.description")}
        </p>

        <div className="mt-8 opacity-80">
          <i className="fa fa-quote-right text-[#c5a059] text-3xl"></i>
        </div>
      </div>

    </section>
  );
}