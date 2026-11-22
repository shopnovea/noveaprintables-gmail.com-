
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

    // Customers must select exactly five unique pictures.
    if (
      !Array.isArray(selectedPictures) ||
      selectedPictures.length !== 5 ||
      new Set(selectedPictures).size !== 5 ||
      !selectedPictures.every(
        (picture: unknown) =>
          typeof picture === "string" &&
          allowedPictures.includes(picture)
      )
    ) {
      return NextResponse.json(
        { error: "Please select exactly 5 coloring pages" },
        { status: 400 }
      );
    }

    const stripe = new Stripe(stripeKey);
    const origin = new URL(request.url).origin;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Ocean Friends - Pick Any 5 Coloring Pages",
              description:
                "Five printable Ocean Friends coloring page PDFs",
            },
            unit_amount: 299,
          },
          quantity: 1,
        },
      ],
      metadata: {
        product_id: "ocean-friends-bundle",
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
