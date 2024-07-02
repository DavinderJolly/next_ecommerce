"use client";
import { useEffect, useState } from "react";
import { BsFillBagCheckFill } from "react-icons/bs";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { IoIosClose } from "react-icons/io";
import React from "react";
import "../styles/global.css";

const Cart = React.forwardRef(function Cart({ toggleCart }, ref) {
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
  }, [setCart]);

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
    <div
      ref={ref}
      className="w-72 sideCart  absolute top-0 right-0 bg-purple-400 px-4 py-10 transform transition-transform translate-x-full"
    >
      <h2 className="font-bold text-xm text-center">Shopping Cart</h2>
      <span
        onClick={toggleCart}
        className="absolute top-1 right-0 cursor-pointer text-2xl text-purple-600"
      >
        <IoIosClose />
      </span>
      <ol className="list-decimal font-semibold">
        <li>
          <div className="item flex my-5">
            <div className="w-2/3 font-semibold">1.Product apple</div>
            <div className="flex font-semibold items-center justify-center w-1/3">
              <FaMinus className="mx-3 cursor-pointer" />1
              <FaPlus className="cursor-pointer mx-3" />
            </div>
          </div>
        </li>
      </ol>
      <div className="flex">
        <button className="flex mr-2  text-white bg-pink-500 , border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-sm">
          <BsFillBagCheckFill className="m-1" />
          Checkout
        </button>

        <button className="flex mr-2  text-white bg-pink-500 , border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-sm">
          <BsFillBagCheckFill className="m-1" />
          Clear Cart
        </button>
      </div>
    </div>
  );
});
export default Cart;
