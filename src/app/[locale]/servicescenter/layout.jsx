export default async function Notary1Layout({ children, params }) {
  const { locale } = await params;
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <section dir={dir} lang={locale} className="min-h-screen">
      {children}
    </section>
  );
}
