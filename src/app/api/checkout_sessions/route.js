import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe.js";
import { auth } from "@/auth";
import { productsTable, ordersTable, orderItemsTable} from "@/db/schema";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { eq } from "drizzle-orm";

const db = drizzle();

export async function POST(req) {
  const authSession = await auth();
  try {
    const headersList = await headers();
    const origin = headersList.get("origin");
    const cartData = await req.formData();
    const ids = cartData.getAll("id");
    const qtys = cartData.getAll("quantity");
    const products = [];

    for (let i = 0; i < ids.length; i++) {
      const product = await db
        .select()
        .from(productsTable)
        .where(eq(productsTable.id, parseInt(ids[i])))
        .limit(1);

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
    console.log(authSession.user)
    const order = {
      user_id: authSession.user.id,
      status: "pending",
    };
    const { id } = await db.insert(ordersTable).values(order).returning();
    for (let i = 0; i < ids.length; i++) {
        await db.insert(orderItemsTable).values({
          order_id: id,
          product_id: ids[i],
          quantity: qtys[i],
        }) 
        .returning();
    }
    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      line_items: products,
      mode: "payment",
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/?canceled=true`,
      metadata: {
        order_id: id,
        user_id: authSession.user.id,
      },
    });
    return NextResponse.redirect(session.url, 303);
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 }
    );
  }
}
