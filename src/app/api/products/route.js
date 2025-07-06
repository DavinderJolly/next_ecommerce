import { PrismaClient } from "../../../../prisma/generated/client";

const prisma = new PrismaClient();

export async function GET(req) {
  const searchParams = req.nextUrl.searchParams;
  const page = parseInt(searchParams.get("page"));
  const pageSize = 12;
  const products = await prisma.product.findMany({
    take: pageSize,
    skip: (page - 1) * pageSize,
  });
  if (!products) {
    return Response.json({ error: "No products found" }, { status: 404 });
  }
  // Check if there are more products available to see if there can be more pages
  const nextProducts = await prisma.product.findMany({
    take: 1,
    skip: page * pageSize,
  });
  const hasMore = nextProducts.length > 0;
  return Response.json({ products, hasMore });
}

export async function POST(req) {
  const product = await req.json();
  const result = await prisma.product.create({
    data: product,
  });
  return Response.json(result);
}
