import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe.js";
import { PrismaClient } from "../../../../prisma/generated/client";

const prisma = new PrismaClient();

export async function POST(req) {
  console.log(req.auth);
  try {
    const headersList = await headers();
    const origin = headersList.get("origin");
    const cartData = await req.formData();
    const ids = cartData.getAll("id");
    const qtys = cartData.getAll("quantity");
    const products = [];

    for (let i = 0; i < ids.length; i++) {
      const product = await prisma.product.findUnique({
        where: { id: parseInt(ids[i]) },
      });
      products.push({
        quantity: parseInt(qtys[i]),
        price_data: {
          unit_amount: product.price,
          currency: "usd",
          product_data: {
            name: product.name,
            images: [product.img_url],
            description: product.description,
            metadata: {
              db_id: product.id,
            },
          },
        },
      });
    }

    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      line_items: products,
      mode: "payment",
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/?canceled=true`,
    });
    return NextResponse.redirect(session.url, 303);
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 }
    );
  }
}
