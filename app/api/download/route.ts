
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export const runtime = "nodejs";

const oceanIds = [
  "turtle",
  "cute-octopus",
  "dolphin",
  "happy-crab",
  "seashell-friends",
  "shark",
  "smiling-jellyfish",
  "starfish",
  "tropical-fish",
  "whale",
];

const newChristmasIds = [
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

const newThanksgivingIds = [
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
  ...newChristmasIds,
];

const thanksgivingIds = [
  "thanksgiving-dinner-table",
  "thanksgiving-family-thanksgiving-dinner",
  "thanksgiving-feast",
  "thanksgiving-harvest-boy",
  "thanksgiving-pilgrim-children",
  "thanksgiving-turkey-and-cornucopia",
  "thanksgiving-turkey-family",
  ...newThanksgivingIds,
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
  "farm_20_dog",
];

const newPictureIds = new Set([
  ...farmIds,
  ...newChristmasIds,
  ...newThanksgivingIds,
]);

const printableFiles: Record<string, string> = Object.fromEntries([
  ...oceanIds.map(id => [
    id,
    `ocean-friends-${id}-printable.pdf`,
  ]),
  ...[
    ...christmasIds,
    ...thanksgivingIds,
    ...cozyIds,
    ...flowersIds,
    ...farmIds,
  ].map(id => [
    id,
    newPictureIds.has(id)
      ? `${id}.pdf`
      : `${id}-printable.pdf`,
  ]),
]);

const bundlePrices: Record<string, number> = {
  "2": 149,
  "5": 299,
  "10": 499,
  "20": 799,
};

function hasPicture(id: string) {
  return Object.prototype.hasOwnProperty.call(printableFiles, id);
}

function pictureCollection(id: string) {
  if (oceanIds.includes(id)) return "ocean";
  if (christmasIds.includes(id)) return "christmas";
  if (thanksgivingIds.includes(id)) return "thanksgiving";
  if (cozyIds.includes(id)) return "cozy";
  if (flowersIds.includes(id)) return "flowers";
  if (farmIds.includes(id)) return "farm";
  return "unknown";
}

export async function GET(request: NextRequest) {
  try {
    const stripeKey = process.env.STRIPE_SECRET_KEY;
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
      ?.trim()
      .replace(/\/$/, "");
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
    const downloadAll = params.get("all") === "1";

    if (!sessionId || !sessionId.startsWith("cs_")) {
      return NextResponse.json(
        { error: "Invalid checkout session" },
        { status: 400 }
      );
    }

    if (
      downloadAll
        ? pictureId !== null
        : (!pictureId || !hasPicture(pictureId))
    ) {
      return NextResponse.json(
        { error: "Invalid coloring page" },
        { status: 400 }
      );
    }

    const stripe = new Stripe(stripeKey);
    const session =
      await stripe.checkout.sessions.retrieve(sessionId);

    const bundleSize = session.metadata?.bundle_size ?? "";
    const expectedPrice = bundlePrices[bundleSize];
    const subtotal = session.amount_subtotal;
    const total = session.amount_total;
    const discount =
      session.total_details?.amount_discount ?? 0;

    const validAmounts =
      typeof subtotal === "number" &&
      typeof total === "number" &&
      Number.isInteger(subtotal) &&
      Number.isInteger(total) &&
      Number.isInteger(discount) &&
      discount >= 0 &&
      discount <= subtotal &&
      total >= 0 &&
      total === subtotal - discount &&
      (session.total_details?.amount_tax ?? 0) === 0 &&
      (session.total_details?.amount_shipping ?? 0) === 0;

    const validPayment =
      (
        session.payment_status === "paid" &&
        typeof total === "number" &&
        total > 0
      ) ||
      (
        (
          session.payment_status === "paid" ||
          session.payment_status === "no_payment_required"
        ) &&
        total === 0 &&
        typeof subtotal === "number" &&
        subtotal > 0 &&
        discount === subtotal
      );

    const isLegacyPurchase =
      session.metadata?.product_id === "ocean-friends-bundle" &&
      session.amount_total === 299 &&
      session.payment_status === "paid";

    const isNewPurchase =
      session.metadata?.product_id === "coloring-pages-bundle" &&
      ["2", "5", "10", "20"].includes(bundleSize) &&
      subtotal === expectedPrice &&
      validAmounts &&
      validPayment;

    if (
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

    const selectedPictures = (
      session.metadata?.selected_pictures ??
      [
        session.metadata?.selected_pictures_1,
        session.metadata?.selected_pictures_2,
        session.metadata?.selected_pictures_3,
      ].filter(Boolean).join(",")
    ).split(",").filter(Boolean);

    const requiredCount =
      isLegacyPurchase ? 5 : Number(bundleSize);

    if (
      selectedPictures.length !== requiredCount ||
      new Set(selectedPictures).size !== requiredCount ||
      !selectedPictures.every(hasPicture) ||
      (
        !downloadAll &&
        (!pictureId || !selectedPictures.includes(pictureId))
      )
    ) {
      return NextResponse.json(
        { error: "This picture is not included in your purchase" },
        { status: 403 }
      );
    }

    const collection = session.metadata?.collection ?? "ocean";
    const collections = new Set(
      selectedPictures.map(pictureCollection)
    );

    const validCollection = isLegacyPurchase
      ? collection === "ocean" &&
        collections.size === 1 &&
        collections.has("ocean")
      : collection === "mixed"
        ? collections.size >= 2
        : (
            collection === "ocean" ||
            collection === "christmas" ||
            collection === "thanksgiving" ||
            collection === "cozy" ||
            collection === "flowers" ||
            collection === "farm"
          ) &&
          collections.size === 1 &&
          collections.has(collection);

    if (!validCollection) {
      return NextResponse.json(
        { error: "Invalid collection" },
        { status: 403 }
      );
    }

    const bucketName = "printable-files";

    const headers: Record<string, string> = {
      apikey: supabaseKey,
      "Content-Type": "application/json",
    };

    if (supabaseKey.split(".").length === 3) {
      headers.Authorization = `Bearer ${supabaseKey}`;
    }

    async function signFile(
      filePath: string,
      expiresIn: number
    ) {
      const encodedPath = filePath
        .split("/")
        .map(encodeURIComponent)
        .join("/");

      const response = await fetch(
        `${supabaseUrl}/storage/v1/object/sign/${bucketName}/${encodedPath}`,
        {
          method: "POST",
          headers,
          body: JSON.stringify({ expiresIn }),
          cache: "no-store",
        }
      );

      if (!response.ok) {
        console.error("Supabase download error:", {
          project: new URL(supabaseUrl!).hostname,
          bucket: bucketName,
          file: filePath,
          status: response.status,
          details: await response.text(),
        });

        throw new Error("Unable to generate download link");
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

      return downloadUrl;
    }

    if (downloadAll) {
      const files = await Promise.all(
        selectedPictures.map(async id => ({
          name: printableFiles[id],
          url: await signFile(printableFiles[id], 600),
        }))
      );

      return NextResponse.json(
        { files },
        {
          headers: {
            "Cache-Control": "no-store",
            "Referrer-Policy": "no-referrer",
          },
        }
      );
    }

    if (!pictureId) {
      return NextResponse.json(
        { error: "Invalid coloring page" },
        { status: 400 }
      );
    }

    const downloadUrl = await signFile(
      printableFiles[pictureId],
      60
    );

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
