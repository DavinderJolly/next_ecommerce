import { PrismaClient } from "../../../../prisma/generated/client";

const prisma = new PrismaClient();

export async function GET() {
  const products = await prisma.product.findMany({
    take: 10,
  });
  return Response.json(products);
}
