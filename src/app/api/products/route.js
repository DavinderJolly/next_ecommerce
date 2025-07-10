import { drizzle } from "drizzle-orm/vercel-postgres";
import { productsTable } from "@/db/schema";

const db = drizzle();

export async function GET(req) {
  const searchParams = req.nextUrl.searchParams;
  const page = parseInt(searchParams.get("page"));
  const pageSize = 12;
  const products = await db
    .select()
    .from(productsTable)
    .limit(pageSize)
    .offset((page - 1) * pageSize);

  if (!products) {
    return Response.json({ error: "No products found" }, { status: 404 });
  }
  // Check if there are more products available to see if there can be more pages
  const nextProducts = await db
    .select()
    .from(productsTable)
    .limit(1)
    .offset(page * pageSize);

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
