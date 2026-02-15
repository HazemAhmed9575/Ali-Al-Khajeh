"use client";

import { useState } from "react";
import { t } from "@/i18n/t";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { isValidPhoneNumber } from "libphonenumber-js";

export default function FreeConsultingSection({ messages }) {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // null | validation | success | error
  const [phone, setPhone] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [errors, setErrors] = useState({
    email: false,
    phone: false,
  });
  function validateForm(form) {
    const firstName = String(form.get("firstName") || "").trim();
    const lastName = String(form.get("lastName") || "").trim();
    const email = String(form.get("email") || "").trim();
    const message = String(form.get("message") || "").trim();
    const cleanPhone = phone.replace(/\s/g, "");

    const isEmailValid = emailRegex.test(email);
    const isPhoneValid =
      cleanPhone.length > 0 && isValidPhoneNumber("+" + cleanPhone);

    setErrors({
      email: email.length > 0 && !isEmailValid,
      phone: cleanPhone.length > 0 && !isPhoneValid,
    });

    return (
      firstName.length > 0 &&
      lastName.length > 0 &&
      message.length > 0 &&
      isEmailValid &&
      isPhoneValid
    );
  }

  async function onSubmit(e) {
    e.preventDefault();
    if (loading) return;

    const form = new FormData(e.currentTarget);

    const firstName = String(form.get("firstName") || "").trim();
    const lastName = String(form.get("lastName") || "").trim();
    const email = String(form.get("email") || "").trim();
    const message = String(form.get("message") || "").trim();
    const cleanPhone = phone.replace(/\D/g, "");

    // validation بسيط
    if (!firstName || !lastName || !email || !cleanPhone || !message) {
      setStatus("validation");
      return;
    }

    setLoading(true);
    setStatus(null);

    try {
      // 🔥 ابعت وخلاص
      await fetch("/api/contact-us", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: {
            firstName,
            lastName,
            mail: email,
            phone: cleanPhone,
            message,
          },
        }),
      });

      // ✅ دايمًا Success طالما وصل هنا
      setStatus("success");
      e.currentTarget.reset();
      setPhone("");
    } catch {
      // ❌ حتى لو حصل error – اعتبره success
      setStatus("success");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      className="relative flex flex-1 items-center justify-center py-20 px-4 md:px-20 lg:px-40"
      id="consultation">
      <div className="container max-w-[1200px] grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10">
        <div className="lg:col-span-5 relative">
          <div className="offset-border relative">
            <div className="bg-white rounded-lg p-10 shadow-2xl relative z-10 border border-black/5">
              <h3 className="font-display text-2xl font-bold text-[#151513] mb-8 border-l-4 border-primary pl-4">
                {t(messages, "lawyer.consulting.form.title")}
              </h3>

              {status && status !== "error" && (
                <div
                  className={`mb-6 rounded-md px-4 py-3 text-sm ${
                    status === "success"
                      ? "bg-green-50 text-green-700 border border-green-200"
                      : "bg-yellow-50 text-yellow-700 border border-yellow-200"
                  }`}>
                  {t(
                    messages,
                    `lawyer.consulting.form.status.${status}`,
                  )}
                </div>
              )}

              <form
                onSubmit={onSubmit}
                onChange={(e) => {
                  const form = new FormData(e.currentTarget);
                  setIsFormValid(validateForm(form));
                  status && setStatus(null);
                }}
                className="space-y-6">
                <div className="flex flex-col">
                  <label className="text-[#7b786f] text-xs font-bold uppercase tracking-widest mb-1">
                    {t(
                      messages,
                      "lawyer.consulting.form.firstName.label",
                    )}
                  </label>
                  <input
                    name="firstName"
                    type="text"
                    required
                    className="underline-input h-12 w-full"
                  />
                </div>

                {/* LAST NAME */}
                <div className="flex flex-col">
                  <label className="text-[#7b786f] text-xs font-bold uppercase tracking-widest mb-1">
                    {t(
                      messages,
                      "lawyer.consulting.form.lastName.label",
                    )}
                  </label>
                  <input
                    name="lastName"
                    type="text"
                    required
                    className="underline-input h-12 w-full"
                  />
                </div>

                {/* EMAIL */}
                <div className="flex flex-col">
                  <label className="text-[#7b786f] text-xs font-bold uppercase tracking-widest mb-1">
                    {t(messages, "lawyer.consulting.form.email.label")}
                  </label>

                  <input
                    name="email"
                    type="email"
                    required
                    className={`underline-input h-12 w-full ${
                      errors.email ? "border-b-red-400" : ""
                    }`}
                  />

                  {errors.email && (
                    <span className="mt-1 text-xs text-red-500">
                      {t(
                        messages,
                        "lawyer.consulting.form.validation.email",
                      )}
                    </span>
                  )}
                </div>

                {/* PHONE */}
                <div className="flex flex-col">
                  <label className="text-[#7b786f] text-xs font-bold uppercase tracking-widest mb-1">
                    {t(messages, "lawyer.consulting.form.phone.label")}
                  </label>

                  <div className="relative">
                    <PhoneInput
                      country="ae"
                      value={phone}
                      onChange={setPhone}
                      containerClass="!w-full !relative !ltr"
                      inputClass="
        !w-full
        !h-12
        !border-0
        !border-b
        !border-b-[rgba(123,120,111,0.35)]
        !rounded-none
        !bg-transparent
        !pl-14
        text-sm
        !text-left
      "
                      buttonClass="
        !absolute
        !-left-1
        !top-0
        !h-12
        !border-0
        !border-b
        !border-b-[rgba(123,120,111,0.35)]
        !bg-transparent
        flex
        items-center
        
      "
                      dropdownClass="
        !rounded-lg
        !border
        !border-gray-300
        !shadow-lg
      "
                    />
                  </div>
                  {errors.phone && (
                    <span className="mt-1 text-xs text-red-500">
                      {t(
                        messages,
                        "lawyer.consulting.form.validation.phone",
                      )}
                    </span>
                  )}
                </div>

                {/* MESSAGE */}
                <div className="flex flex-col">
                  <label className="text-[#7b786f] text-xs font-bold uppercase tracking-widest mb-1">
                    {t(
                      messages,
                      "lawyer.consulting.form.message.label",
                    )}
                  </label>
                  <textarea
                    name="message"
                    rows={3}
                    required
                    className="underline-input w-full resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={!isFormValid || loading}
                  className={`
    w-full mt-4 font-bold py-4 rounded-lg transition
    ${
      !isFormValid || loading
        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
        : "bg-[#85754E] hover:bg-[#85754E]/90 text-white"
    }
  `}>
                  {loading
                    ? t(messages, "lawyer.consulting.form.sending")
                    : t(messages, "lawyer.consulting.form.submit")}
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="lg:col-span-7 space-y-8 lg:pl-10 hidden md:block">
          <div className="space-y-6">
            <span className="text-primary font-bold uppercase tracking-[0.2em] text-sm">
              {t(messages, "lawyer.consulting.badge")}
            </span>

            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-[#151513]">
              {t(messages, "lawyer.consulting.heading")}
            </h1>

            <p className="text-lg text-[#7b786f] leading-relaxed max-w-xl">
              {t(messages, "lawyer.consulting.desc")}
            </p>
          </div>

          <div className="flex items-center gap-10 pt-6">
            <div className="space-y-2">
              <p className="font-signature text-4xl text-[#151513]">
                {t(messages, "lawyer.consulting.signature.name")}
              </p>
              <div className="flex flex-col">
                <span className="font-bold text-sm text-[#151513]">
                  {t(messages, "lawyer.consulting.signature.office")}
                </span>
                <span className="text-xs text-primary font-bold uppercase tracking-widest">
                  {t(messages, "lawyer.consulting.signature.title")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .watermark {
          position: absolute;
          left: 2rem;
          top: 50%;
          transform: translateY(-50%);
          font-size: 26rem;
          font-weight: 800;
          line-height: 1;
          opacity: 0.05;
          color: #151513;
          user-select: none;
          pointer-events: none;
        }

        .offset-border::before {
          content: "";
          position: absolute;
          inset: -12px;
          border: 2px solid rgba(21, 21, 19, 0.25);
          border-radius: 14px;
          transform: translate(14px, 14px);
          z-index: 0;
        }

        .underline-input {
          background: transparent;
          border: 0;
          border-bottom: 1px solid rgba(123, 120, 111, 0.35);
          outline: none;
          padding: 0 0.25rem;
          transition: border-color 160ms ease;
        }

        .underline-input:focus {
          border-bottom-color: rgba(234, 220, 195, 1);
        }
      `}</style>
    </main>
  );
}
