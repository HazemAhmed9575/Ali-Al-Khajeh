"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { t } from "@/i18n/t";

export default function WelcomeIntro({ messages, onFinish, locale }) {
  const [show, setShow] = useState(true);
  const calledRef = useRef(false);
  const isRTL = locale === "ar";

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 3500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence
      mode="wait"
      onExitComplete={() => {
        // ✅ ضمان مرة واحدة فقط
        if (!calledRef.current && typeof onFinish === "function") {
          calledRef.current = true;
          onFinish();
        }
      }}
    >
      {show && (
        <motion.div
          key="welcomeIntro"
          dir={isRTL ? "rtl" : "ltr"}
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Background */}
          <div className="absolute inset-0 bg-[#0b1220]" />

          {/* gradients */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-[#85754E]/20 blur-[100px]" />
            <div className="absolute -bottom-40 -right-40 h-[520px] w-[520px] rounded-full bg-white/10 blur-[120px]" />
          </div>

          {/* pattern */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
              backgroundSize: "22px 22px",
            }}
          />

          {/* Content */}
          <div className="relative z-10 text-center px-6 max-w-2xl">
            {/* Logo */}
            <motion.div
              className="mx-auto mb-10 relative w-[110px] h-[110px]"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.7 }}
            >
              <motion.div
                className="absolute inset-0 rounded-full bg-[#85754E]/25 blur-xl"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.6, repeat: Infinity }}
              />

              <div className="relative z-10 rounded-full bg-white/5 border border-white/10 backdrop-blur-md w-full h-full flex items-center justify-center">
                <Image
                  src="/images/logo-only.png"
                  alt="Ali Al Khajeh Logo"
                  width={92}
                  height={92}
                  priority
                  className="w-[72px] h-[72px] object-contain opacity-90"
                />
              </div>
            </motion.div>

            <motion.h1
              className="text-4xl md:text-6xl font-extrabold tracking-tight text-white"
              initial={{ y: 22, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.7 }}
            >
              {t(messages, "welcome.title1")}
            </motion.h1>

            <motion.h2
              className="mt-3 text-3xl md:text-5xl font-bold text-[#c9a45a]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55, duration: 0.7 }}
            >
              {t(messages, "welcome.title2")}
            </motion.h2>

            <motion.p
              className="mt-6 text-white/70 text-lg md:text-xl leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.95, duration: 0.8 }}
            >
              {t(messages, "welcome.subtitle")}
            </motion.p>

            <motion.div
              className="mx-auto mt-10 h-[6px] w-64 overflow-hidden rounded-full bg-white/10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.2 }}
            >
              <motion.div
                className="h-full w-full bg-gradient-to-r from-[#85754E] via-[#d8a55b] to-[#85754E]"
                initial={{ x: "-100%" }}
                animate={{ x: "0%" }}
                transition={{ duration: 1.7, ease: "easeInOut" }}
              />
            </motion.div>

            <motion.p
              className="mt-6 text-xs tracking-widest text-white/40 uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.0, duration: 0.5 }}
            >
              {t(messages, "welcome.enter")}
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
