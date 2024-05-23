"use server";

import { PrismaClient } from "../../prisma/generated/client";
import { redirect } from "next/navigation";
import crypto from "crypto";

const prisma = new PrismaClient();

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
  await prisma.user.create({
    data: {
      name: name,
      email: email,
      password: password,
    },
  });
  redirect("/api/auth/signin");
}
