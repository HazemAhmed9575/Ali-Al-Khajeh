"use client";

import { t } from "@/i18n/t";
import { usePathname, useRouter } from "next/navigation";

import {
  FaLinkedinIn,
  FaYoutube,
  FaInstagram,
  FaFacebookF,
  FaPhoneAlt,
  FaWhatsapp,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { useEffect, useState } from "react";
export default function Navbar({ messages, locale }) {
  const router = useRouter();
  const pathname = usePathname();
  const isRTL = locale === "ar";

  const sections = [
    { id: "contact", label: t(messages, "nav.Contact") },
    { id: "why-us", label: t(messages, "nav.why") },
    { id: "steps", label: t(messages, "nav.steps") },
    { id: "services", label: t(messages, "nav.services") },
    { id: "faq", label: t(messages, "nav.faq") },

  ];


const [activeSection, setActiveSection] = useState("contact");

useEffect(() => {
  const ids = sections.map((s) => s.id);

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (visible?.target?.id) {
        setActiveSection(visible.target.id);
      }
    },
    {
      root: null,
      rootMargin: "-120px 0px -60% 0px",
      threshold: [0.15, 0.25, 0.35, 0.5],
    }
  );

  ids.forEach((id) => {
    const el = document.getElementById(id);
    if (el) observer.observe(el);
  });

  return () => observer.disconnect();
}, [locale]); // ✅ كده




const scrollToSection = (id) => {
  const el = document.getElementById(id);
  if (!el) return;

  setActiveSection(id);

  const yOffset = -90; 
  const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;

  window.scrollTo({ top: y, behavior: "smooth" });
};

  const switchLanguage = () => {
    const targetLocale = isRTL ? "en" : "ar";
    const segments = pathname.split("/").filter(Boolean);

    if (segments.length > 0 && (segments[0] === "ar" || segments[0] === "en")) {
      segments[0] = targetLocale;
    } else {
      segments.unshift(targetLocale);
    }

    router.push("/" + segments.join("/"));
  };

  return (
    <>
      {/* ✅ TOP BAR (NOT FIXED - scrolls away) */}
      <div className="bg-[#85754E]">
        <div className="container mx-auto px-4">
          <div className="h-12 flex items-center justify-between">
            {/* Social icons */}
            <div className="flex gap-2">
              <a
                href="https://www.linkedin.com/company/alialkhajehae/"
                target="_blank"
                rel="noreferrer"
                className="size-9 rounded-full bg-white/20 flex items-center justify-center
                           text-white hover:bg-white/30 transition-all duration-300"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn className="text-[16px]" />
              </a>

              <a
                href="https://www.youtube.com/@Alialkhajeh"
                target="_blank"
                rel="noreferrer"
                className="size-9 rounded-full bg-white/20 flex items-center justify-center
                           text-white hover:bg-white/30 transition-all duration-300"
                aria-label="YouTube"
              >
                <FaYoutube className="text-[16px]" />
              </a>

              <a
                href="https://twitter.com/alialkhajehae"
                target="_blank"
                rel="noreferrer"
                className="size-9 rounded-full bg-white/20 flex items-center justify-center
                           text-white hover:bg-white/30 transition-all duration-300"
                aria-label="X"
              >
                <FaXTwitter className="text-[16px]" />
              </a>

              <a
                href="https://www.instagram.com/alialkhajehae"
                target="_blank"
                rel="noreferrer"
                className="size-9 rounded-full bg-white/20 flex items-center justify-center
                           text-white hover:bg-white/30 transition-all duration-300"
                aria-label="Instagram"
              >
                <FaInstagram className="text-[16px]" />
              </a>

              <a
                href="https://www.facebook.com/alialkhajehae"
                target="_blank"
                rel="noreferrer"
                className="size-9 rounded-full bg-white/20 flex items-center justify-center
                           text-white hover:bg-white/30 transition-all duration-300"
                aria-label="Facebook"
              >
                <FaFacebookF className="text-[16px]" />
              </a>
            </div>

            {/* Whats + Call + Language */}
        <div className="flex items-center gap-2">
  <a
    href="https://wa.me/971503090203"
    target="_blank"
    rel="noreferrer"
    onClick={() => {
      if (typeof window !== "undefined") {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: "whatsapp_click",
          action: "whatsapp",
          phone: "971503090203",
          url: "https://wa.me/971503090203",
          position: "header_icons", // ✅ هنا مكان الزر
        });
      }
    }}
    className="size-9 rounded-full bg-white/20 flex items-center justify-center
               text-white hover:bg-white/30 transition-all duration-300"
    aria-label="WhatsApp"
  >
    <FaWhatsapp className="text-[16px]" />
  </a>

  <a
    href="tel:+971503090203"
    onClick={() => {
      if (typeof window !== "undefined") {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: "call_click",
          action: "call",
          phone: "+971503090203",
          url: "tel:+971503090203",
          position: "header_icons", // ✅ هنا مكان الزر
        });
      }
    }}
    className="size-9 rounded-full bg-white/20 flex items-center justify-center
               text-white hover:bg-white/30 transition-all duration-300"
    aria-label="Call"
  >
    <FaPhoneAlt className="text-[15px]" />
  </a>
</div>
          </div>
        </div>
      </div>

      {/* ✅ NAVBAR ONLY Sticky/Fixed */}
      <header className="sticky top-0 z-50 border-b border-black/5 bg-white/70 backdrop-blur">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
           <button
            onClick={() => scrollToSection("top")}
            className="relative inline-block top-1"
            aria-label="Go to top"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="129.23"
              height="25"
              viewBox="0 0 129.23 25"
              className="md:w-[199px] md:h-[53px]"
            >
              <g transform="translate(-113.108 -88.316)">
                <g transform="translate(141.401 94.41)" fill="#85754e">
                  <path
                    d="M25.542 155.9l-.037-.1H25.1l-2.139 5.855h-.742v.434h2.011v-.434h-.81l.715-1.954h1.622l.715 1.954h-.811v.434h2.75v-.434h-.754zm.051 3.364H24.3l.648-1.769.648 1.769z"
                    transform="translate(-22.217 -155.796)"
                  />
                  <path
                    d="M50.517 160.3a2.662 2.662 0 01-.543 1.158 1.241 1.241 0 01-.978.4h-1.255v-5.278h.879v-.434h-2.86v.434h.879v5.278h-.879v.434h5.151v-2.111h-.362l-.03.122z"
                    transform="translate(-36.194 -156.004)"
                  />
                  <path
                    d="M67.669 156.58h.879v5.278h-.879v.434h2.86v-.434h-.879v-5.278h.879v-.434h-2.86z"
                    transform="translate(-48.199 -156.004)"
                  />
                  <path
                    d="M90.667 155.9l-.041-.1h-.4l-2.139 5.855h-.745v.434h2.013v-.434h-.81l.715-1.954h1.625l.715 1.954h-.812v.434h2.749v-.434h-.752l-2.118-5.755zm.051 3.364h-1.295l.648-1.769.648 1.769z"
                    transform="translate(-59.391 -155.796)"
                  />
                  <path
                    d="M115.641 160.3a2.63 2.63 0 01-.543 1.158 1.24 1.24 0 01-.978.4h-1.255v-5.278h.879v-.434h-2.86v.434h.879v5.278h-.879v.434h5.151v-2.111h-.362l-.03.122z"
                    transform="translate(-72.853 -156.004)"
                  />
                  <path
                    d="M135.384 158.627l1.869-2.047H138v-.434h-1.95v.434h.618l-1.957 2.129v-2.129h.816v-.434h-2.8v.434h.882v5.278h-.88v.434h2.8v-.434h-.816V159.5l1.95 2.357h-.532v.434h2.6v-.434h-.609z"
                    transform="translate(-85.305 -156.004)"
                  />
                  <path
                    d="M159.107 156.58h.879v2.356h-2.329v-2.356h.88v-.434h-2.86v.434h.879v5.278h-.879v.434h2.86v-.434h-.88v-2.487h2.329v2.487h-.879v.434h2.86v-.434h-.881v-5.278h.88v-.434h-2.86z"
                    transform="translate(-98.396 -156.004)"
                  />
                  <path
                    d="M182.777 155.9l-.037-.1h-.406l-2.139 5.855h-.745v.434h2.013v-.434h-.811l.715-1.954h1.625l.715 1.954h-.807v.434h2.75v-.434h-.752l-2.117-5.752zm.051 3.364h-1.295l.648-1.769.648 1.769z"
                    transform="translate(-111.969 -155.796)"
                  />
                  <path
                    d="M203.513 156.58h.88v4.763a.842.842 0 01-.107.515.3.3 0 01-.254.119.329.329 0 01-.2-.05c-.01-.008-.041-.029-.041-.135a.454.454 0 01.016-.137c.017-.055.031-.1.046-.134s.031-.087.048-.131a.6.6 0 00.033-.21.551.551 0 00-.027-.162.5.5 0 00-.093-.174.53.53 0 00-.172-.135.585.585 0 00-.267-.057.646.646 0 00-.51.2.731.731 0 00-.175.5.9.9 0 00.113.448 1.046 1.046 0 00.292.331 1.323 1.323 0 00.422.2 1.878 1.878 0 00.508.068 1.537 1.537 0 00.685-.143 1.239 1.239 0 00.466-.4 1.633 1.633 0 00.246-.572 3.037 3.037 0 00.071-.666v-4.05h.88v-.434h-2.86v.434z"
                    transform="translate(-125.348 -156.004)"
                  />
                  <path
                    d="M225.262 160.32a2.813 2.813 0 01-.105.447 1.835 1.835 0 01-.248.508 1.553 1.553 0 01-.429.416 1.142 1.142 0 01-.641.168H222.5v-2.634h.488a.791.791 0 01.389.084.645.645 0 01.229.221 1.335 1.335 0 01.148.35c.034.123.07.268.114.453l.028.122h.363v-2.865h-.359l-.03.122a4.528 4.528 0 01-.171.58.921.921 0 01-.188.315.52.52 0 01-.244.143 1.59 1.59 0 01-.406.042h-.361v-2.209h1.159a1.552 1.552 0 01.5.072.892.892 0 01.338.213 1.351 1.351 0 01.255.368 4.02 4.02 0 01.212.537l.034.11h.355v-1.736h-4.843v.434h.879v5.278h-.879v.434h5.142v-2.111h-.377l-.017.139z"
                    transform="translate(-134.896 -156.005)"
                  />
                  <path
                    d="M249.027 156.58v-.434h-2.86v.434h.879v2.356h-2.329v-2.356h.88v-.434h-2.86v.434h.879v5.278h-.879v.434h2.86v-.434h-.88v-2.487h2.329v2.487h-.879v.434h2.86v-.434h-.879v-5.278z"
                    transform="translate(-148.09 -156.004)"
                  />
                </g>

                <g transform="translate(113.108 88.316)">
                  <path
                    d="M139.923 88.676l-.349-.18-.352-.181-.352.181-.349.18.127 5.034.464 18.228.039.618.071.76.071-.76.039-.618.464-18.228.127-5.034z"
                    transform="translate(-128.018 -88.316)"
                  />
                  <path
                    fill="#85754e"
                    d="M117.869 95.872l-.036-.1h-.491l-3.159 8.377h-1.074v.467h2.819v-.467H114.7l2.367-6.24 2.365 6.24H118.2v.467h3.907v-.467h-1.089z"
                    transform="translate(-113.108 -92.693)"
                  />
                  <path
                    fill="#85754e"
                    d="M150.359 95.874l-.038-.1h-.491l-3.182 8.377h-1.088v.467h3.907v-.467h-1.23l2.365-6.24 2.367 6.24h-1.232v.467h2.819v-.467h-1.074z"
                    transform="translate(-132.149 -92.693)"
                  />
                </g>
              </g>
            </svg>
          </button>


            {/* Links */}
       <nav className="hidden md:flex items-center gap-2">
  {sections.map((item) => (
    <button
      key={item.id}
      onClick={() => scrollToSection(item.id)}
      className={`
        group relative px-4 py-2 rounded-full text-sm font-semibold
        transition-all duration-300
        ${activeSection === item.id
          ? "text-[#85754E] bg-[#85754E]/10"
          : "text-gray-700 hover:text-[#85754E] hover:bg-[#85754E]/5"
        }
      `}
    >
      {/* label */}
      <span className="relative z-10">{item.label}</span>

      {/* animated underline */}
      <span
        className={`
          absolute left-1/2 -translate-x-1/2 bottom-1
          h-[2px] bg-[#85754E] rounded-full transition-all duration-300
          ${activeSection === item.id ? "w-7" : "w-0 group-hover:w-7"}
        `}
      />
    </button>
  ))}
</nav>

           
        {/* Language switch */}
              <button
                onClick={switchLanguage}
                className="ml-2 rounded-full cursor-pointer bg-[#85754E] px-4 py-2 text-xs font-bold text-white
                           hover:bg-[#85754E]/90 transition-all"
              >
                {isRTL ? "English" : "العربية"}
              </button>
          </div>
        </div>
      </header>
    </>
  );
}
