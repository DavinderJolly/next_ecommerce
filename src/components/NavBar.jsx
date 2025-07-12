"use client";
import { useSession } from "next-auth/react";
import { useRef } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import "../styles/global.css";
import Cart from "./Cart";
import Image from "next/image";
import Search from "./Search";
import Link from "next/link";

const NavBar = ({}) => {
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
  const session = useSession();

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <Image
            src="https://flowbite.com/docs/images/logo.svg"
            height={32}
            width={32}
            className="h-8"
            alt="Flowbite Logo"
            priority
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Flowbite
          </span>
        </Link>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <Search placeholder="Search products..." />
          {session.status === "authenticated" ? (
            <ul className="flex flex-row items-center gap-3 mt-3 md:mt-0 space-x-2">
              <li className="text-white">Hello, {session.data.user.name}</li>
              <li>
                <Link href="/api/auth/signout">
                  <button
                    type="button"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Logout
                  </button>
                </Link>
              </li>
            </ul>
          ) : (
            <ul className="flex flex-row mt-3 md:mt-0 space-x-2">
              <li>
                <Link href="/signup">
                  <button
                    type="button"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    SignUp
                  </button>
                </Link>
              </li>
              <li>
                <Link href="/api/auth/signin">
                  <button
                    type="button"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Login
                  </button>
                </Link>
              </li>
            </ul>
          )}
          <button
            data-collapse-toggle="navbar-cta"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-cta"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-cta"
        >
          <ul>
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
              {/* <Search placeholder="Search invoices..." /> */}
            </div>
          </ul>
          <div
            onClick={toggleCart}
            className="cart cursor-pointer absolute right-0 top-4 mx-5"
          >
            <AiOutlineShoppingCart className="text-white text=x1 md:text-2xl" />
          </div>
          <Cart ref={ref} toggleCart={toggleCart} />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
