
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  try {
    const stripeKey = process.env.STRIPE_SECRET_KEY;
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!stripeKey || !supabaseUrl || !supabaseKey) {
      return NextResponse.json(
        { error: "Download service is not configured" },
        { status: 500 }
      );
    }

    const sessionId = new URL(request.url).searchParams.get(
      "session_id"
    );

    if (!sessionId || !sessionId.startsWith("cs_")) {
      return NextResponse.json(
        { error: "Invalid checkout session" },
        { status: 400 }
      );
    }

    const stripe = new Stripe(stripeKey);
    const session = await stripe.checkout.sessions.retrieve(
      sessionId
    );

    if (
      session.payment_status !== "paid" ||
      session.status !== "complete" ||
      session.mode !== "payment" ||
      session.metadata?.product_id !== "ocean-friends" ||
      session.amount_total !== 75 ||
      session.currency !== "usd"
    ) {
      return NextResponse.json(
        { error: "Payment not verified" },
        { status: 403 }
      );
    }

    const filePath = "ocean-friends-turtle-printable.pdf";

    const response = await fetch(
      `${supabaseUrl}/storage/v1/object/sign/printable-files/${filePath}`,
      {
        method: "POST",
       
headers: {
  apikey: supabaseKey,
  "Content-Type": "application/json",
},

        body: JSON.stringify({ expiresIn: 60 }),
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error("Unable to generate download link");
    }

    const data = await response.json();

    if (!data.signedURL) {
      throw new Error("Signed URL is missing");
    }

    const downloadUrl = new URL(
      data.signedURL,
      `${supabaseUrl}/storage/v1/`
    ).toString();

    return NextResponse.redirect(downloadUrl, {
      headers: {
        "Cache-Control": "no-store",
        "Referrer-Policy": "no-referrer",
      },
    });
  } catch (error) {
    console.error("Secure download error:", error);

    return NextResponse.json(
      { error: "Unable to prepare your download" },
      { status: 500 }
    );
  }
}
