import { PrismaClient } from "../../../../prisma/generated/client";

const prisma = new PrismaClient();

export async function GET(request, { params }) {
  const products = await prisma.product.findMany({
    take: params.amt,
  });
  return Response.json(products);
}
