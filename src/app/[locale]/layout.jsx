import { notFound } from "next/navigation";

const locales = ["en", "ar"];

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;

  if (!locales.includes(locale)) notFound();

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <body>{children}</body>
    </html>
  );
}
