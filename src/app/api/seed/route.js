import { faker } from "@faker-js/faker";
import { auth } from "@/auth";
import { PrismaClient } from "../../../../prisma/generated/client";

const prisma = new PrismaClient();

export async function POST() {
//   const user = await auth();
//   if (!user) {
//     return new Response("Unauthorized", { status: 401 });
//   }
  for (let i = 0; i < 10; i++) {
    await prisma.product.create({
      data: {
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: parseInt(faker.commerce.price() * 100),
        img_url: faker.image.url(),
      },
    });
  }
  return new Response("ok");
}
