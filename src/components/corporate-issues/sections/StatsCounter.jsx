"use client";

import { useEffect, useRef, useState } from "react";
import { t } from "@/i18n/t";

/**
 * ✅ CountUp hook
 */
function useCountUp({ end, duration = 1400, start = false }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;

    let startTime = null;
    const from = 0;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      // smooth easing
      const eased = 1 - Math.pow(1 - progress, 3);

      const current = Math.floor(from + (end - from) * eased);
      setValue(current);

      if (progress < 1) requestAnimationFrame(step);
      else setValue(end);
    };

    requestAnimationFrame(step);
  }, [end, duration, start]);

  return value;
}

function StatItem({ value, suffix = "", label, shouldStart }) {
  const count = useCountUp({ end: value, duration: 1600, start: shouldStart });

  return (
    <div className="flex-1 text-center px-6 py-5">
      <div className="text-2xl lg:text-5xl font-extrabold text-[#85754E] leading-none">
        {count}
        {suffix}
      </div>

      <div className="mt-2 text-[11px] font-semibold uppercase tracking-widest text-[#1b2b55]/80">
        {label}
      </div>
    </div>
  );
}

export default function StatsCounter({ messages, locale }) {
  const ref = useRef(null);
  const [start, setStart] = useState(false);

  const isRTL = locale === "ar";

  // ✅ stats from translations
  const items = t(messages, "stats.items") || [];

  // ✅ start counting when visible
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStart(true);
          obs.disconnect();
        }
      },
      { threshold: 0.35 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="w-full bg-white p-5" dir={isRTL ? "rtl" : "ltr"}>
      <div className="mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 bg-white">
          {items.map((item, idx) => (
            <div
              key={idx}
              className={""}
            >
              <StatItem
                value={Number(item?.value) || 0}
                suffix={item?.suffix || ""}
                label={item?.label || ""}
                shouldStart={start}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
