import { getMessages } from "@/i18n/getMessages";
import IntroGate from "@/components/corporate-issues/IntroGate";
import Navbar from "@/components/corporate-issues/Navbar";
import WhyUs from "@/components/corporate-issues/sections/WhyUs";
import Services from "@/components/corporate-issues/sections/Services";
import Steps from "@/components/corporate-issues/sections/Steps";
import Faq from "@/components/corporate-issues/sections/Faq";
import Footer from "@/components/corporate-issues/Footer";
import FloatingActions from "@/components/corporate-issues/FloatingActions";
import HeroSection from "@/components/corporate-issues/sections/HeroSection";
import StatsCounter from "@/components/corporate-issues/sections/StatsCounter";
import ConReviews from "@/components/corporate-issues/sections/ConReviews";


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
      <Faq messages={messages} locale={locale} />

<ConReviews locale={locale} messages={messages}/>
      {/* Landing content */}
      <WhyUs messages={messages} locale={locale} />
      <Services messages={messages} locale={locale} />
      <Steps messages={messages} locale={locale} />
      <Footer messages={messages} locale={locale}  />
      <FloatingActions
        phone="+971503090203"
        whatsapp="971503090203"
        messages={messages} locale={locale}
      />
    </IntroGate>
  );
}
