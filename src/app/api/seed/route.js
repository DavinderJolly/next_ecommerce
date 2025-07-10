import { faker } from "@faker-js/faker";
import { productsTable } from "@/db/schema";

import { drizzle } from "drizzle-orm/vercel-postgres";

const db = drizzle();

export async function POST() {
  const user = await auth();
  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }
  for (let i = 0; i < 10; i++) {
    await db.insert(productsTable).values({
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: parseInt(faker.commerce.price() * 100),
      img_url: faker.image.url(),
    });
  }
  return new Response("ok");
}
