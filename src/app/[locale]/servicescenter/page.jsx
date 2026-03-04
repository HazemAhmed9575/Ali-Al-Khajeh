import { getMessages } from "@/i18n/getMessages";
import Navbar from "@/components/servicescenter/Navbar";
import Hero from "@/components/servicescenter/Hero";
import LawyerSection from "@/components/servicescenter/LawyerSection";
import StatsSection from "@/components/servicescenter/StatsSection";
import FormsSection from "@/components/servicescenter/FormsSection";
import ReviewsSection from "@/components/servicescenter/ReviewsSection";
import Footer from "@/components/servicescenter/Footer";

export default async function Page({ params }) {
  const { locale } = await params;
  const messages = await getMessages(locale);

  return (
    <div className="bg-white text-[#0a1d37] min-h-screen">

      <Navbar messages={messages} locale={locale} />
<Hero messages={messages} locale={locale} />
<LawyerSection  messages={messages} locale={locale} />
 <StatsSection  messages={messages} locale={locale} />
      <FormsSection  messages={messages} locale={locale} />
      <ReviewsSection messages={messages} locale={locale} />
      <Footer messages={messages} locale={locale} />
    </div>
  );
}