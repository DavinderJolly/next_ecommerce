"use server";

import { redirect } from "next/navigation";
import crypto from "crypto";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { usersTable } from "@/db/schema";

const db = drizzle();

export async function create_user(formdata) {
  const name = formdata.get("name");
  const email = formdata.get("email");
  const salt = crypto.randomBytes(16).toString("hex");
  const password =
    crypto
      .createHash("sha256")
      .update(formdata.get("password") + salt)
      .digest("hex") +
    ":" +
    salt;

  await db
    .insert(usersTable)
    .values({
      name,
      email,
      password,
    })
    .returning();

  redirect("/api/auth/signin");
}
