"use client";
import { t } from "@/i18n/t";
import { useEffect, useRef, useState } from "react";

const REVIEW_LINKS = [
  "https://maps.app.goo.gl/fD9Fhozw7UMx1gLi8",
  "https://maps.app.goo.gl/siwXCsMHBZucjKkdA",
  "https://maps.app.goo.gl/c2DgQh97BTUUDGga9",
  "https://maps.app.goo.gl/SH4YA1GPycXvV9e47",
  "https://maps.app.goo.gl/i9WEghnyUhgYakrL9",
];

// ✅ صورك (اختياري)
const AVATARS = [
  "https://lh3.googleusercontent.com/a/ACg8ocJESNIw1iSUxM8pBW57zid7xQE9MbS_trEch7_yx-nCCssMfA=w76-h76-p-rp-mo-br100",
  "https://lh3.googleusercontent.com/a/ACg8ocKXaUN3OomS1IZLh5IrQMbTU4kgTD2euCoaO-YsDSf6kT9OFQ=w38-h38-p-rp-mo-br100",
  "https://lh3.googleusercontent.com/a/ACg8ocLhMydBn0LnvN7DQbfE6zpjGJ7WZrSsF4v5VPTNVEu0pVoz6g=w38-h38-p-rp-mo-br100",
  "https://lh3.googleusercontent.com/a/ACg8ocIyBCx3kLP1BdBr0Nc2HI_4W6mTW8ndZJidPfqGL_HvAeyc=w38-h38-p-rp-mo-br100",
  "https://lh3.googleusercontent.com/a-/ALV-UjX5iwJ6JTgcVSh6y2x5B0Uv2Q2HF0m3NrM6UTbtz_z7CT-EOoXFYQ=w38-h38-p-rp-mo-br100",
];

function Stars({ rating = 5 }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          className={`h-4 w-4 ${
            i < rating ? "text-[#F4B400]" : "text-gray-200"
          }`}
          fill="currentColor">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      ))}
    </div>
  );
}

export default function GoogleReviews({ messages, locale }) {
  const isRTL = locale === "ar";

  // ✅ items array from json using t()
  // مهم: لازم t() عندك يرجع array لو value array
  const items = t(messages, "personalStatus.Reviews.items") || [];

  const sliderRef = useRef(null);

  const scrollByCards = (dir = "next") => {
    const el = sliderRef.current;
    if (!el) return;

    // ✅ card width + gap
    const card = el.querySelector("[data-review-card]");
    const cardWidth = card ? card.offsetWidth : 340;
    const gap = 24;
    const step = cardWidth + gap;

    // ✅ RTL direction
    let amount = dir === "next" ? step : -step;
    if (isRTL) amount = -amount;

    el.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <section id="reviews" className="bg-white py-12 relative" dir={isRTL ? "rtl" : "ltr"}>
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-8">
          <div>
            <p className="text-sm font-semibold text-gray-500">
              {isRTL ? "التقييمات" : "Testimonials"}
            </p>

            <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mt-1">
              {t(messages, "personalStatus.Reviews.title")}
            </h2>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            {/* ✅ arrows */}
            <button
              type="button"
              onClick={() => scrollByCards(isRTL ? "next" : "prev")}
              className="h-11 w-11 rounded-full border border-gray-200 bg-white shadow-sm hover:bg-gray-50 transition grid place-items-center"
              aria-label={isRTL ? "Next" : "Previous"}>
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5 text-gray-700"
                fill="none"
                stroke="currentColor"
                strokeWidth="2">
                {/* في العربي نخلي السهم يشاور يمين */}
                {isRTL ? (
                  <path d="M9 6l6 6-6 6" />
                ) : (
                  <path d="M15 18l-6-6 6-6" />
                )}
              </svg>
            </button>

            <button
              type="button"
              onClick={() => scrollByCards(isRTL ? "prev" : "next")}
              className="h-11 w-11 rounded-full border border-gray-200 bg-white shadow-sm hover:bg-gray-50 transition grid place-items-center"
              aria-label={isRTL ? "Previous" : "Next"}>
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5 text-gray-700"
                fill="none"
                stroke="currentColor"
                strokeWidth="2">
                {/* في العربي نخلي السهم يشاور شمال */}
                {isRTL ? (
                  <path d="M15 18l-6-6 6-6" />
                ) : (
                  <path d="M9 6l6 6-6 6" />
                )}
              </svg>
            </button>

            {/* ✅ View On Google */}
            <a
              href={REVIEW_LINKS[0]}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 bg-white shadow-sm hover:bg-gray-50 transition">
              <svg viewBox="0 0 48 48" className="h-4 w-4">
                <path
                  fill="#EA4335"
                  d="M24 9.5c3.1 0 5.9 1.1 8.1 3.2l5.9-5.9C34.4 3.3 29.6 1 24 1 14.9 1 7.1 6.2 3.3 13.7l6.9 5.4C12 13.3 17.6 9.5 24 9.5z"
                />
                <path
                  fill="#34A853"
                  d="M46.5 24.5c0-1.6-.1-2.8-.4-4H24v7.8h12.7c-.5 3-2.2 5.6-4.8 7.3l7.3 5.7c4.2-3.9 6.3-9.7 6.3-14.8z"
                />
                <path
                  fill="#4A90E2"
                  d="M10.2 28.9c-.5-1.4-.8-2.9-.8-4.4s.3-3 .8-4.4l-6.9-5.4C1.8 17.8 1 20.8 1 24s.8 6.2 2.3 9.3l6.9-5.4z"
                />
                <path
                  fill="#FBBC05"
                  d="M24 47c5.6 0 10.4-1.8 13.9-5l-7.3-5.7c-2 1.4-4.7 2.2-6.6 2.2-6.4 0-12-3.8-13.8-9.6l-6.9 5.4C7.1 41.8 14.9 47 24 47z"
                />
              </svg>

              <span className="text-xs font-semibold text-gray-700">
                {isRTL ? "عرض على Google" : "View on Google"}
              </span>
            </a>
          </div>
        </div>

        {/* ✅ Slider */}
        <div className="relative">
          <div
            ref={sliderRef}
            className="flex gap-6 overflow-x-auto scroll-smooth pb-3"
            style={{
              scrollbarWidth: "none", // firefox
              msOverflowStyle: "none", // IE/Edge
            }}>
            {/* hide scrollbar chrome */}
            <style jsx>{`
              div::-webkit-scrollbar {
                display: none;
              }
            `}</style>

            {items.map((r, idx) => (
              <div
                key={idx}
                data-review-card
                className="min-w-[320px] sm:min-w-[360px] lg:min-w-[400px] rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition">
                {/* top */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    {/* avatar */}
                    <img
                      src={AVATARS[idx] || "/images/reviews/default.jpg"}
                      alt={r?.name}
                      className="h-11 w-11 rounded-full object-cover border border-gray-200"
                      onError={(e) => {
                        e.currentTarget.src =
                          "https://i.pravatar.cc/80?img=" + (idx + 10);
                      }}
                    />

                    <div>
                      <p className="font-extrabold text-gray-900 leading-tight">
                        {r?.name}
                      </p>

                      <p className="text-xs text-gray-500 mt-0.5">
                        {isRTL ? "عميل موثوق" : "Verified Client"}
                      </p>
                    </div>
                  </div>

                  {/* Google icon */}
                  <svg viewBox="0 0 48 48" className="h-5 w-5 shrink-0">
                    <path
                      fill="#EA4335"
                      d="M24 9.5c3.1 0 5.9 1.1 8.1 3.2l5.9-5.9C34.4 3.3 29.6 1 24 1 14.9 1 7.1 6.2 3.3 13.7l6.9 5.4C12 13.3 17.6 9.5 24 9.5z"
                    />
                    <path
                      fill="#34A853"
                      d="M46.5 24.5c0-1.6-.1-2.8-.4-4H24v7.8h12.7c-.5 3-2.2 5.6-4.8 7.3l7.3 5.7c4.2-3.9 6.3-9.7 6.3-14.8z"
                    />
                    <path
                      fill="#4A90E2"
                      d="M10.2 28.9c-.5-1.4-.8-2.9-.8-4.4s.3-3 .8-4.4l-6.9-5.4C1.8 17.8 1 20.8 1 24s.8 6.2 2.3 9.3l6.9-5.4z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M24 47c5.6 0 10.4-1.8 13.9-5l-7.3-5.7c-2 1.4-4.7 2.2-6.6 2.2-6.4 0-12-3.8-13.8-9.6l-6.9 5.4C7.1 41.8 14.9 47 24 47z"
                    />
                  </svg>
                </div>

                {/* stars */}
                <div className="mt-4 flex items-center gap-2">
                  <Stars rating={5} />
                  <span className="text-xs font-bold text-gray-600">5.0</span>
                </div>

                {/* text */}
                <p className="mt-4 text-sm text-gray-700 leading-relaxed line-clamp-5">
                  {r?.text}
                </p>

                {/* link */}
                <a
                  href={REVIEW_LINKS[idx] || REVIEW_LINKS[0]}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex text-sm font-bold text-blue-600 hover:text-blue-700">
                  {isRTL ? "قراءة على Google" : "Read on Google"}
                </a>
              </div>
            ))}
          </div>

          {/* ✅ little fade edges for fancy look */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-white to-transparent" />
        </div>
      </div>
    </section>
  );
}
