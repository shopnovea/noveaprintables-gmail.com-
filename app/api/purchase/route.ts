import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export const runtime = "nodejs";

const oceanIds = ["turtle", "cute-octopus", "dolphin", "happy-crab", "seashell-friends", "shark", "smiling-jellyfish", "starfish", "tropical-fish", "whale"];
const christmasIds = [
  "christmas-cheerful-elf-and-christmas-tree-coloring-page",
  "christmas-festive-christmas-mantel-coloring-page",
  "christmas-festive-christmas-wreath-coloring-page",
  "christmas-festive-fireplace-gifts-and-stockings",
  "christmas-festive-fireplace-stocking-scene",
  "christmas-festive-penguin-with-gifts-and-snowflakes",
  "christmas-festive-puppy-christmas-coloring-page",
  "christmas-festive-reindeer-coloring-scene",
  "christmas-gingerbread-house-candy-wonderland",
  "christmas-polar-bear-christmas-coloring-page",
  "christmas-polar-bears-snowy-gift-surprise",
  "christmas-santas-snowy-christmas-gift-scene",
  "christmas-snowman-decorating-a-christmas-tree",
];
const thanksgivingIds = [
  "thanksgiving-dinner-table",
  "thanksgiving-family-thanksgiving-dinner",
  "thanksgiving-feast",
  "thanksgiving-harvest-boy",
  "thanksgiving-pilgrim-children",
  "thanksgiving-turkey-and-cornucopia",
  "thanksgiving-turkey-family",
];
const pictureNames: Record<string, string> = {
  "turtle": "Sea Turtle",
  "cute-octopus": "Cute Octopus",
  "dolphin": "Dolphin",
  "happy-crab": "Happy Crab",
  "seashell-friends": "Seashell Friends",
  "shark": "Shark",
  "smiling-jellyfish": "Smiling Jellyfish",
  "starfish": "Starfish",
  "tropical-fish": "Tropical Fish",
  "whale": "Whale",
  "christmas-cheerful-elf-and-christmas-tree-coloring-page": "Cheerful Elf and Christmas Tree",
  "christmas-festive-christmas-mantel-coloring-page": "Festive Christmas Mantel",
  "christmas-festive-christmas-wreath-coloring-page": "Festive Christmas Wreath",
  "christmas-festive-fireplace-gifts-and-stockings": "Festive Fireplace Gifts and Stockings",
  "christmas-festive-fireplace-stocking-scene": "Festive Fireplace Stocking Scene",
  "christmas-festive-penguin-with-gifts-and-snowflakes": "Festive Penguin with Gifts and Snowflakes",
  "christmas-festive-puppy-christmas-coloring-page": "Festive Christmas Puppy",
  "christmas-festive-reindeer-coloring-scene": "Festive Reindeer",
  "christmas-gingerbread-house-candy-wonderland": "Gingerbread House Candy Wonderland",
  "christmas-polar-bear-christmas-coloring-page": "Polar Bear Christmas",
  "christmas-polar-bears-snowy-gift-surprise": "Polar Bear's Snowy Gift Surprise",
  "christmas-santas-snowy-christmas-gift-scene": "Santa's Snowy Christmas Gift Scene",
  "christmas-snowman-decorating-a-christmas-tree": "Snowman Decorating a Christmas Tree",
  "thanksgiving-dinner-table": "Thanksgiving Dinner Table",
  "thanksgiving-family-thanksgiving-dinner": "Family Thanksgiving Dinner",
  "thanksgiving-feast": "Thanksgiving Feast",
  "thanksgiving-harvest-boy": "Harvest Boy",
  "thanksgiving-pilgrim-children": "Pilgrim Children",
  "thanksgiving-turkey-and-cornucopia": "Turkey and Cornucopia",
  "thanksgiving-turkey-family": "Turkey Family"
};
const bundlePrices: Record<string, number> = { "2": 149, "5": 299, "10": 499, "20": 799 };
function hasPicture(id: string) {
  return Object.prototype.hasOwnProperty.call(pictureNames, id);
}
function pictureCollection(id: string) {
  if (oceanIds.includes(id)) return "ocean";
  if (christmasIds.includes(id)) return "christmas";
  if (thanksgivingIds.includes(id)) return "thanksgiving";
  return "unknown";
}
export async function GET(request: NextRequest) {
  try {
    const stripeKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeKey) {
      return NextResponse.json({ error: "Stripe is not configured" }, { status: 500 });
    }
    const params = new URL(request.url).searchParams;
    const sessionId = params.get("session_id");
    if (!sessionId || !sessionId.startsWith("cs_")) {
      return NextResponse.json({ error: "Invalid checkout session" }, { status: 400 });
    }
    const stripe = new Stripe(stripeKey);
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const bundleSize = session.metadata?.bundle_size ?? "";
    const expectedPrice = bundlePrices[bundleSize];
    const subtotal = session.amount_subtotal;
    const total = session.amount_total;
    const discount = session.total_details?.amount_discount ?? 0;
    const validAmounts = typeof subtotal === "number" && typeof total === "number" &&
      Number.isInteger(subtotal) && Number.isInteger(total) && Number.isInteger(discount) &&
      discount >= 0 && discount <= subtotal && total >= 0 && total === subtotal - discount &&
      (session.total_details?.amount_tax ?? 0) === 0 && (session.total_details?.amount_shipping ?? 0) === 0;
    const validPayment = (session.payment_status === "paid" && typeof total === "number" && total > 0) ||
      ((session.payment_status === "paid" || session.payment_status === "no_payment_required") &&
        total === 0 && typeof subtotal === "number" && subtotal > 0 && discount === subtotal);
    const isLegacyPurchase = session.metadata?.product_id === "ocean-friends-bundle" &&
      session.amount_total === 299 && session.payment_status === "paid";
    const isNewPurchase = session.metadata?.product_id === "coloring-pages-bundle" &&
      ["2", "5", "10", "20"].includes(bundleSize) && subtotal === expectedPrice && validAmounts && validPayment;
    if (session.status !== "complete" || session.mode !== "payment" || session.currency !== "usd" ||
      (!isLegacyPurchase && !isNewPurchase)) {
      return NextResponse.json({ error: "Payment not verified" }, { status: 403 });
    }
    const selectedPictures = (session.metadata?.selected_pictures ?? [
      session.metadata?.selected_pictures_1, session.metadata?.selected_pictures_2,
      session.metadata?.selected_pictures_3,
    ].filter(Boolean).join(",")).split(",").filter(Boolean);
    const requiredCount = isLegacyPurchase ? 5 : Number(bundleSize);
    if (selectedPictures.length !== requiredCount || new Set(selectedPictures).size !== requiredCount ||
      !selectedPictures.every(hasPicture)) {
      return NextResponse.json({ error: "Invalid picture selections" }, { status: 403 });
    }
    const collection = session.metadata?.collection ?? "ocean";
    const collections = new Set(selectedPictures.map(pictureCollection));
    const validCollection = isLegacyPurchase
      ? collection === "ocean" && collections.size === 1 && collections.has("ocean")
      : collection === "mixed" ? collections.size >= 2
      : collections.size === 1 && collections.has(collection);
    if (!validCollection) {
      return NextResponse.json({ error: "Invalid collection" }, { status: 403 });
    }
    const pictures = selectedPictures.map(id => ({ id, name: pictureNames[id] }));
    return NextResponse.json({
      pictures,
      collection,
      bundle_size: requiredCount,
      amount_paid: session.amount_total,
    }, { headers: { "Cache-Control": "no-store", "Referrer-Policy": "no-referrer" } });
  } catch (error) {
    console.error("Purchase verification error:", error);
    return NextResponse.json({ error: "Unable to verify purchase" }, { status: 500 });
  }
}
