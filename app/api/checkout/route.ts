import { NextResponse } from "next/server";
import Stripe from "stripe";

const PRICE_ID = "price_1UCQoW7pd3R2ckxOtT20FNqM";
const PAYMENT_LINK = "https://buy.stripe.com/fZubIV9DaeUUemmgPQeUU04";

export async function POST(req: Request) {
  try {
    const { email, context } = await req.json();

    const stripeKey = process.env.STRIPE_SECRET_KEY;

    if (stripeKey) {
      const stripe = new Stripe(stripeKey, {
        apiVersion: "2025-02-24.acacia",
      });

      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price: PRICE_ID,
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${req.headers.get("origin") || "http://localhost:3000"}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.get("origin") || "http://localhost:3000"}`,
        metadata: {
          email: email.slice(0, 500),
          context: context?.slice(0, 500) || "",
        },
        payment_intent_data: {
          metadata: {
            email: email.slice(0, 500),
            context: context?.slice(0, 500) || "",
          },
        },
      });

      return NextResponse.json({ url: session.url });
    } else {
      return NextResponse.json({ url: PAYMENT_LINK });
    }
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Checkout failed" },
      { status: 500 }
    );
  }
}
