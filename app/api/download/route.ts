import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export const runtime = "nodejs";

const printableFiles: Record<string, string> = {
  turtle: "ocean-friends-turtle-printable.pdf",
  "cute-octopus": "ocean-friends-cute-octopus-printable.pdf",
  dolphin: "ocean-friends-dolphin-printable.pdf",
  "happy-crab": "ocean-friends-happy-crab-printable.pdf",
  "seashell-friends": "ocean-friends-seashell-friends-printable.pdf",
  shark: "ocean-friends-shark-printable.pdf",
  "smiling-jellyfish": "ocean-friends-smiling-jellyfish-printable.pdf",
  starfish: "ocean-friends-starfish-printable.pdf",
  "tropical-fish": "ocean-friends-tropical-fish-printable.pdf",
  whale: "ocean-friends-whale-printable.pdf",

  "christmas-cheerful-elf-and-christmas-tree-coloring-page":
    "christmas-cheerful-elf-and-christmas-tree-coloring-page-printable.pdf",

  "christmas-festive-christmas-mantel-coloring-page":
    "christmas-festive-christmas-mantel-coloring-page-printable.pdf",

  "christmas-festive-christmas-wreath-coloring-page":
    "christmas-festive-christmas-wreath-coloring-page-printable.pdf",

  "christmas-festive-fireplace-gifts-and-stockings":
    "christmas-festive-fireplace-gifts-and-stockings-printable.pdf",

  "christmas-festive-fireplace-stocking-scene":
    "christmas-festive-fireplace-stocking-scene-printable.pdf",

  "christmas-festive-penguin-with-gifts-and-snowflakes":
    "christmas-festive-penguin-with-gifts-and-snowflakes-printable.pdf",

  "christmas-festive-puppy-christmas-coloring-page":
    "christmas-festive-puppy-christmas-coloring-page-printable.pdf",

  "christmas-festive-reindeer-coloring-scene":
    "christmas-festive-reindeer-coloring-scene-printable.pdf",

  "christmas-gingerbread-house-candy-wonderland":
    "christmas-gingerbread-house-candy-wonderland-printable.pdf",

  "christmas-polar-bear-christmas-coloring-page":
    "christmas-polar-bear-christmas-coloring-page-printable.pdf",

  "christmas-polar-bears-snowy-gift-surprise":
    "christmas-polar-bears-snowy-gift-surprise-printable.pdf",

  "christmas-santas-snowy-christmas-gift-scene":
    "christmas-santas-snowy-christmas-gift-scene-printable.pdf",

  "christmas-snowman-decorating-a-christmas-tree":
    "christmas-snowman-decorating-a-christmas-tree-printable.pdf",
};

const bundlePrices: Record<string, number> = {
  "2": 149,
  "5": 299,
  "10": 499,
  "20": 799,
};

function hasPicture(id: string) {
  return Object.prototype.hasOwnProperty.call(
    printableFiles,
    id
  );
}

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

    if (!pictureId || !hasPicture(pictureId)) {
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
      (session.payment_status === "paid" &&
        typeof total === "number" &&
        total > 0) ||
      ((session.payment_status === "paid" ||
        session.payment_status === "no_payment_required") &&
        total === 0 &&
        typeof subtotal === "number" &&
        subtotal > 0 &&
        discount === subtotal);

    const isLegacyPurchase =
      session.metadata?.product_id === "ocean-friends-bundle" &&
      session.amount_total === 299 &&
      session.payment_status === "paid";

    const isNewPurchase =
      session.metadata?.product_id === "coloring-pages-bundle" &&
      expectedPrice !== undefined &&
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

    const selectedPictures =
      session.metadata?.selected_pictures?.split(",") ?? [];

    const requiredCount = isLegacyPurchase
      ? 5
      : Number(bundleSize);

    if (
      selectedPictures.length !== requiredCount ||
      new Set(selectedPictures).size !== requiredCount ||
      !selectedPictures.every(hasPicture) ||
      !selectedPictures.includes(pictureId)
    ) {
      return NextResponse.json(
        { error: "This picture is not included in your purchase" },
        { status: 403 }
      );
    }

    const collection =
      session.metadata?.collection ?? "ocean";

    const validCollection =
      (collection === "ocean" &&
        selectedPictures.every(
          (id) => !id.startsWith("christmas-")
        )) ||
      (collection === "christmas" &&
        !isLegacyPurchase &&
        selectedPictures.every(
          (id) => id.startsWith("christmas-")
        ));

    if (!validCollection) {
      return NextResponse.json(
        { error: "Invalid collection" },
        { status: 403 }
      );
    }

    const filePath = printableFiles[pictureId];
    const bucketName = "printable-files";

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
