import { drizzle } from "drizzle-orm/vercel-postgres";
import { productsTable } from "@/db/schema";
import { eq } from "drizzle-orm";

const db = drizzle();

export async function GET(req) {
  const searchParams = req.nextUrl.searchParams;
  const page = parseInt(searchParams.get("page")) || 1;
  const pageSize = 12;
  const products = await db
    .select()
    .from(productsTable)
    .limit(pageSize)
    .offset((page - 1) * pageSize)
    .orderBy(productsTable.id, "asc");

  if (!products) {
    return Response.json({ error: "No products found" }, { status: 404 });
  }
  // Check if there are more products available to see if there can be more pages
  const nextProducts = await db
    .select()
    .from(productsTable)
    .limit(1)
    .offset(page * pageSize)
    .orderBy(productsTable.id, "asc");

  const hasMore = nextProducts.length > 0;
  return Response.json({ products, hasMore });
}

export async function POST(req) {
  const product = await req.json();
  const result = await db
    .insert(productsTable)
    .values({
      name: product.name,
      description: product.description,
      img_url: product.img_url,
      price: product.price,
    })
    .returning();
  return Response.json(result);
}

export async function PUT(req) {
  const product = await req.json();
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

export async function DELETE(req) {
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get("id");
  if (!id) {
    return Response.json({ error: "Product ID is required" }, { status: 400 });
  }
  const result = await db
    .delete(productsTable)
    .where(eq(productsTable.id, parseInt(id)))
    .returning();
  if (result.length === 0) {
    return Response.json({ error: "Product not found" }, { status: 404 });
  }
  return Response.json(result);
}
