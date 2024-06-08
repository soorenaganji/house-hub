"use client";
import Image from "next/image";
import Link from "next/link";
import logo from "public/Frame.png";
import { useState, useEffect } from "react";
const Header = ({ isNavBarOpen, setIsNavbarOpen }) => {
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
    <header
      className={`flex justify-between px-4 py-4 items-center transition-all duration-350 w-full    ${
        isScrolled ? "bg-[#ffffff] shadow-md" : "bg-[#ffffff85]"
      } ${isNavBarOpen ? "shadow-md" : ""} `}
    >
      <Link href={"/"} className="flex items-center justify-center gap-[1px] ">
        <Image
          src={logo}
          width={32}
          height={32}
          className="w-8 h-8"
          alt="HouseHub"
        />
        <p className="font-semibold relative top-[1.5px]">HouseHub</p>
      </Link>
      <button className="w-10 h-10  px-2 " onClick={toggleNavBar}>
        <div
          className={`w-6 h-[2px] rounded-full bg-black transition-all duration-150 ${
            isNavBarOpen ? " rotate-45 " : ""
          }`}
        ></div>
        <div
          className={`w-6 h-[2px] rounded-full bg-black transition-all duration-150 ${
            isNavBarOpen ? " -rotate-45 -translate-y-[2px] " : " mt-2 "
          }`}
        ></div>
      </button>
    </header>
  );
};

export default Header;
