import { getMessages } from "@/i18n/getMessages";
import IntroGate from "@/components/lawyer/IntroGate";
import Navbar from "@/components/lawyer/Navbar";
import WhyUs from "@/components/lawyer/sections/WhyUs";

import Faq from "@/components/lawyer/sections/Faq";
import Footer from "@/components/lawyer/Footer";
import FloatingActions from "@/components/lawyer/FloatingActions";
import HeroSection from "@/components/lawyer/sections/HeroSection";
import StatsCounter from "@/components/lawyer/sections/StatsCounter";
import ConReviews from "@/components/lawyer/sections/ConReviews";
import GoogleReviews from "@/components/lawyer/sections/GoogleReviews";
import AboutSection from "@/components/lawyer/sections/AboutSection";

export default async function Page({ params }) {
  const { locale } = await params;
  const messages = await getMessages(locale);

  return (
    <IntroGate messages={messages} locale={locale}>
      {/* top anchor */}
      <div id="top" />

      <Navbar messages={messages} locale={locale} />

      {/* spacing for fixed navbar */}
      <div className="" />
      <HeroSection locale={locale} messages={messages} />
      <StatsCounter messages={messages} locale={locale} />
      <WhyUs messages={messages} locale={locale} />
      {/* <GoogleReviews messages={messages} locale={locale} />
      <AboutSection messages={messages} locale={locale} /> */}
      <ConReviews locale={locale} messages={messages} />
      {/* <Faq messages={messages} locale={locale} /> */}

      <Footer messages={messages} locale={locale} />
      <FloatingActions
        phone="+971503090203"
        whatsapp="971503090203"
        messages={messages}
        locale={locale}
      />
    </IntroGate>
  );
}
