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
  "christmas_01_tree_with_garland",
  "christmas_02_tree_with_bow",
  "christmas_03_ornament_wreath",
  "christmas_04_holiday_fireplace",
  "christmas_05_classic_tree",
  "christmas_06_evergreen_wreath",
  "christmas_07_snowflake_ornament",
  "christmas_08_christmas_sleigh",
  "christmas_09_christmas_bells",
  "christmas_10_snowy_cottage",
];
const thanksgivingIds = [
  "thanksgiving-dinner-table",
  "thanksgiving-family-thanksgiving-dinner",
  "thanksgiving-feast",
  "thanksgiving-harvest-boy",
  "thanksgiving-pilgrim-children",
  "thanksgiving-turkey-and-cornucopia",
  "thanksgiving-turkey-family",
  "thanksgiving_01_harvest_cornucopia",
  "thanksgiving_02_thanksgiving_dinner",
  "thanksgiving_03_harvest_basket",
  "thanksgiving_04_fruit_cornucopia",
  "thanksgiving_05_pumpkin_and_wheat",
  "thanksgiving_06_wild_turkey",
  "thanksgiving_07_apple_cornucopia",
  "thanksgiving_08_pumpkin_pie",
  "thanksgiving_09_sunflower_vase",
  "thanksgiving_10_apple_basket",
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
const farmIds = [
  "farm_01_cow",
  "farm_02_horse",
  "farm_03_sheep",
  "farm_04_goat",
  "farm_05_pig",
  "farm_06_rabbit",
  "farm_07_duck",
  "farm_08_rooster",
  "farm_09_hen",
  "farm_10_goose",
  "farm_11_donkey",
  "farm_12_llama",
  "farm_13_alpaca",
  "farm_14_turkey",
  "farm_15_calf",
  "farm_16_foal",
  "farm_17_lamb",
  "farm_18_chick",
  "farm_19_cat",
  "farm_20_dog"
];
const woodlandIds = [
  "woodland_01_baby_deer",
  "woodland_02_bunny_rabbit",
  "woodland_03_little_fox",
  "woodland_04_hedgehog",
  "woodland_05_squirrel",
  "woodland_06_owl",
  "woodland_07_raccoon",
  "woodland_08_bear_cub",
  "woodland_09_beaver",
  "woodland_10_chipmunk",
  "woodland_11_badger",
  "woodland_12_skunk",
  "woodland_13_woodpecker",
  "woodland_14_moose",
  "woodland_15_wolf_pup",
  "woodland_16_bobcat",
  "woodland_17_otter",
  "woodland_18_forest_turtle",
  "woodland_19_frog",
  "woodland_20_butterfly",
];
const activityLabels: Record<string, string> = {
  activity_brain_games: "Brain Games",
  activity_creative_activities: "Creative Activities",
  activity_little_learners: "Little Learners",
  activity_puzzles_and_mazes: "Puzzles & Mazes",
  activity_seasonal_fun: "Seasonal Fun",
  activity_word_fun: "Word Fun",
};
const activityCollections: Record<string, string[]> = Object.fromEntries(
  Object.keys(activityLabels).map(key => [key, Array.from({ length: 20 }, (_, i) => `${key}_${String(i + 1).padStart(2, "0")}`)])
);
const collections: Record<string, string[]> = { ...activityCollections, ocean: oceanIds, christmas: christmasIds, thanksgiving: thanksgivingIds, cozy: cozyIds, flowers: flowersIds, farm: farmIds, woodland: woodlandIds };
const allowedPictures = Object.values(collections).flat();
const collectionNames: Record<string, string> = { ...activityLabels, ocean: "Ocean Friends", christmas: "Christmas Collection", thanksgiving: "Thanksgiving Collection", cozy: "Cozy Little Moments", flowers: "Flowers & Butterflies", farm: "Farm Friends", woodland: "Woodland Friends", mixed: "Mix & Match" };
const bundles: Record<number, { price: number; name: string }> = {
  2: { price: 149, name: "Mini Bundle - 2 Printables" },
  5: { price: 299, name: "Little Bundle - 5 Printables" },
  10: { price: 499, name: "Happy Bundle - 10 Printables" },
  20: { price: 799, name: "Mega Bundle - 20 Printables" },
};
function createPictureMetadata(selectedPictures: string[]): Record<string, string> {
  const joined = selectedPictures.join(",");
  if (joined.length <= 500) return { selected_pictures: joined };
  const chunks: string[] = [];
  let current = "";
  for (const picture of selectedPictures) {
    const next = current ? `${current},${picture}` : picture;
    if (next.length > 500) { chunks.push(current); current = picture; }
    else { current = next; }
  }
  if (current) chunks.push(current);
  if (chunks.length > 3) throw new Error("Picture metadata exceeds supported length");
  const metadata: Record<string, string> = {};
  chunks.forEach((chunk, index) => { metadata[`selected_pictures_${index + 1}`] = chunk; });
  return metadata;
}
export async function POST(request: NextRequest) {
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeKey) return NextResponse.json({ error: "Stripe is not configured" }, { status: 500 });
  try {
    const body = await request.json();
    const selectedPictures = body?.selectedPictures;
    if (!Array.isArray(selectedPictures)) {
      return NextResponse.json({ error: "Please select your printables" }, { status: 400 });
    }
    const bundle = bundles[selectedPictures.length];
    if (!bundle || new Set(selectedPictures).size !== selectedPictures.length ||
      !selectedPictures.every((picture: unknown) => typeof picture === "string" && allowedPictures.includes(picture))) {
      return NextResponse.json({ error: "Please select 2, 5, 10, or 20 unique printables" }, { status: 400 });
    }
    const collection = Object.entries(collections).find(([, pictures]) =>
      selectedPictures.every(picture => pictures.includes(picture)))?.[0] ?? "mixed";
    const collectionName = collectionNames[collection];
    const pictureMetadata = createPictureMetadata(selectedPictures);
    const stripe = new Stripe(stripeKey);
    const origin = "https://noveaodelis.com";
    const requestedCollection = body.collection;
    const returnCollection = typeof requestedCollection === "string" &&
      (Object.prototype.hasOwnProperty.call(collections, requestedCollection) || ["animals", "animal", "holiday"].includes(requestedCollection))
      ? requestedCollection : collection;
    let cancelUrl = `${origin}/coloring-pages`;
    if (Object.prototype.hasOwnProperty.call(activityCollections, returnCollection)) cancelUrl = `${origin}/activity-center?collection=${returnCollection}`;
    else if (body.returnPage === "activity-center") cancelUrl = `${origin}/activity-center`;
    else if (returnCollection === "christmas") cancelUrl = `${origin}/holiday/christmas`;
    else if (["thanksgiving", "cozy", "flowers", "farm", "woodland", "ocean", "animals", "animal", "holiday"].includes(returnCollection)) {
      cancelUrl = `${origin}/coloring-pages?collection=${returnCollection}`;
    }
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      allow_promotion_codes: true,
      line_items: [{
        price_data: {
          currency: "usd",
          product_data: {
            name: `${collectionName} - ${bundle.name}`,
            description: `${selectedPictures.length} printable PDFs from NOVÉA ODELIS.`,
          },
          unit_amount: bundle.price,
        },
        quantity: 1,
      }],
      metadata: {
        product_id: "coloring-pages-bundle",
        collection,
        bundle_size: String(selectedPictures.length),
        ...pictureMetadata,
      },
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl,
    });
    if (!session.url) throw new Error("Stripe did not return a checkout URL");
    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json({ error: "Unable to create checkout session" }, { status: 500 });
  }
}
