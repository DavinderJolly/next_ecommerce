import { create } from "zustand";
import { persist } from "zustand/middleware";

const useStore = create(
  persist(
    (set) => ({
      cart: [],
      addToCart: (item) =>
        set((state) => {
          for (let i = 0; i < state.cart.length; i++) {
            if (state.cart[i].id === item.id) {
              return {
                cart: state.cart.map((cartitem) =>
                  cartitem.id === item.id
                    ? { ...cartitem, qty: cartitem.qty + 1 }
                    : cartitem
                ),
              };
            }
          }

          return {
            cart: [...state.cart, { ...item, qty: 1 }],
          };
        }),
      decreaseQty: (item) =>
        set((state) => {
          return {
            cart: state.cart.map((cartitem) =>
              cartitem.id === item.id
                ? {
                    ...cartitem,
                    qty: cartitem.qty > 1 ? cartitem.qty - 1 : 1,
                  }
                : cartitem
            ),
          };
        }),
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
