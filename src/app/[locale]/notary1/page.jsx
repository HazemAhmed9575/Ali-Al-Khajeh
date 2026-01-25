import { getMessages } from "@/i18n/getMessages";
import { t } from "@/i18n/t";

import IntroGate from "@/components/notary1/IntroGate";
import Navbar from "@/components/notary1/Navbar";

import WhyUs from "@/components/notary1/sections/WhyUs";
import Services from "@/components/notary1/sections/Services";
import Steps from "@/components/notary1/sections/Steps";
import Faq from "@/components/notary1/sections/Faq";
import Reviews from "@/components/notary1/sections/Reviews";
import ContactSection from "@/components/notary1/sections/ContactSection";
import TrustedByUAE from "@/components/notary1/sections/TrustedByUAE";
import Footer from "@/components/notary1/Footer";
import FloatingActions from "@/components/notary1/FloatingActions";
import HeroSection from "@/components/notary1/sections/HeroSection";
import StatsCounter from "@/components/notary1/sections/StatsCounter";
import GoogleReviews from "@/components/notary1/sections/GoogleReviews";
import ConReviews from "@/components/notary1/sections/ConReviews";

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
