import { NextResponse } from "next/server";

export function middleware(request) {
  const acceptLanguage = request.headers.get("accept-language") || "";
  const isArabic = acceptLanguage.toLowerCase().includes("ar");

  const locale = isArabic ? "ar" : "en";

  const url = request.nextUrl.clone();
  url.pathname = `/${locale}`;

  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/"],
};
