"use client";

import { useState } from "react";

export default function CustomSelect({ type, setType }) {
  const [open, setOpen] = useState(false);

  const options = [
    { value: "report", label: "بلاغ" },
    { value: "case", label: "قضية" },
  ];

  const selected = options.find((o) => o.value === type);

  return (
    <div className="relative w-full">

      {/* Selected Box */}
      <div
        onClick={() => setOpen(!open)}
        className="bg-[#e5e5e5] border-2 border-[#d4b26a] rounded-xl p-4 flex justify-between items-center cursor-pointer"
      >
        <span className="text-[#0f2a44] font-semibold">
          {selected?.label || "اختر النوع"}
        </span>

        <svg
          className={`w-5 h-5 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="#0f2a44"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute mt-2 w-full bg-white rounded-xl shadow-lg border border-[#d4b26a] overflow-hidden z-50">
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => {
                setType(option.value);
                setOpen(false);
              }}
              className="p-4 hover:bg-[#f8f2e4] cursor-pointer text-[#0f2a44] font-medium transition"
            >
              {option.label}
            </div>
          ))}
        </div>
      )}

    </div>
  );
}