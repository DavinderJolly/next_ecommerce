import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import Providers from "@/components/Providers";
import { auth } from "@/auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Ecommerce Website",
  description: "website made with nextjs and tailwindcss",
};

export default async function RootLayout({ children }) {
  const session = await auth();
  return (
    <html lang="en">
      <body className={`${inter.className} md:h-screen`}>
        <Providers session={session}>
          <NavBar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
