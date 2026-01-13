import Image from "next/image";
import { t } from "@/i18n/t";

export default function AwardsSection({messages}) {
const awards = [
  { img: "/images/images (2).jpg", titleKey: "awards.items.lawyersAssociation" },
  { img: "/images/W-IJN4BT_400x400.jpg", titleKey: "awards.items.ministryOfJustice" },
  { img: "/images/abu_dhabi_uae_falcon_by_lolmaxdudelol_d7bojqc-fullview-removebg-preview.png", titleKey: "awards.items.abuDhabiJudicialDepartment" }
];
  return (
    <section className="relative py-20 md:py-24 overflow-hidden">
      {/* BG image */}
      <div className="absolute inset-0 -z-20">
        <Image
          src="/images/image-1.webp"
          alt="Awards background"
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 -z-10 bg-[#000]/50" />

      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-14 md:mb-16">
         <h2 className="text-white text-[28px] md:text-[36px] font-serif font-semibold tracking-wide">
  {t(messages, "awards.sectionTitle")}
</h2>

          {/* gold separator */}
          <div className="mt-4 flex items-center justify-center gap-3">
            <span className="h-[2px] w-[70px] bg-[#d8a55b]" />
            <span className="text-[#d8a55b] text-[14px]">//</span>
            <span className="h-[2px] w-[70px] bg-[#d8a55b]" />
          </div>
        </div>

        {/* Awards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12 place-items-center">
  {awards.map((award, idx) => (
    <article
      key={idx}
      className={`text-center w-full max-w-[260px]
        ${awards.length === 3 && idx === 2 ? "sm:col-span-2 sm:justify-self-center lg:col-span-1" : ""}
      `}
    >
  <div className="mx-auto relative w-[140px] h-[140px] md:w-[155px] md:h-[155px]
                bg-white rounded-full overflow-hidden border border-white/20
                shadow-[0_8px_24px_rgba(0,0,0,0.25)]
                transition-all duration-300 ease-out hover:scale-110 hover:shadow-[0_12px_35px_rgba(216,165,91,0.35)]">
  <Image
    src={award.img}
    alt={award.title}
    fill
    className="object-contain p-4"
  />
</div>

      <h3 className="mt-6 text-white text-[18px] md:text-[19px] font-semibold">
  {t(messages, award.titleKey)}
</h3>

    </article>
  ))}
</div>
      </div>
    </section>
  );
}
