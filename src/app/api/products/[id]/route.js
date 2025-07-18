import { drizzle } from "drizzle-orm/vercel-postgres";
import { productsTable } from "@/db/schema";
import { eq } from "drizzle-orm";

const db = drizzle();

export async function GET(req) {
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get("id");
  if (!id) {
    return Response.json({ error: "Product ID is required" }, { status: 400 });
  }
  const product = await db
    .select()
    .from(productsTable)
    .where(eq(productsTable.id, parseInt(id)))
    .limit(1);
  if (!product) {
    return Response.json({ error: "Product not found" }, { status: 404 });
  }
  return Response.json(product);
}

export async function UPDATE(req) {
  const product = await req.json();
  if (!product.id) {
    return Response.json({ error: "Product ID is required" }, { status: 400 });
  }
  const result = await db
    .update(productsTable)
    .set({
      name: product.name,
      description: product.description,
      img_url: product.img_url,
      price: product.price,
    })
    .where(eq(productsTable.id, product.id))
    .returning();
  return Response.json(result);
}