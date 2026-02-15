import ContactSection from "@/components/consultations/ContactSection";
import FAQSection from "@/components/consultations/FAQSection";
import FloatingActions from "@/components/consultations/FloatingActions";
import Footer from "@/components/consultations/Footer";
import GoogleReviews from "@/components/consultations/GoogleReviews";
import HeroSection from "@/components/consultations/HeroSection";
import MissionSection from "@/components/consultations/MissionSection";
import Navbar from "@/components/consultations/Navbar";
import ProcessSection from "@/components/consultations/ProcessSection";
import Services from "@/components/consultations/Services";
import StatsSection from "@/components/consultations/StatsSection";
import WhyUs from "@/components/consultations/WhyUs";

import { getMessages } from "@/i18n/getMessages";


// ✅ META TAGS (SEO)
export async function generateMetadata({ params }) {
  const { locale } = await params;
  const isArabic = locale === "ar";

  const title = isArabic
    ? "استشارة قانونية من خبير في الإمارات | مكتب علي الخاجة للمحاماة"
    : "Expert Legal Consultation in UAE | Ali Al Khajeh Law Office";

  const description = isArabic
    ? "احصل على استشارة قانونية شاملة من مكتب علي الخاجة للمحاماة بخبرة تتجاوز 20 عاماً في القضايا التجارية، المدنية، الجنائية، والأحوال الشخصية. وضوح، أمان، وقرار قانوني صحيح."
    : "Get comprehensive legal consultation from Ali Al Khajeh Law Office with over 20 years of experience in commercial, civil, criminal, and personal status matters. Clarity, security, and the right legal decision.";

  return {
    title,
    description,

    keywords: isArabic
      ? [
          "استشارة قانونية الإمارات",
          "محامي في الإمارات",
          "مكتب محاماة دبي",
          "استشارات قانونية تجارية",
          "استشارات قانونية مدنية",
          "محامي قضايا جنائية",
          "محامي أحوال شخصية"
        ]
      : [
          "Legal Consultation UAE",
          "Law Firm Dubai",
          "Lawyer in UAE",
          "Commercial Legal Advice UAE",
          "Civil Lawyer UAE",
          "Criminal Lawyer UAE",
          "Personal Status Lawyer UAE"
        ],

    openGraph: {
      title,
      description,
      url: "https://contact.alialkhajeh.ae/consultations",
      siteName: "Ali Al Khajeh Law Office",
      locale: isArabic ? "ar_AE" : "en_US",
      type: "website",
      images: [
        {
          url: "https://contact.alialkhajeh.ae/LOGO-PNG.png",
          width: 1200,
          height: 630,
          alt: isArabic
            ? "مكتب علي الخاجة للمحاماة - استشارات قانونية"
            : "Ali Al Khajeh Law Office - Legal Consultation"
        }
      ]
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["https://contact.alialkhajeh.ae/LOGO-PNG.png"]
    },

    alternates: {
      canonical: "https://contact.alialkhajeh.ae/consultations",
      languages: {
        ar: "https://contact.alialkhajeh.ae/ar/consultations",
        en: "https://contact.alialkhajeh.ae/en/consultations"
      }
    },

    robots: {
      index: true,
      follow: true
    }
  };
}



// ✅ PAGE CONTENT
export default async function Page({ params }) {
  const { locale } = await params;
  const messages = await getMessages(locale);

  return (
    <>
      <Navbar messages={messages} locale={locale} />
      <HeroSection locale={locale} messages={messages} />
      <GoogleReviews messages={messages} locale={locale} />
    <Services messages={messages} locale={locale} />
      <ContactSection messages={messages} locale={locale} />
      <WhyUs messages={messages} locale={locale} />
      <ProcessSection messages={messages} locale={locale} />
      <StatsSection messages={messages} locale={locale} />
      <FAQSection messages={messages} locale={locale} />
      <Footer messages={messages} locale={locale} />
      <FloatingActions
        phone="+971503090203"
        whatsapp="971503090203"
        messages={messages}
        locale={locale}
      />
    </>
  );
}
