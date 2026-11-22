
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export const runtime = "nodejs";

// Each picture must match its PDF filename in Supabase.
const printableFiles: Record<string, string> = {
  turtle: "ocean-friends-turtle-printable.pdf",
  "cute-octopus": "ocean-friends-cute-octopus-printable.pdf",
  dolphin: "ocean-friends-dolphin-printable.pdf",
  "happy-crab": "ocean-friends-happy-crab-printable.pdf",
  "seashell-friends":
    "ocean-friends-seashell-friends-printable.pdf",
  shark: "ocean-friends-shark-printable.pdf",
  "smiling-jellyfish":
    "ocean-friends-smiling-jellyfish-printable.pdf",
  starfish: "ocean-friends-starfish-printable.pdf",
  "tropical-fish":
    "ocean-friends-tropical-fish-printable.pdf",
  whale: "ocean-friends-whale-printable.pdf",
};

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

    const params = new URL(request.url).searchParams;
    const sessionId = params.get("session_id");
    const pictureId = params.get("picture");

    if (!sessionId || !sessionId.startsWith("cs_")) {
      return NextResponse.json(
        { error: "Invalid checkout session" },
        { status: 400 }
      );
    }

    if (!pictureId || !printableFiles[pictureId]) {
      return NextResponse.json(
        { error: "Invalid coloring page" },
        { status: 400 }
      );
    }

    // Verify the purchase with Stripe.
    const stripe = new Stripe(stripeKey);

    const session =
      await stripe.checkout.sessions.retrieve(sessionId);

    if (
      session.payment_status !== "paid" ||
      session.status !== "complete" ||
      session.mode !== "payment" ||
      session.metadata?.product_id !==
        "ocean-friends-bundle" ||
      session.amount_total !== 299 ||
      session.currency !== "usd"
    ) {
      return NextResponse.json(
        { error: "Payment not verified" },
        { status: 403 }
      );
    }

    // Retrieve the five choices saved during checkout.
    const selectedPictures =
      session.metadata?.selected_pictures?.split(",") ?? [];

    if (
      selectedPictures.length !== 5 ||
      new Set(selectedPictures).size !== 5 ||
      !selectedPictures.every(
        (id) => Object.hasOwn(printableFiles, id)
      ) ||
      !selectedPictures.includes(pictureId)
    ) {
      return NextResponse.json(
        { error: "This picture is not in your purchase" },
        { status: 403 }
      );
    }

    const filePath = printableFiles[pictureId];
    const bucketName = "printable-files";

    // Generate a temporary private PDF link.
    const response = await fetch(
      `${supabaseUrl}/storage/v1/object/sign/${bucketName}/${encodeURIComponent(filePath)}`,
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
      console.error(
        "Supabase download error:",
        response.status,
        await response.text()
      );

      return NextResponse.json(
        { error: "Unable to generate download link" },
        { status: 502 }
      );
    }

    const data = await response.json();
    const signedPath = data.signedURL ?? data.signedUrl;

    if (typeof signedPath !== "string" || !signedPath) {
      throw new Error("Signed URL is missing");
    }

    const downloadUrl = signedPath.startsWith("http")
      ? signedPath
      : `${supabaseUrl}/storage/v1${
          signedPath.startsWith("/") ? "" : "/"
        }${signedPath}`;

    return NextResponse.redirect(downloadUrl, {
      headers: {
        "Cache-Control": "no-store",
        "Referrer-Policy": "no-referrer",
      },
    });
  } catch (error) {
    console.error("Bundle download error:", error);

    return NextResponse.json(
      { error: "Unable to prepare your download" },
      { status: 500 }
    );
  }
}
