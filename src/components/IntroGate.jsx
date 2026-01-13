"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import WelcomeIntro from "./WelcomeIntro";

export default function IntroGate({ children, messages, locale }) {
  const [introDone, setIntroDone] = useState(false);
  const [checked, setChecked] = useState(false);

  // ✅ prevent strict-mode double run
  const initializedRef = useRef(false);

  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    try {
      const key = `intro_seen_${locale}`;
      const seen = sessionStorage.getItem(key);

      // ✅ لو اتشاف قبل كده: ندخل مباشرة
      if (seen === "1") {
        setIntroDone(true);
      } else {
        setIntroDone(false);
      }
    } catch (e) {
      setIntroDone(false);
    }

    setChecked(true);
  }, [locale]);

  const handleFinish = () => {
    try {
      sessionStorage.setItem(`intro_seen_${locale}`, "1");
    } catch (e) {}

    setIntroDone(true);
  };

  if (!checked) return null;

  return (
    <>
      {!introDone ? (
        <WelcomeIntro
          messages={messages}
          locale={locale}
          onFinish={handleFinish}
        />
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {children}
        </motion.div>
      )}
    </>
  );
}
