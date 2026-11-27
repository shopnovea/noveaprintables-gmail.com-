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

const pictureNames: Record<string, string> = {
  "woodland_01_baby_deer": "Baby Deer",
  "woodland_02_bunny_rabbit": "Bunny Rabbit",
  "woodland_03_little_fox": "Little Fox",
  "woodland_04_hedgehog": "Hedgehog",
  "woodland_05_squirrel": "Squirrel",
  "woodland_06_owl": "Owl",
  "woodland_07_raccoon": "Raccoon",
  "woodland_08_bear_cub": "Bear Cub",
  "woodland_09_beaver": "Beaver",
  "woodland_10_chipmunk": "Chipmunk",
  "woodland_11_badger": "Badger",
  "woodland_12_skunk": "Skunk",
  "woodland_13_woodpecker": "Woodpecker",
  "woodland_14_moose": "Moose",
  "woodland_15_wolf_pup": "Wolf Pup",
  "woodland_16_bobcat": "Bobcat",
  "woodland_17_otter": "Otter",
  "woodland_18_forest_turtle": "Forest Turtle",
  "woodland_19_frog": "Frog",
  "woodland_20_butterfly": "Butterfly",

  "farm_01_cow": "Cow",
  "farm_02_horse": "Horse",
  "farm_03_sheep": "Sheep",
  "farm_04_goat": "Goat",
  "farm_05_pig": "Pig",
  "farm_06_rabbit": "Rabbit",
  "farm_07_duck": "Duck",
  "farm_08_rooster": "Rooster",
  "farm_09_hen": "Hen",
  "farm_10_goose": "Goose",
  "farm_11_donkey": "Donkey",
  "farm_12_llama": "Llama",
  "farm_13_alpaca": "Alpaca",
  "farm_14_turkey": "Turkey",
  "farm_15_calf": "Calf",
  "farm_16_foal": "Foal",
  "farm_17_lamb": "Lamb",
  "farm_18_chick": "Chick",
  "farm_19_cat": "Cat",
  "farm_20_dog": "Dog",

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
  "christmas_01_tree_with_garland": "Tree With Garland",
  "christmas_02_tree_with_bow": "Tree With Bow",
  "christmas_03_ornament_wreath": "Ornament Wreath",
  "christmas_04_holiday_fireplace": "Holiday Fireplace",
  "christmas_05_classic_tree": "Classic Tree",
  "christmas_06_evergreen_wreath": "Evergreen Wreath",
  "christmas_07_snowflake_ornament": "Snowflake Ornament",
  "christmas_08_christmas_sleigh": "Christmas Sleigh",
  "christmas_09_christmas_bells": "Christmas Bells",
  "christmas_10_snowy_cottage": "Snowy Cottage",
  "thanksgiving_01_harvest_cornucopia": "Harvest Cornucopia",
  "thanksgiving_02_thanksgiving_dinner": "Thanksgiving Dinner",
  "thanksgiving_03_harvest_basket": "Harvest Basket",
  "thanksgiving_04_fruit_cornucopia": "Fruit Cornucopia",
  "thanksgiving_05_pumpkin_and_wheat": "Pumpkin And Wheat",
  "thanksgiving_06_wild_turkey": "Wild Turkey",
  "thanksgiving_07_apple_cornucopia": "Apple Cornucopia",
  "thanksgiving_08_pumpkin_pie": "Pumpkin Pie",
  "thanksgiving_09_sunflower_vase": "Sunflower Vase",
  "thanksgiving_10_apple_basket": "Apple Basket",
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
  if (farmIds.includes(id)) return "farm";
  if (woodlandIds.includes(id)) return "woodland";
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
      : (collection === "ocean" || collection === "christmas" || collection === "thanksgiving" || collection === "cozy" || collection === "flowers" || collection === "farm" || collection === "woodland") &&
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
