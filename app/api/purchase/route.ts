 
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

  "christmas-cheerful-elf-and-christmas-tree-coloring-page":
    "Cheerful Elf and Christmas Tree",
  "christmas-festive-christmas-mantel-coloring-page":
    "Festive Christmas Mantel",
  "christmas-festive-christmas-wreath-coloring-page":
    "Festive Christmas Wreath",
  "christmas-festive-fireplace-gifts-and-stockings":
    "Festive Fireplace Gifts and Stockings",
  "christmas-festive-fireplace-stocking-scene":
    "Festive Fireplace Stocking Scene",
  "christmas-festive-penguin-with-gifts-and-snowflakes":
    "Festive Penguin with Gifts and Snowflakes",
  "christmas-festive-puppy-christmas-coloring-page":
    "Festive Christmas Puppy",
  "christmas-festive-reindeer-coloring-scene":
    "Festive Reindeer",
  "christmas-gingerbread-house-candy-wonderland":
    "Gingerbread House Candy Wonderland",
  "christmas-polar-bear-christmas-coloring-page":
    "Polar Bear Christmas",
  "christmas-polar-bears-snowy-gift-surprise":
    "Polar Bear's Snowy Gift Surprise",
  "christmas-santas-snowy-christmas-gift-scene":
    "Santa's Snowy Christmas Gift Scene",
  "christmas-snowman-decorating-a-christmas-tree":
    "Snowman Decorating a Christmas Tree",
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

    const requiredCount = isLegacyPurchase
      ? 5
      : Number(bundleSize);

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

    const collection = session.metadata?.collection ?? "ocean";

    const validCollection =
      (collection === "ocean" &&
        selected.every((id) => !id.startsWith("christmas-"))) ||
      (collection === "christmas" &&
        !isLegacyPurchase &&
        selected.every((id) => id.startsWith("christmas-")));

    if (!validCollection) {
      return NextResponse.json(
        { error: "Invalid collection" },
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
        collection,
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
