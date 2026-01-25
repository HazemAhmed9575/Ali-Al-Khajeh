import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_CMS_URL}/api/contact-us-submissions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    if (res.status === 200 || res.status === 201) {
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    return NextResponse.json({ ok: false }, { status: res.status });
  } catch (err) {
    console.error("API ERROR:", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
