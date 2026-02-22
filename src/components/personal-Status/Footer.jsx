"use client";

import { t } from "@/i18n/t";
import Image from "next/image";
import {
  FaLinkedinIn,
  FaYoutube,
  FaXTwitter,
  FaInstagram,
  FaFacebookF,
} from "react-icons/fa6";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";

export default function Footer({ messages, locale }) {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">

          {/* Logo + About */}
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
              {/* <div className="flex flex-col">
                <span className="font-display font-bold text-lg text-white">
                  {t(messages, "personalStatus.footer.brand")}
                </span>
                <span className="text-xs text-[#85754E] font-medium">
                  {t(messages, "personalStatus.footer.tagline")}
                </span>
              </div> */}
            </div>

            <p className="text-sm leading-relaxed text-gray-400">
              {t(messages, "personalStatus.footer.about")}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6 font-display">
              {t(messages, "personalStatus.footer.quickLinks.title")}
            </h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-[#85754E] transition-colors">{t(messages, "personalStatus.footer.quickLinks.about")}</a></li>
              <li><a href="#" className="hover:text-[#85754E] transition-colors">{t(messages, "personalStatus.footer.quickLinks.practice")}</a></li>
              <li><a href="#" className="hover:text-[#85754E] transition-colors">{t(messages, "personalStatus.footer.quickLinks.team")}</a></li>
              <li><a href="#" className="hover:text-[#85754E] transition-colors">{t(messages, "personalStatus.footer.quickLinks.blog")}</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-bold mb-6 font-display">
              {t(messages, "personalStatus.footer.services.title")}
            </h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-[#85754E]">{t(messages, "personalStatus.footer.services.litigation")}</a></li>
              <li><a href="#" className="hover:text-[#85754E]">{t(messages, "personalStatus.footer.services.contracts")}</a></li>
              <li><a href="#" className="hover:text-[#85754E]">{t(messages, "personalStatus.footer.services.debts")}</a></li>
              <li><a href="#" className="hover:text-[#85754E]">{t(messages, "personalStatus.footer.services.labor")}</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-6 font-display">
              {t(messages, "personalStatus.footer.contact.title")}
            </h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <FiMapPin className="text-[#85754E] text-lg" />
                <span>{t(messages, "personalStatus.footer.contact.address")}</span>
              </li>
              <li className="flex items-center gap-3">
                <FiPhone className="text-[#85754E] text-lg" />
                <span dir="ltr">+971 50 309 0203</span>
              </li>
              <li className="flex items-center gap-3">
                <FiPhone className="text-[#85754E] text-lg" />
                <span dir="ltr">+971 54 747 7777</span>
              </li>
              <li className="flex items-center gap-3">
                <FiMail className="text-[#85754E] text-lg" />
                <span>ali@alialkhajeh.ae</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <p>{t(messages, "personalStatus.footer.copyright")}</p>

          <div className="flex gap-4">
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

      </div>
    </footer>
  );
}
