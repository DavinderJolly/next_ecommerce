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
    <nav class="bg-white border-gray-200 dark:bg-gray-900">
      <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a
          href="https://flowbite.com/"
          class="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            class="h-8"
            alt="Flowbite Logo"
          />
          <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Flowbite
          </span>
        </a>
        <div class="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <ul class="flex flex-row mt-3 md:mt-0 space-x-2">
            <li>
              <a href="/signup">
                <button
                  type="button"
                  class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  SignUp
                </button>
              </a>
            </li>
            <li>
              <a href="/api/auth/signin">
                <button
                  type="button"
                  class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Login
                </button>
              </a>
            </li>
          </ul>
          <button
            data-collapse-toggle="navbar-cta"
            type="button"
            class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-cta"
            aria-expanded="false"
          >
            <span class="sr-only">Open main menu</span>
            <svg
              class="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-cta"
        >
          <ul class="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <a
                href="/"
                class="block py-2 px-3 md:p-0 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:dark:text-blue-500"
                aria-current="page"
              >
                Home
              </a>
            </li>
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
                <BsFillBagCheckFill className="m-1" />
                Checkout
              </button>

              <button className="flex mr-2  text-white bg-pink-500 , border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-sm">
                <BsFillBagCheckFill className="m-1" />
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
