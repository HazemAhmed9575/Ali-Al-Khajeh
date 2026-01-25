"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import WelcomeIntro from "./WelcomeIntro";

export default function IntroGate({ children, messages, locale }) {
  const [introDone, setIntroDone] = useState(false);
  const [checked, setChecked] = useState(false);

  const initializedRef = useRef(false);

  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    try {
      const key = `intro_seen_global`;
      const seen = localStorage.getItem(key);

      setIntroDone(seen === "1");
    } catch (e) {
      setIntroDone(false);
    }

    setChecked(true);
  }, []);

  // ✅ lock scroll while intro is shown (prevents horizontal shift)
useEffect(() => {
  if (!checked) return;

  const body = document.body;

  if (!introDone) {
    const scrollY = window.scrollY;

    body.dataset.scrollY = String(scrollY);

    // ✅ reserve scrollbar space manually
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    body.style.paddingRight = scrollbarWidth ? `${scrollbarWidth}px` : "";

    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.width = "100%";
  } else {
    const scrollY = parseInt(body.dataset.scrollY || "0", 10);

    body.style.overflow = "";
    body.style.position = "";
    body.style.top = "";
    body.style.width = "";
    body.style.paddingRight = "";

    window.scrollTo(0, scrollY);
    delete body.dataset.scrollY;
  }

  return () => {
    const scrollY = parseInt(body.dataset.scrollY || "0", 10);

    body.style.overflow = "";
    body.style.position = "";
    body.style.top = "";
    body.style.width = "";
    body.style.paddingRight = "";

    if (scrollY) window.scrollTo(0, scrollY);
    delete body.dataset.scrollY;
  };
}, [introDone, checked]);

  const handleFinish = () => {
    try {
      localStorage.setItem("intro_seen_global", "1");
    } catch (e) {}

    setIntroDone(true);
  };

  if (!checked) return null;

  return (
    <>
      {!introDone ? (
        <WelcomeIntro messages={messages} locale={locale} onFinish={handleFinish} />
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
