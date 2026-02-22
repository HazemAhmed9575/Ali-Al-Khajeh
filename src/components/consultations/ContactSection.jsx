"use client";

import { useEffect, useState } from "react";
import { t } from "@/i18n/t";
import { FiPhoneCall } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { isValidPhoneNumber } from "libphonenumber-js";
const SHEET_WEBAPP_URL =
  "https://script.google.com/macros/s/AKfycbyDzgU6LjVOtj523vtPyOktiVFIIGW-Xtd50f2kpopz95Zmcop_4gGTikFd-Wti-tJWIg/exec";
export default function ContactSection({ messages, locale }) {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState({ phone: false });
useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  const gclid = params.get("gclid");
  if (gclid) localStorage.setItem("gclid", gclid);
}, []);
async function onSubmit(e) {
  e.preventDefault();
  if (loading) return;

  const form = new FormData(e.currentTarget);
  const name = String(form.get("name") || "").trim();
  const message = String(form.get("message") || "").trim();
  const cleanPhone = phone.replace(/\D/g, "");

  const validPhone =
    cleanPhone.length > 0 && isValidPhoneNumber("+" + cleanPhone);

  if (!name || message === "" || !validPhone) {
    setErrors({ phone: !validPhone });
    setStatus("validation");
    return;
  }

  setLoading(true);
  setStatus(null);

  try {

    // ================= EMAIL =================
    await fetch("/api/contact-us", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        data: {
          firstName: name,
          lastName: "-",
          mail: "no@email.com",
          phone: cleanPhone,
          message,
        },
      }),
    });

    // ================= GOOGLE SHEET =================
    const gclid = localStorage.getItem("gclid") || "";

    const sheetForm = new FormData();
    sheetForm.append("google_id", gclid || "no_gclid");
    sheetForm.append("conversion_name", "Contact Lead");
    sheetForm.append("conversion_time", new Date().toISOString());
    sheetForm.append("conversion_value", 1);
    sheetForm.append("conversion_currency", "USD");
    sheetForm.append("name", name);
    sheetForm.append("number", cleanPhone);
    sheetForm.append("email", "no@email.com");
    sheetForm.append("message", message);

    await fetch(SHEET_WEBAPP_URL, {
      method: "POST",
      body: sheetForm,
      mode: "no-cors",
    });

    // ================= DONE =================
    setStatus("success");
    e.currentTarget.reset();
    setPhone("");

  } catch (err) {
    console.log("SHEET ERROR:", err);
    setStatus("success"); // ما توقفش اليوزر
  } finally {
    setLoading(false);
  }
}

  return (
    <section className="py-20 bg-[#FDFBF7] relative" id="contact">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
          {/* LEFT SIDE */}
          <div className="md:w-1/2 p-10 md:p-14 flex flex-col justify-center bg-[#85754E] text-white">
            <h2 className="font-bold text-3xl mb-6">
              {t(messages, "consultations.contact.title")}
            </h2>
            <p className="mb-10 text-lg leading-relaxed text-white/90">
              {t(messages, "consultations.contact.desc")}
            </p>

            <a
              href="tel:+971503090203"
              className="flex items-center justify-center gap-3 bg-white text-[#85754E] font-bold py-4 px-6 rounded-xl shadow-lg hover:bg-gray-100 transition">
              <FiPhoneCall />
              {t(messages, "consultations.contact.call")}
            </a>

            <a
              href="https://wa.me/971503090203"
              className="mt-4 flex items-center justify-center gap-3 bg-[#25D366] text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:bg-[#20bd5a] transition">
              <FaWhatsapp />
              {t(messages, "consultations.contact.whatsapp")}
            </a>
          </div>

          {/* RIGHT FORM */}
          <div className="md:w-1/2 p-10 md:p-14 bg-gray-50">
            {status === "success" && (
              <div className="mb-4 text-green-600 font-medium">
                Request sent successfully
              </div>
            )}

            {status === "validation" && (
              <div className="mb-4 text-red-500 text-sm">
                Please fill all fields correctly
              </div>
            )}

            <form onSubmit={onSubmit} className="space-y-6">
              {/* NAME */}
              <input
                name="name"
                type="text"
                placeholder={t(messages, "consultations.contact.form.name")}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#85754E] outline-none"
                required
              />

              {/* PHONE */}
              <div className="relative">
                <div className="relative w-full [direction:ltr]">
                  <PhoneInput
                    country="ae"
                    value={phone}
                    onChange={setPhone}
                    enableSearch
                    containerClass="!w-full"
                    inputClass="
      !w-full
      !h-12
      !rounded-lg
      !border
      !border-gray-300
      !bg-white
      !pl-[70px]
      !pr-4
      !text-sm
      !text-left
      focus:!ring-2
      focus:!ring-[#85754E]
    "
                    buttonClass="
      !absolute
      !left-0
      !top-0
      !h-12
      !w-[62px]
      !bg-white
      !border-r
      !border-gray-300
      !rounded-l-lg
      flex
      items-center
      justify-center
      z-20
    "
                    dropdownClass="
      !absolute
      !top-full
      !left-0
      
      !mt-2
      !rounded-xl
      !shadow-xl
      !text-left
      !z-50
    "
                  />

                  {/* Tailwind overrides للمكتبة */}
                  <div
                    className="
    [&_.react-tel-input_.selected-flag]:!p-0
    [&_.react-tel-input_.flag-dropdown]:!border-0
    [&_.react-tel-input_.country-list]:!top-full
    [&_.react-tel-input_.country-list]:!left-0
   
    [&_.react-tel-input_.country-list]:!mt-2
    [&_.react-tel-input_.country-list]:!z-50
  "
                  />
                </div>

                {errors.phone && (
                  <span className="text-xs text-red-500 mt-1 block">
                    Invalid phone number
                  </span>
                )}
              </div>

              {/* SELECT */}
              <textarea
                name="message"
                placeholder={t(messages, "consultations.contact.form.message")}
                rows={4}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#85754E] outline-none resize-none"
                required
              />

              {/* SUBMIT */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#85754E] hover:bg-[#6f613f] text-white font-bold py-4 rounded-lg shadow-md transition disabled:opacity-50">
                {loading
                  ? "Sending..."
                  : t(messages, "consultations.contact.form.submit")}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
