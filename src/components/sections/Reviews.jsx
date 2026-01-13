"use client";

import { useEffect, useMemo, useState } from "react";
import { t } from "@/i18n/t";

export default function Reviews({ messages, locale }) {
  const isRTL = locale === "ar";

  const reviews = useMemo(() => {
    return t(messages, "Reviews.items") || [];
  }, [messages]);

  const [activeIndex, setActiveIndex] = useState(0);

  // animation state
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState("next"); // "next" | "prev"

  // autoplay hover stop
  const [isPaused, setIsPaused] = useState(false);

  const goTo = (index, dir = "next") => {
    if (!reviews.length) return;
    if (animating) return;

    setDirection(dir);
    setAnimating(true);

    // give animation time
    setTimeout(() => {
      setActiveIndex(index);
      setAnimating(false);
    }, 280); // must match CSS duration below
  };

  const next = () => {
    if (!reviews.length) return;
    const index = (activeIndex + 1) % reviews.length;
    goTo(index, "next");
  };

  const prev = () => {
    if (!reviews.length) return;
    const index = (activeIndex - 1 + reviews.length) % reviews.length;
    goTo(index, "prev");
  };

  // ✅ arrows logic in RTL:
  const onRightArrow = () => (isRTL ? prev() : next());
  const onLeftArrow = () => (isRTL ? next() : prev());

  // ✅ AutoPlay
  useEffect(() => {
    if (!reviews.length) return;
    if (isPaused) return;

    const interval = setInterval(() => {
      next();
    }, 6000); // ✅ change time here (ms)

    return () => clearInterval(interval);
  }, [activeIndex, isPaused, reviews.length]); // keep synced

  // animation classes
  const animClass = animating
    ? direction === "next"
      ? "opacity-0 translate-x-6"
      : "opacity-0 -translate-x-6"
    : "opacity-100 translate-x-0";

  return (
    <section
      dir={isRTL ? "rtl" : "ltr"}
      className="relative py-16 md:py-20 overflow-hidden"
      id="reviews"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0b1220] via-[#0b162c] to-[#0b1220]" />
      <div className="absolute inset-0 opacity-60 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_55%)]" />

      <div className="relative container mx-auto px-4">
        <div
          className="relative max-w-4xl mx-auto flex items-center justify-center"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Left Arrow */}
          <button
            onClick={onLeftArrow}
            className="absolute left-2 md:-left-16 top-1/2 -translate-y-1/2 z-20
                       w-11 h-11 rounded-full bg-[#c9a45a]
                       flex items-center justify-center shadow-lg
                       hover:scale-105 transition active:scale-95"
            aria-label="Prev"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-white">
              <path
                d="M14 7l-5 5 5 5"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* ✅ Card (FIXED HEIGHT + ANIMATION) */}
          <div
            className="w-full max-w-2xl rounded-xl border border-white/10
                       bg-white/5 backdrop-blur-md
                       px-6 md:px-10 py-8 md:py-9 text-center
                       shadow-[0_0_0_1px_rgba(255,255,255,0.03)]
                       h-[240px] md:h-[260px] flex flex-col"
          >
            {/* Stars */}
            <div className="flex justify-center gap-1 mb-5 shrink-0">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg
                  key={i}
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="text-[#c9a45a]"
                >
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              ))}
            </div>

            {/* ✅ Review Text + Name wrapper with animation */}
            <div
              className={`transition-all duration-300 ease-out ${animClass} flex-1 flex flex-col`}
            >
              {/* Review Text (scrollable but fixed area) */}
              <div className="flex-1 overflow-hidden">
                <p className="text-white/85 leading-relaxed text-sm md:text-base h-full overflow-y-auto px-1 no-scrollbar">
                  “{reviews?.[activeIndex]?.text}”
                </p>
              </div>

              {/* Name */}
              <p className="mt-5 font-semibold text-[#c9a45a] text-sm md:text-base shrink-0">
                - {reviews?.[activeIndex]?.name}
              </p>
            </div>
          </div>

          {/* Right Arrow */}
          <button
            onClick={onRightArrow}
            className="absolute right-2 md:-right-16 top-1/2 -translate-y-1/2 z-20
                       w-11 h-11 rounded-full bg-[#c9a45a]
                       flex items-center justify-center shadow-lg
                       hover:scale-105 transition active:scale-95"
            aria-label="Next"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-white">
              <path
                d="M10 17l5-5-5-5"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* ✅ global style for scrollbar hide */}
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          width: 0px;
          height: 0px;
        }
        .no-scrollbar {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
      `}</style>
    </section>
  );
}
