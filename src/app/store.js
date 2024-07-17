import { create } from "zustand";
import { persist } from "zustand/middleware";

const useStore = create(
  persist(
    (set) => ({
      cart: [],
      addToCart: (item) =>
        set((state) => ({
          cart: [...state.cart, item],
        })),
      removeFromCart: (item) =>
        set((state) => ({
          cart: state.cart.filter((cartitem) => item.id !== cartitem.id),
        })),
      clearCart: (item) =>
        set((state) => ({
          cart: [],
        })),
      subTotal: 0,
    }),
    { name: "cartStorage", getStorage: () => localStorage }
  )
);
export default useStore;
