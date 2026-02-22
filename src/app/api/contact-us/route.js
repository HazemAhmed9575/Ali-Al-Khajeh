import { NextResponse } from "next/server";

export async function POST(req) {

  try {

    const incoming = await req.json();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_CMS_URL}/api/contact-us-submissions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        // 🔥 هنا الصح
        body: JSON.stringify({
          data: incoming.data
        }),

      }
    );

    const data = await res.json();

    console.log("STRAPI RESPONSE:", data);

    if (!res.ok) {
      return NextResponse.json({ success: false }, { status: res.status });
    }

    return NextResponse.json({ success: true });

  } catch (err) {
    console.log(err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}


