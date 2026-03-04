import AdvisoryForm from "@/components/legalresponse/AdvisoryForm";
import Disclaimer from "@/components/legalresponse/Disclaimer";
import Hero from "@/components/legalresponse/Hero";
import Navbar from "@/components/legalresponse/Navbar";
import Steps from "@/components/legalresponse/Steps";
import { getMessages } from "@/i18n/getMessages";

export default async function Page({ params }) {
  const { locale } = await params;
  const messages = await getMessages(locale);

  return (
    <div className="bg-[#f5f7fa] min-h-screen font-[Segoe_UI]">

      <Navbar locale={locale} />

      <Hero />

      <Steps  />

      <AdvisoryForm />

      <Disclaimer />

    </div>
  );
}
