import { PrismaClient } from "../../../../prisma/generated/client";

const prisma = new PrismaClient();

export async function GET() {
  const products = await prisma.product.findMany({
    take: 10,
  });
  return Response.json(products);
}

export async function POST(req) {
  const product = await req.json();
  const result = await prisma.product.create({
    data: product,
  });
  return Response.json(result);
}
