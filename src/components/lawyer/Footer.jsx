"use client";
import {
  FaLinkedinIn,
  FaYoutube,
  FaXTwitter,
  FaInstagram,
  FaFacebookF,
} from "react-icons/fa6";
import { t } from "@/i18n/t";
import Image from "next/image";

export default function Footer({ messages, locale }) {
  const isRTL = locale === "ar";
  const sections = [
   { id: "home", label: t(messages, "nav.home") },
    { id: "reviews", label: t(messages, "nav.reviews") },
    { id: "services", label: t(messages, "nav.services") },
    { id: "faq", label: t(messages, "nav.faq") },
  ];

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (!el) return;

    const yOffset = -90;
    const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;

    window.scrollTo({ top: y, behavior: "smooth" });
  };
  return (
    <footer
      dir={isRTL ? "rtl" : "ltr"}
      className="bg-[#0b1220] text-white pt-20 pb-10 border-t border-white/5">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          {/* Column 1: Brand */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className=" rounded flex items-center justify-center">
                <Image
                  src="/images/footer-logo.avif"
                  alt="Logo"
                  width={180}
                  height={180}
                  className="object-contain"
                  priority
                />
              </div>
            </div>

            <p className="text-gray-400 text-sm leading-relaxed">
              {t(messages, "Footer.brand.description")}
            </p>
          </div>

          {/* Column 2: Links */}
          <div>
            <h4 className="font-bold mb-6 uppercase text-xs tracking-[0.2em] text-[#c9a45a]">
              {t(messages, "Footer.quickLinks.title")}
            </h4>

            <ul className="space-y-4 text-sm text-gray-400">
              {sections.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => scrollToSection(item.id)}
                    className="hover:text-[#c9a45a] transition-colors">
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Hours */}
          {/* <div>
            <h4 className="font-bold mb-6 uppercase text-xs tracking-[0.2em] text-[#c9a45a]">
              {t(messages, "Footer.officeHours.title")}
            </h4>

            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex justify-between gap-3">
                <span>{t(messages, "Footer.officeHours.days.monFri")}</span>
                <span>{t(messages, "Footer.officeHours.time.monFri")}</span>
              </li>
              <li className="flex justify-between gap-3">
                <span>{t(messages, "Footer.officeHours.days.sat")}</span>
                <span>{t(messages, "Footer.officeHours.time.sat")}</span>
              </li>
              <li className="flex justify-between gap-3">
                <span>{t(messages, "Footer.officeHours.days.sun")}</span>
                <span className="text-[#c9a45a]">
                  {t(messages, "Footer.officeHours.time.sun")}
                </span>
              </li>
            </ul>
          </div> */}

          {/* Column 4: Connect */}
          <div className="flex gap-3 mb-6">
            <a
              href="https://www.linkedin.com/company/alialkhajehae/"
              target="_blank"
              rel="noreferrer"
              className="size-10 rounded-full bg-white/10 flex items-center justify-center
               text-white hover:bg-[#c9a45a] hover:text-[#0b1220]
               transition-all duration-300"
              aria-label="LinkedIn">
              <FaLinkedinIn className="text-[18px]" />
            </a>

            <a
              href="https://www.youtube.com/@Alialkhajeh"
              target="_blank"
              rel="noreferrer"
              className="size-10 rounded-full bg-white/10 flex items-center justify-center
               text-white hover:bg-[#c9a45a] hover:text-[#0b1220]
               transition-all duration-300"
              aria-label="YouTube">
              <FaYoutube className="text-[18px]" />
            </a>

            <a
              href="https://twitter.com/alialkhajehae"
              target="_blank"
              rel="noreferrer"
              className="size-10 rounded-full bg-white/10 flex items-center justify-center
               text-white hover:bg-[#c9a45a] hover:text-[#0b1220]
               transition-all duration-300"
              aria-label="X">
              <FaXTwitter className="text-[18px]" />
            </a>

            <a
              href="https://www.instagram.com/alialkhajehae"
              target="_blank"
              rel="noreferrer"
              className="size-10 rounded-full bg-white/10 flex items-center justify-center
               text-white hover:bg-[#c9a45a] hover:text-[#0b1220]
               transition-all duration-300"
              aria-label="Instagram">
              <FaInstagram className="text-[18px]" />
            </a>

            <a
              href="https://www.facebook.com/alialkhajehae"
              target="_blank"
              rel="noreferrer"
              className="size-10 rounded-full bg-white/10 flex items-center justify-center
               text-white hover:bg-[#c9a45a] hover:text-[#0b1220]
               transition-all duration-300"
              aria-label="Facebook">
              <FaFacebookF className="text-[18px]" />
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-10 border-t border-white/5 text-center">
          <p className="text-xs text-gray-500">
            {t(messages, "Footer.bottom")}
          </p>
        </div>
      </div>
    </footer>
  );
}
