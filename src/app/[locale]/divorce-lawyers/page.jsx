import ContactSection from "@/components/divorce-lawyers/ContactSection";
import FAQSection from "@/components/divorce-lawyers/FAQSection";
import FloatingActions from "@/components/divorce-lawyers/FloatingActions";
import Footer from "@/components/divorce-lawyers/Footer";
import GoogleReviews from "@/components/divorce-lawyers/GoogleReviews";
import HeroSection from "@/components/divorce-lawyers/HeroSection";
import MissionSection from "@/components/divorce-lawyers/MissionSection";
import Navbar from "@/components/divorce-lawyers/Navbar";
import ProcessSection from "@/components/divorce-lawyers/ProcessSection";
import StatsSection from "@/components/divorce-lawyers/StatsSection";
import { getMessages } from "@/i18n/getMessages";


// ✅ META TAGS (SEO)
export async function generateMetadata({ params }) {
  const { locale } = params;
  const isArabic = locale === "ar";

  const title = isArabic
    ? "محامي طلاق وخلع في الإمارات | مكتب علي الخاجة للمحاماة"
    : "Divorce & Khula Lawyer in UAE | Ali Al Khajeh Law Office";

  const description = isArabic
    ? "خبراء في قضايا الطلاق والخلع وفق قانون الأحوال الشخصية الإماراتي الجديد. نضمن أقل الخسائر، سرية تامة، واستشارة قانونية فورية لحماية مستقبلك ومستقبل أبنائك."
    : "Experts in Divorce and Khula cases under the new UAE Personal Status Law. We ensure minimal losses, complete confidentiality, and immediate legal consultation to protect your future and your children's future.";

  return {
    title,
    description,
    keywords: isArabic
      ? [
          "محامي طلاق",
          "محامي خلع",
          "قانون الأحوال الشخصية الإمارات",
          "محامي أسرة دبي",
          "استشارة قانونية طلاق",
          "طلاق للضرر"
        ]
      : [
          "Divorce Lawyer UAE",
          "Khula Lawyer Dubai",
          "UAE Personal Status Law",
          "Family Lawyer UAE",
          "Divorce Legal Consultation",
          "Khula Procedure UAE"
        ],

    openGraph: {
      title,
      description,
      url: "https:/contact.alialkhajeh.ae/divorce-lawyers",
      siteName: "Ali Al Khajeh Law Office",
      locale: isArabic ? "ar_AE" : "en_US",
      type: "website",
      images: [
        {
          url: "https:/contact.alialkhajeh.ae/LOGO-PNG.png",
          width: 1200,
          height: 630,
          alt: isArabic
            ? "مكتب علي الخاجة للمحاماة - قضايا الطلاق والخلع"
            : "Ali Al Khajeh Law Office - Divorce & Khula Lawyers"
        }
      ]
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["https:/contact.alialkhajeh.ae/LOGO-PNG.png"]
    },

    alternates: {
      canonical: "https:/contact.alialkhajeh.ae/divorce-lawyers",
      languages: {
        ar: "https:/contact.alialkhajeh.ae/ar/divorce-lawyers",
        en: "https:/contact.alialkhajeh.ae/en/divorce-lawyers"
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
      <ContactSection messages={messages} locale={locale} />
      <MissionSection messages={messages} locale={locale} />
      <GoogleReviews messages={messages} locale={locale} />
      <ProcessSection messages={messages} locale={locale} />
      <StatsSection messages={messages} locale={locale} />
      <FAQSection messages={messages} locale={locale} />
      <Footer messages={messages} locale={locale} />
      {/* <FloatingActions
        phone="+971503090203"
        whatsapp="971503090203"
        messages={messages}
        locale={locale}
      /> */}
    </>
  );
}
