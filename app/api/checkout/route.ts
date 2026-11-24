import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export const runtime = "nodejs";

const oceanPictures = [
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

const christmasPictures = [
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

const thanksgivingPictures = [
  "thanksgiving-dinner-table",
  "thanksgiving-family-thanksgiving-dinner",
  "thanksgiving-feast",
  "thanksgiving-harvest-boy",
  "thanksgiving-pilgrim-children",
  "thanksgiving-turkey-and-cornucopia",
  "thanksgiving-turkey-family",
];

const allowedPictures: string[] = [
  ...oceanPictures,
  ...christmasPictures,
  ...thanksgivingPictures,
];

const bundles: Record<number, { price: number; name: string }> = {
  2: {
    price: 149,
    name: "Mini Bundle - 2 Coloring Pages",
  },
  5: {
    price: 299,
    name: "Little Bundle - 5 Coloring Pages",
  },
  10: {
    price: 499,
    name: "Happy Bundle - 10 Coloring Pages",
  },
  20: {
    price: 799,
    name: "Mega Bundle - 20 Coloring Pages",
  },
};

function createPictureMetadata(
  selectedPictures: string[]
): Record<string, string> {
  const joined = selectedPictures.join(",");

  if (joined.length <= 500) {
    return {
      selected_pictures: joined,
    };
  }

  const chunks: string[] = [];
  let current = "";

  for (const picture of selectedPictures) {
    const next = current
      ? `${current},${picture}`
      : picture;

    if (next.length > 500) {
      chunks.push(current);
      current = picture;
    } else {
      current = next;
    }
  }

  if (current) {
    chunks.push(current);
  }

  if (chunks.length > 3) {
    throw new Error("Picture metadata exceeds supported length");
  }

  const metadata: Record<string, string> = {};

  chunks.forEach((chunk, index) => {
    metadata[`selected_pictures_${index + 1}`] = chunk;
  });

  return metadata;
}

export async function POST(request: NextRequest) {
  const stripeKey = process.env.STRIPE_SECRET_KEY;

  if (!stripeKey) {
    return NextResponse.json(
      { error: "Stripe is not configured" },
      { status: 500 }
    );
  }

  try {
    const body = await request.json();
    const selectedPictures = body.selectedPictures;

    if (!Array.isArray(selectedPictures)) {
      return NextResponse.json(
        { error: "Please select your coloring pages" },
        { status: 400 }
      );
    }

    const bundle = bundles[selectedPictures.length];

    if (
      !bundle ||
      new Set(selectedPictures).size !== selectedPictures.length ||
      !selectedPictures.every(
        (picture: unknown) =>
          typeof picture === "string" &&
          allowedPictures.includes(picture)
      )
    ) {
      return NextResponse.json(
        {
          error: "Please select 2, 5, 10, or 20 unique coloring pages",
        },
        { status: 400 }
      );
    }

    const isOcean = selectedPictures.every(
      (picture) => oceanPictures.includes(picture)
    );

    const isChristmas = selectedPictures.every(
      (picture) => christmasPictures.includes(picture)
    );

    const isThanksgiving = selectedPictures.every(
      (picture) => thanksgivingPictures.includes(picture)
    );

    const collection = isOcean
      ? "ocean"
      : isChristmas
        ? "christmas"
        : isThanksgiving
          ? "thanksgiving"
          : "mixed";

    const collectionName = isOcean
      ? "Ocean Friends"
      : isChristmas
        ? "Christmas Collection"
        : isThanksgiving
          ? "Thanksgiving Collection"
          : "Mix & Match";

    const pictureMetadata =
      createPictureMetadata(selectedPictures);

    const stripe = new Stripe(stripeKey);

    const origin =
      "https://novea-printables.vercel.app";

    let cancelUrl = `${origin}/coloring-pages`;

    if (body.collection === "thanksgiving") {
      cancelUrl =
        `${origin}/coloring-pages?collection=thanksgiving`;
    } else if (body.collection === "christmas") {
      cancelUrl = `${origin}/holiday/christmas`;
    } else if (body.collection !== "ocean") {
      if (isThanksgiving) {
        cancelUrl =
          `${origin}/coloring-pages?collection=thanksgiving`;
      } else if (isChristmas) {
        cancelUrl = `${origin}/holiday/christmas`;
      }
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",

      payment_method_types: ["card"],

      allow_promotion_codes: true,

      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `${collectionName} - ${bundle.name}`,
              description:
                `${selectedPictures.length} printable coloring page PDFs from NOVÉA Printables.`,
            },
            unit_amount: bundle.price,
          },
          quantity: 1,
        },
      ],

      metadata: {
        product_id: "coloring-pages-bundle",
        collection,
        bundle_size: String(selectedPictures.length),
        ...pictureMetadata,
      },

      success_url:
        `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,

      cancel_url: cancelUrl,
    });

    if (!session.url) {
      throw new Error("Stripe did not return a checkout URL");
    }

    return NextResponse.json({
      url: session.url,
    });

  } catch (error) {
    console.error("Checkout error:", error);

    return NextResponse.json(
      { error: "Unable to create checkout session" },
      { status: 500 }
    );
  }
}
