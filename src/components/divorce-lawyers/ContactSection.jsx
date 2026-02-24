"use client";

import { useState, useEffect } from "react";
import { t } from "@/i18n/t";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { isValidPhoneNumber } from "libphonenumber-js";

const SHEET_WEBAPP_URL =
  "https://script.google.com/macros/s/AKfycbwfxbYZ_86IHnMgC2TwNmOViBMqeb3hnPxIptRraYD_b_5H5x2yhK4EbcXFw51qDBY/exec";

export default function ContactSection({ messages, locale }) {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState({
    phone: false,
    email: false,
  });

  // ====== GCLID capture ======
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const gclid = params.get("gclid");
    if (gclid) localStorage.setItem("gclid", gclid);
  }, []);

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  async function onSubmit(e) {
    e.preventDefault();
    if (loading) return;

    const formEl = e.currentTarget;
    const form = new FormData(formEl);

    const name = String(form.get("name") || "").trim();
    const email = String(form.get("email") || "").trim();
    const emirate = String(form.get("emirate") || "").trim();
    const case_description = String(form.get("case_description") || "").trim();

    const cleanPhone = phone.replace(/\D/g, "");

    const validPhone =
      cleanPhone.length > 0 && isValidPhoneNumber("+" + cleanPhone);

    const validEmail = isValidEmail(email);

    if (!name || !case_description || !emirate || !validPhone || !validEmail) {
      setErrors({ phone: !validPhone, email: !validEmail });
      setStatus("validation");
      return;
    }

    setLoading(true);
    setStatus(null);

    const gclid = localStorage.getItem("gclid") || "";
    const conversionTime = new Date().toISOString();

    try {
   
      const emailRes = await fetch("/api/contact-us", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: {
            firstName: name,
            lastName: "-",
            mail: email,
            phone: cleanPhone,
            message: `Emirate: ${emirate}
Case: ${case_description}
GCLID: ${gclid}`,
          },
        }),
      });

      if (!emailRes.ok) {
        console.log("EMAIL FAILED", emailRes.status);
        setStatus("error");
        return;
      }

      // ================= SHEET =================

  // ================= SHEET ONLY =================
const gclidStored = localStorage.getItem("gclid");

if (gclidStored) {
  const params = new URLSearchParams({
    conversion_time: new Date().toISOString(),
    conversion_name: "Contact Lead",
    google_click_id: gclidStored,
    conversion_value: "1",
    conversion_currency: "USD",
    ad_user_data: "GRANTED",
    ad_personalization: "GRANTED",
    name: name,
    number: cleanPhone,
    email: email,
    message: `Emirate: ${emirate} | Case: ${case_description}`,
  });

  await fetch(`${SHEET_WEBAPP_URL}?${params.toString()}`);
}

  // ================= DONE =================
  setStatus("success");
  formEl.reset();
  setPhone("");
  setErrors({ phone: false, email: false });

} catch (err) {
  console.log("SHEET ERROR:", err);
  setStatus("error");
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
              {t(messages, "personalStatus.contact.title")}
            </h2>
            <p className="mb-10 text-lg leading-relaxed text-white/90">
              {t(messages, "personalStatus.contact.desc")}
            </p>
          </div>

          {/* RIGHT FORM */}
          <div className="md:w-1/2 p-10 md:p-14 bg-gray-50">
            {status === "success" && (
              <div className="mb-4 text-green-600 font-medium">
                {t(messages, "personalStatus.contact.form.success")}
              </div>
            )}

            {status === "validation" && (
              <div className="mb-4 text-red-500 text-sm">
                {t(messages, "personalStatus.contact.form.validation")}
              </div>
            )}

            {status === "error" && (
              <div className="mb-4 text-red-500 text-sm">
                {t(messages, "personalStatus.contact.form.error")}
              </div>
            )}

            <form onSubmit={onSubmit} className="space-y-6">
              {/* NAME */}
              <input
                name="name"
                type="text"
                placeholder={t(messages, "personalStatus.contact.form.name")}
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
                    inputClass="!w-full !h-12 !rounded-lg !border !border-gray-300 !bg-white !pl-[70px] !pr-4 !text-sm !text-left focus:!ring-2 focus:!ring-[#85754E]"
                  />
                </div>

                {errors.phone && (
                  <span className="text-xs text-red-500 mt-1 block">
                    {t(messages, "personalStatus.contact.form.invalidPhone")}
                  </span>
                )}
              </div>

              {/* EMAIL */}
              <input
                name="email"
                type="email"
                placeholder={t(messages, "personalStatus.contact.form.email")}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#85754E] outline-none"
                required
              />

              {errors.email && (
                <span className="text-xs text-red-500">
                  {t(messages, "personalStatus.contact.form.invalidEmail")}
                </span>
              )}

              {/* EMIRATE */}
              <select
                name="emirate"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#85754E]"
                required
                defaultValue="">
                <option value="" disabled>
                  {t(messages, "personalStatus.contact.form.emirate")}
                </option>
                <option value="Dubai">
                  {t(messages, "personalStatus.contact.form.emirates.dubai")}
                </option>
                <option value="Abu Dhabi">
                  {t(messages, "personalStatus.contact.form.emirates.abudhabi")}
                </option>
                <option value="Sharjah">
                  {t(messages, "personalStatus.contact.form.emirates.sharjah")}
                </option>
                <option value="Ajman">
                  {t(messages, "personalStatus.contact.form.emirates.ajman")}
                </option>
                <option value="RAK">
                  {t(messages, "personalStatus.contact.form.emirates.rak")}
                </option>
              </select>

              {/* CASE */}
              <textarea
                name="case_description"
                rows={4}
                placeholder={t(messages, "personalStatus.contact.form.case")}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#85754E]"
                required
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#85754E] text-white py-4 rounded-lg">
                {loading
                  ? t(messages, "personalStatus.contact.form.sending")
                  : t(messages, "personalStatus.contact.form.send")}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
