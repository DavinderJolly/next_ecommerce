import Inventory from "@/components/Inventory";
import Cart from "@/components/Cart";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <Inventory />
      <Cart />
    </main>
  );
}
