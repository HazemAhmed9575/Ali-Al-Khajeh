import { NextResponse } from "next/server";

export function middleware(req) {
  const { pathname } = req.nextUrl;

  // ✅ لو داخل /ar أو /en خلاص
  if (pathname.startsWith("/ar") || pathname.startsWith("/en")) {
    return NextResponse.next();
  }

  const accept = req.headers.get("accept-language") || "";
  const isArabic = accept.toLowerCase().includes("ar");

  return NextResponse.redirect(new URL(isArabic ? "/ar" : "/en", req.url));
}

export const config = {
  matcher: ["/"],
};
