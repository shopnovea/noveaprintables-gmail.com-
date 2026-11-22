
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  try {
    const stripeKey = process.env.STRIPE_SECRET_KEY;
    const supabaseUrl =
      process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
    const supabaseKey =
      process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();

    if (!stripeKey || !supabaseUrl || !supabaseKey) {
      return NextResponse.json(
        { error: "Download service is not configured" },
        { status: 500 }
      );
    }

    // Get the customer's Stripe checkout session.
    const sessionId = new URL(request.url).searchParams.get(
      "session_id"
    );

    if (!sessionId || !sessionId.startsWith("cs_")) {
      return NextResponse.json(
        { error: "Invalid checkout session" },
        { status: 400 }
      );
    }

    // Verify the payment directly with Stripe.
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

    // PDF stored in the private Supabase bucket.
    const filePath = "ocean-friends-turtle-printable.pdf";
    const bucketName = "printable-files";

    // Request a temporary download link from Supabase.
    const response = await fetch(
      `${supabaseUrl}/storage/v1/object/sign/${bucketName}/${filePath}`,
      {
        method: "POST",
        headers: {
          apikey: supabaseKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          expiresIn: 60,
        }),
        cache: "no-store",
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        "Supabase signed URL request failed:",
        response.status,
        errorText
      );

      return NextResponse.json(
        { error: "Unable to generate PDF download link" },
        { status: 502 }
      );
    }

    const data = await response.json();

    const signedPath = data.signedURL ?? data.signedUrl;

    if (
      typeof signedPath !== "string" ||
      !signedPath
    ) {
      throw new Error("Supabase signed URL is missing");
    }

    // Build the correct Supabase download URL.
    const downloadUrl = signedPath.startsWith("http")
      ? signedPath
      : `${supabaseUrl}/storage/v1${
          signedPath.startsWith("/") ? "" : "/"
        }${signedPath}`;

    // Redirect the verified purchaser to the PDF.
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
