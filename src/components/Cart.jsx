"use client";

import { BsFillBagCheckFill } from "react-icons/bs";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { IoIosClose } from "react-icons/io";
import React from "react";
import "../styles/global.css";
import useStore from "@/app/store";

const Cart = React.forwardRef(function Cart({ toggleCart }, ref) {
  const { cart, addToCart, decreaseQty, removeFromCart, clearCart } = useStore();
  function handleCheckout(e) {
    e.preventDefault();
    const products = cart.map((item) => ({
      quantity: item.qty,
      price_data: {
        unit_amount: item.price,
        currency: "usd",
        product_data: {
          name: item.name,
          images: [item.img_url],
          description: item.description,
          metadata: {
            db_id: item.id,
          },
        },
      }
    }));
    fetch("/api/checkout_sessions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(products),
    }).then((res) => (window.location.href = res.url));

  }

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
        {cart.length === 0 && (
          <li className="my-4 text-base font-normal block">No items</li>
        )}
        {cart.map((item) => {
          return (
            <li key={item.id}>
              <div className="item flex my-5">
                <div className="w-2/3 font-semibold">{item.name}</div>
                <div className="flex font-semibold items-center justify-center w-1/3">
                  <FaMinus
                    onClick={() => {
                      if (item.qty === 1) {
                        removeFromCart(item);
                      } else {
                        decreaseQty(item);
                      }
                    }}
                    className="mx-3 cursor-pointer text-pink-500"
                  />
                  <span className="mx-2 text-sm">{item.qty}</span>
                  <FaPlus
                    onClick={() => {
                      addToCart(item, 1, item.price, item.name);
                    }}
                    className="cursor-pointer mx-3"
                  />
                </div>
              </div>
            </li>
          );
        })}
      </ol>
      <div className="flex">
        <form action="/api/checkout_sessions" method="POST">
          {cart.map((item) => (
            <React.Fragment key={item.id}>
              <input type="hidden" name="id" value={item.id} />
              <input type="hidden" name="quantity" value={item.qty} />
            </React.Fragment>
          ))}
          <section>
            <button
              type="submit"
              role="link"
              className="flex mr-2  text-white bg-pink-500 , border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-sm"
            >
              <BsFillBagCheckFill className="m-1" />
              Checkout
            </button>
          </section>
        </form>

        <button
          onClick={clearCart}
          className="flex mr-2  text-white bg-pink-500 , border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-sm"
        >
          <BsFillBagCheckFill className="m-1" />
          Clear Cart
        </button>
      </div>
    </div>
  );
});
export default Cart;
