import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import crypto from "crypto";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { eq } from "drizzle-orm";
import { usersTable } from "@/db/schema";

const db = drizzle();

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials, req) {
        const user = await db
          .select()
          .from(usersTable)
          .where(eq("email", credentials.email));

        const [hashedPass, salt] = user.password.split(":");

        const newHashed = crypto
          .createHash("sha256")
          .update(credentials.password + salt)
          .digest("hex");

        if (!user) {
          return null;
        }

        if (hashedPass !== newHashed) {
          return null;
        }

        return user;
      },
    }),

    GoogleProvider({
      clientId: process.env.GCLIENT_ID,
      clientSecret: process.env.GCLIENT_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
});
