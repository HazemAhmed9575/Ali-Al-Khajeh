import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default function Page() {
  const acceptLanguage = headers().get("accept-language") || "";
  const isArabic = acceptLanguage.toLowerCase().includes("ar");

  redirect(isArabic ? "/ar" : "/en");
}
