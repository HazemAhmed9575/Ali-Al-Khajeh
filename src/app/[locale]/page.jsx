import { getMessages } from "@/i18n/getMessages";
import { t } from "@/i18n/t";

import IntroGate from "@/components/IntroGate";
import Navbar from "@/components/Navbar";

import WhyUs from "@/components/sections/WhyUs";
import Services from "@/components/sections/Services";
import Steps from "@/components/sections/Steps";
import Faq from "@/components/sections/Faq";
import Reviews from "@/components/sections/Reviews";
import ContactSection from "@/components/sections/ContactSection";
import TrustedByUAE from "@/components/sections/TrustedByUAE";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import HeroSection from "@/components/sections/HeroSection";
import StatsCounter from "@/components/sections/StatsCounter";
import GoogleReviews from "@/components/sections/GoogleReviews";
import ConReviews from "@/components/sections/ConReviews";

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
      <HeroSection locale={locale} messages={messages}/>
      <StatsCounter messages={messages} locale={locale}/>
<ConReviews locale={locale} messages={messages}/>
      {/* Landing content */}
      <WhyUs messages={messages} locale={locale} />
{/* <TrustedByUAE locale={locale} messages={messages} /> */}
      <Steps messages={messages} locale={locale} />
      <Services messages={messages} locale={locale} />
      <Faq messages={messages} locale={locale} />
      <Footer messages={messages} locale={locale}  />
      <FloatingActions
        phone="+971503090203"
        whatsapp="971503090203"
      />
    </IntroGate>
  );
}
