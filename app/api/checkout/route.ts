
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export const runtime = "nodejs";

const allowedPictures = [
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

const bundles: Record<number, { price: number; name: string }> = {
  2: { price: 149, name: "Mini Bundle - 2 Coloring Pages" },
  5: { price: 299, name: "Little Bundle - 5 Coloring Pages" },
  10: { price: 499, name: "Happy Bundle - 10 Coloring Pages" },
  20: { price: 799, name: "Mega Bundle - 20 Coloring Pages" },
};

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
        { error: "Please select 2, 5, 10, or 20 unique coloring pages" },
        { status: 400 }
      );
    }

    const stripe = new Stripe(stripeKey);
    const origin = "https://novea-printables.vercel.app";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: bundle.name,
              description: `${selectedPictures.length} printable coloring page PDFs. Choose from available NOVĒA collections.`,
            },
            unit_amount: bundle.price,
          },
          quantity: 1,
        },
      ],
      metadata: {
        product_id: "coloring-pages-bundle",
        bundle_size: String(selectedPictures.length),
        selected_pictures: selectedPictures.join(","),
      },
      success_url:
        `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/coloring-pages`,
    });

    if (!session.url) {
      throw new Error("Stripe did not return a checkout URL");
    }

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Checkout error:", error);

    return NextResponse.json(
      { error: "Unable to create checkout session" },
      { status: 500 }
    );
  }
}
