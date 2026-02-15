"use client";
import React, { useEffect, useRef, useState } from 'react'

import PinsAnimation from '../ui/PinsAnimation';
import FreeConsultingSection from './FreeConsultingSection';
export default function ConReviews({messages, locale }) {
    const isRtl = locale === "ar";
    const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);


useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={sectionRef} className='relative'>
           <div className="absolute inset-0 top-48 z-10 opacity-35 pointer-events-none">
  {isVisible && <PinsAnimation isRtl={isRtl} />}
</div>
<FreeConsultingSection messages={messages} locale={locale}/>

    </div>
  )
}
