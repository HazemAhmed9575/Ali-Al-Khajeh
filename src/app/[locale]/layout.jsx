import { getMessages } from "@/i18n/getMessages";

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;
  const messages = getMessages(locale);

  return (
    <div dir={locale === "ar" ? "rtl" : "ltr"} lang={locale}>
      {children}
    </div>
  );
}