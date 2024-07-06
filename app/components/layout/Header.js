// components/Header.jsx
"use client";
import Image from "next/image";
import Link from "next/link";
import logo from "public/Frame.png";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { MdSpaceDashboard } from "react-icons/md";
const Header = ({ isNavBarOpen, setIsNavbarOpen }) => {
  const { data } = useSession();
  const toggleNavBar = () => {
    setIsNavbarOpen((isNavbarOpen) => !isNavbarOpen);
  };
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <header
        className={`flex justify-between  items-center px-4 lg:px-14 py-4 transition-all duration-350 w-full ${
          isScrolled ? "bg-white shadow-md" : "bg-[#ffffff85] border-b-2 md:bg-white"
        } ${isNavBarOpen ? "shadow-md" : ""}`}
      >
        <Link href="/" className="flex items-center gap-[1px]">
          <Image
            src={logo}
            width={32}
            height={32}
            className="w-8 h-8"
            alt="HouseHub"
          />
          <p className="font-semibold relative top-[1.5px]">HouseHub</p>
        </Link>

        <nav className="hidden md:flex space-x-6">
          <Link href="/feed?filter=rental">
            <p className="text-gray-700 hover:text-primary py-4">Rent</p>
          </Link>
          <Link href="/feed?filter=sell">
            <p className="text-gray-700 hover:text-primary py-4">Buy</p>
          </Link>
          <Link href="/feed?filter=sell">
            <p className="text-gray-700 hover:text-primary py-4">Sell</p>
          </Link>
          <div className="relative group">
            <button className="text-gray-700 hover:text-primary py-4">
              Resources
            </button>
            <div className="absolute hidden group-hover:block bg-white shadow-lg w-36 rounded-md py-2">
              <Link href="/blog">
                <p className="block px-4 py-2 text-gray-700 hover:text-primary">
                  Blog
                </p>
              </Link>
              <Link href="/guides">
                <p className="block px-4 py-2 text-gray-700 hover:text-primary">
                  Guides
                </p>
              </Link>
              <Link href="/faq">
                <p className="block px-4 py-2 text-gray-700 hover:text-primary">
                  FAQ
                </p>
              </Link>
              <Link href="/help-center">
                <p className="block px-4 py-2 text-gray-700 hover:text-primary">
                  Help Center
                </p>
              </Link>
            </div>
          </div>
        </nav>

        <div className="hidden md:flex md:items-center space-x-4">
          {data ? (
            <Link href="/dashboard">
              <p className="bg-primary text-white px-4 py-3 rounded-lg flex items-center">
                Dashboard
                <MdSpaceDashboard className="text-xl ml-2 " />
              </p>
            </Link>
          ) : (
            <>
              {" "}
              <Link href="/login">
                <p className="text-gray-700 px-4 py-2 rounded-lg font-semibold border border-slate-400 hover:text-primary">
                  Login
                </p>
              </Link>
              <Link href="/signup">
                <p className="bg-primary text-white px-4 py-2 rounded-lg font-semibold">
                  Sign Up
                </p>
              </Link>
            </>
          )}
        </div>

        <button className="md:hidden w-10 h-10 px-2" onClick={toggleNavBar}>
          <div
            className={`w-6 h-[2px] rounded-full bg-black transition-all duration-150 ${
              isNavBarOpen ? "rotate-45" : ""
            }`}
          ></div>
          <div
            className={`w-6 h-[2px] rounded-full bg-black transition-all duration-150 ${
              isNavBarOpen ? "-rotate-45 -translate-y-[2px]" : "mt-2"
            }`}
          ></div>
        </button>
      </header>
    </>
  );
};

export default Header;
