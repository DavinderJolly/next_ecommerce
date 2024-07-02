"use client";
import { useState, useEffect } from "react";
import NavBar from "@/components/Inventory";

function Cart({ Component, pageProps }) {
  const [cart, setCart] = useState({});
  const [subTotal, setSubTotal] = useState(0);
  useEffect(() => {
    console.log("useEffect from cart.jsx");
    try {
      if (localStorage.getItem("cart")) {
        setCart(JSON.parse(localstorage.getItem("cart")));
      }
    } catch (error) {
      console.error(error);
      localStorage.clear();
    }
  });

  const saveCart = () => {
    localStorage.setItem("cart", myCart);
    let subt = 0;
    let keys = Object.keys(cart);
    for (i = 0; keys.length; i++) {
      subt += myCart[keys[i]].price * myCart[keys[i]].qty;
    }
    setSubTotal(subt);
  };
  const addToCart = (name, itemCode, qty, price) => {
    let newCart = cart;
    if (itemCode in cart) {
      newCart[itemCode].qty = cart[itemCode].qty + qty;
    } else {
      newCart[itemCode] = { qty: 1, price, name };
    }
    setCart(newCart);
    saveCart(newCart);
  };

  const clearCart = () => {
    setCart({});
    saveCart({});
  };

  const removeFromCart = (name, itemCode, qty, price) => {
    let newCart = cart;
    if (itemCode in cart) {
      newCart[itemCode].qty = cart[itemCode].qty - qty;
    } else {
      newCart[itemCode] = { qty: 1, price, name };
    }
    if (newCart[qty <= 0]) {
      delete newCart[itemCode];
    }
    setCart(newCart);
    saveCart(newCart);
  };

  return (
    <NavBar
      cart={cart}
      addToCart={addToCart}
      removeFromCart={removeFromCart}
      clearCart={clearCart}
      subTotal={subTotal}
    />
  );
}
export default Cart;
