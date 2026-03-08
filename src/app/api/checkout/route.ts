import { NextResponse } from "next/server";
import { z } from "zod";

import { getStripe } from "@/lib/stripe";

const checkoutSchema = z.object({
  fullName: z.string().min(2),
  phone: z.string().min(8),
  address: z.string().min(8),
  paymentMethod: z.enum(["stripe", "cod"]),
  items: z
    .array(
      z.object({
        name: z.string().min(2),
        quantity: z.number().int().positive(),
        unitAmount: z.number().positive(),
      }),
    )
    .default([]),
});

export async function POST(req: Request) {
  const body = await req.json();
  const result = checkoutSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json({ error: "Invalid checkout payload" }, { status: 400 });
  }

  if (result.data.paymentMethod === "stripe") {
    const stripe = getStripe();
    if (!stripe) {
      return NextResponse.json({ error: "Stripe is not configured" }, { status: 500 });
    }

    const lineItems = result.data.items.map((item) => ({
      quantity: item.quantity,
      price_data: {
        currency: "usd",
        product_data: { name: item.name },
        unit_amount: Math.round(item.unitAmount * 100),
      },
    }));

    if (!lineItems.length) {
      return NextResponse.json({ error: "No line items provided" }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      success_url: `${process.env.NEXTAUTH_URL ?? "http://localhost:3000"}/en/account?checkout=success`,
      cancel_url: `${process.env.NEXTAUTH_URL ?? "http://localhost:3000"}/en/checkout?checkout=cancelled`,
      metadata: {
        fullName: result.data.fullName,
        phone: result.data.phone,
      },
    });

    return NextResponse.json({
      checkoutUrl: session.url,
      orderReference: `PLX-${Date.now()}`,
    });
  }

  return NextResponse.json({
    message: "Cash on delivery order accepted",
    orderReference: `PLX-${Date.now()}`,
  });
}
