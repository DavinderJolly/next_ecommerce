"use client";
import { useSession, signOut } from "next-auth/react";
import { IoIosClose } from "react-icons/io";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { BsFillBagCheckFill } from "react-icons/bs";
import { useRef } from "react";
import "../styles/global.css";

 const NavBar = ({ cart, addToCart, removeFromCart, clearCart, subTotal }) => {
  console.log(
    "this is navbar",
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    subTotal
  );
  const toggleCart = () => {
    if (ref.current.classList.contains("translate-x-full")) {
      ref.current.classList.remove("translate-x-full");
      ref.current.classList.add("translate-x-0");
    } else if (!ref.current.classList.contains("translate-x-full")) {
      ref.current.classList.remove("translate-x-0");
      ref.current.classList.add("translate-x-full");
    }
  };
  const ref = useRef();
  const { status } = useSession();

  return (
    <nav className="flex justify-between items-center bg-slate-700 text-slate-300 p-2">
      <h1 className="text-2xl">Hello</h1>
      <ul className="flex flex-row gap-4">
        <li className="cursor-pointer hover:text-slate-100">Home</li>
        <li className="cursor-pointer hover:text-slate-100">Products</li>
        <li className="cursor-pointer hover:text-slate-100">About</li>
        <li className="cursor-pointer hover:text-slate-100">Contact Us</li>
        {status === "authenticated" ? (
          <li className="cursor-pointer hover:text-slate-100">
            <button onClick={() => signOut()}>Log out</button>
          </li>
        ) : (
          <li className="cursor-pointer hover:text-slate-100">
            <a href="/api/auth/signin">Log In</a>
          </li>
        )}
      </ul>
      <div
        onClick={toggleCart}
        className="cart cursor-pointer absolute right-0 top-4 mx-5"
      >
        <AiOutlineShoppingCart className="text=x1 md:text-2xl" />
      </div>
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
        <div className="fle">
          <button className="flex mr-2  text-white bg-pink-500 , border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-sm">
            {" "}
            <BsFillBagCheckFill className="m-1" />
            Checkout
          </button>

          <button className="flex mr-2  text-white bg-pink-500 , border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-sm">
            {" "}
            <BsFillBagCheckFill className="m-1" />
            Clear Cart
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
