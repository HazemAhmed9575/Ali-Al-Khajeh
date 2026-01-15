// src/app/[locale]/layout.jsx

export async function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ar" }];
}

export async function generateMetadata({ params }) {
  const { locale } = params;

  const seo = {
    en: {
      title:
        "Ali Al Khajeh Law Firm | Certified Notary Services at Your Location",
      description:
        "Licensed private notary. We save your time and come to you to complete official contracts and legal transactions quickly and confidentially.",
      keywords:
        "Ali Al Khajeh, law firm, notary, private notary, legal services UAE, contracts, document attestation, certified notary",
    },
    ar: {
      title: "مكتب علي الخاجة للمحاماة | كاتب عدل معتمد يصلك أينما كنت",
      description:
        "كاتب عدل خاص معتمد. نوثق عقودك ومعاملاتك الرسمية وأنت في مكانك بسرية تامة وسرعة عالية.",
      keywords:
        "مكتب علي الخاجة, محاماة, كاتب عدل, كاتب عدل خاص, خدمات قانونية الامارات, توثيق عقود, تصديق مستندات, كاتب عدل معتمد",
    },
  };

  const data = seo[locale] || seo.en;

  return {
    title: data.title,
    description: data.description,
    keywords: data.keywords,

    robots: {
      index: true,
      follow: true,
    },

    alternates: {
      languages: {
        en: "/en",
        ar: "/ar",
      },
    },

    openGraph: {
      title: data.title,
      description: data.description,
      type: "website",
      locale: locale === "ar" ? "ar_AE" : "en_US",
      siteName: "Ali Al Khajeh Law Firm",
    },

    twitter: {
      card: "summary_large_image",
      title: data.title,
      description: data.description,
    },
  };
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <body>{children}</body>
    </html>
  );
}
