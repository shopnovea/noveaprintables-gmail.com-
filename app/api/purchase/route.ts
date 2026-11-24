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
const cozyIds = [
  "cozy-cat-reading-nook",
  "cozy-cat-window-seat-retreat",
  "cozy-cottage-kitchen-baking-scene",
  "cozy-crafting-nook-still-life",
  "cozy-fireplace-reading-nook",
  "cozy-heart-themed-kitchen-baking-scene",
  "cozy-heartfelt-baking-kitchen",
  "cozy-rainy-window-nook",
  "cozy-reading-nook-with-cat",
];
const flowersIds = [
  "flowers-ornate-butterfly-in-a-blooming-garden",
  "flowers-ornate-butterfly-over-floral-bouquet",
  "flowers-tropical-garden-with-butterflies",
  "flowers-botanical-bouquet-with-butterfly-and-bow",
  "flowers-botanical-bouquet-with-butterfly",
  "flowers-botanical-hibiscus-and-butterfly-garden",
  "flowers-botanical-lily-bouquet-with-butterfly",
  "flowers-butterfly-among-garden-blooms",
  "flowers-butterfly-on-a-hibiscus-garden",
  "flowers-daisy-garden-with-ornate-butterfly",
  "flowers-detailed-floral-bouquet-in-mason-jar",
  "flowers-floral-mason-jar-coloring-page",
  "flowers-hibiscus-bouquet-with-butterfly",
  "flowers-hibiscus-garden-with-butterfly",
  "flowers-intricate-botanical-blooms-and-butterflies",
  "flowers-intricate-floral-bouquet-with-butterfly",
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
  "thanksgiving-turkey-family": "Turkey Family",
  "cozy-cat-reading-nook": "Cozy Cat Reading Nook",
  "cozy-cat-window-seat-retreat": "Cozy Cat Window Seat Retreat",
  "cozy-cottage-kitchen-baking-scene": "Cozy Cottage Kitchen Baking Scene",
  "cozy-crafting-nook-still-life": "Cozy Crafting Nook Still Life",
  "cozy-fireplace-reading-nook": "Cozy Fireplace Reading Nook",
  "cozy-heart-themed-kitchen-baking-scene": "Cozy Heart Themed Kitchen Baking Scene",
  "cozy-heartfelt-baking-kitchen": "Cozy Heartfelt Baking Kitchen",
  "cozy-rainy-window-nook": "Cozy Rainy Window Nook",
  "cozy-reading-nook-with-cat": "Cozy Reading Nook with Cat",
  "flowers-ornate-butterfly-in-a-blooming-garden": "Ornate Butterfly in a Blooming Garden",
  "flowers-ornate-butterfly-over-floral-bouquet": "Ornate Butterfly Over Floral Bouquet",
  "flowers-tropical-garden-with-butterflies": "Tropical Garden with Butterflies",
  "flowers-botanical-bouquet-with-butterfly-and-bow": "Botanical Bouquet with Butterfly and Bow",
  "flowers-botanical-bouquet-with-butterfly": "Botanical Bouquet with Butterfly",
  "flowers-botanical-hibiscus-and-butterfly-garden": "Botanical Hibiscus and Butterfly Garden",
  "flowers-botanical-lily-bouquet-with-butterfly": "Botanical Lily Bouquet with Butterfly",
  "flowers-butterfly-among-garden-blooms": "Butterfly Among Garden Blooms",
  "flowers-butterfly-on-a-hibiscus-garden": "Butterfly on a Hibiscus Garden",
  "flowers-daisy-garden-with-ornate-butterfly": "Daisy Garden with Ornate Butterfly",
  "flowers-detailed-floral-bouquet-in-mason-jar": "Detailed Floral Bouquet in Mason Jar",
  "flowers-floral-mason-jar-coloring-page": "Floral Mason Jar Coloring Page",
  "flowers-hibiscus-bouquet-with-butterfly": "Hibiscus Bouquet with Butterfly",
  "flowers-hibiscus-garden-with-butterfly": "Hibiscus Garden with Butterfly",
  "flowers-intricate-botanical-blooms-and-butterflies": "Intricate Botanical Blooms and Butterflies",
  "flowers-intricate-floral-bouquet-with-butterfly": "Intricate Floral Bouquet with Butterfly",
};
const bundlePrices: Record<string, number> = { "2": 149, "5": 299, "10": 499, "20": 799 };
function hasPicture(id: string) {
  return Object.prototype.hasOwnProperty.call(pictureNames, id);
}
function pictureCollection(id: string) {
  if (oceanIds.includes(id)) return "ocean";
  if (christmasIds.includes(id)) return "christmas";
  if (thanksgivingIds.includes(id)) return "thanksgiving";
  if (cozyIds.includes(id)) return "cozy";
  if (flowersIds.includes(id)) return "flowers";
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
    const collections = new Set<string>(selectedPictures.map(pictureCollection));
    const validCollection = isLegacyPurchase
      ? collection === "ocean" && collections.size === 1 && collections.has("ocean")
      : collection === "mixed" ? collections.size >= 2
      : (collection === "ocean" || collection === "christmas" || collection === "thanksgiving" || collection === "cozy" || collection === "flowers") &&
        collections.size === 1 && collections.has(collection);
    if (collections.has("unknown") || !validCollection) {
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
