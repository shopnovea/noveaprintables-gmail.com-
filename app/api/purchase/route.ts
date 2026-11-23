
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export const runtime = "nodejs";

const pictureNames: Record<string, string> = {
  turtle: "Sea Turtle",
  "cute-octopus": "Cute Octopus",
  dolphin: "Dolphin",
  "happy-crab": "Happy Crab",
  "seashell-friends": "Seashell Friends",
  shark: "Shark",
  "smiling-jellyfish": "Smiling Jellyfish",
  starfish: "Starfish",
  "tropical-fish": "Tropical Fish",
  whale: "Whale",
};

const bundlePrices: Record<string, number> = {
  "2": 149,
  "5": 299,
  "10": 499,
  "20": 799,
};

export async function GET(request: NextRequest) {
  try {
    const stripeKey = process.env.STRIPE_SECRET_KEY;

    if (!stripeKey) {
      return NextResponse.json(
        { error: "Stripe is not configured" },
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

    const isLegacyPurchase =
      session.metadata?.product_id === "ocean-friends-bundle" &&
      session.amount_total === 299;

    const bundleSize = session.metadata?.bundle_size ?? "";
    const expectedPrice = bundlePrices[bundleSize];

    const isNewPurchase =
      session.metadata?.product_id === "coloring-pages-bundle" &&
      expectedPrice !== undefined &&
      session.amount_total === expectedPrice;

    if (
      session.payment_status !== "paid" ||
      session.status !== "complete" ||
      session.mode !== "payment" ||
      session.currency !== "usd" ||
      (!isLegacyPurchase && !isNewPurchase)
    ) {
      return NextResponse.json(
        { error: "Payment not verified" },
        { status: 403 }
      );
    }

    const selected =
      session.metadata?.selected_pictures?.split(",") ?? [];

    const requiredCount = isLegacyPurchase ? 5 : Number(bundleSize);

    if (
      selected.length !== requiredCount ||
      new Set(selected).size !== requiredCount ||
      !selected.every((id) =>
        Object.prototype.hasOwnProperty.call(pictureNames, id)
      )
    ) {
      return NextResponse.json(
        { error: "Invalid picture selections" },
        { status: 403 }
      );
    }

    const pictures = selected.map((id) => ({
      id,
      name: pictureNames[id],
    }));

    return NextResponse.json(
      {
        pictures,
        bundle_size: requiredCount,
        amount_paid: session.amount_total,
      },
      {
        headers: {
          "Cache-Control": "no-store",
          "Referrer-Policy": "no-referrer",
        },
      }
    );
  } catch (error) {
    console.error("Purchase verification error:", error);

    return NextResponse.json(
      { error: "Unable to verify purchase" },
      { status: 500 }
    );
  }
}
