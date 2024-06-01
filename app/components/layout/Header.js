"use client";
import Image from "next/image";
import logo from "public/Frame.png";
import { useState } from "react";
const Header = () => {
  const [isNavBarOpen, setIsNavbarOpen] = useState(false);
  const toggleNavBar = () => {
    setIsNavbarOpen((isNavbarOpen) => !isNavbarOpen);
  };
  return (
    <header className="flex justify-between px-4 py-4 items-center border-b">
      <div className="flex items-center justify-center gap-[1px] ">
        <Image src={logo} width={32} height={32} className="w-8 h-8" />
        <p className="font-semibold relative top-[1.5px]">HouseHub</p>
      </div>
      <button className="w-10 h-10" onClick={toggleNavBar}>
        <div
          className={
            isNavBarOpen
              ? "w-6 h-[2px] rounded-full bg-black transition-all duration-150 mx-auto rotate-45 "
              : "w-6 h-[2px] rounded-full bg-black transition-all duration-150 mx-auto  "
          }
        ></div>
        <div
          className={
            isNavBarOpen
              ? "w-6 h-[2px] rounded-full bg-black transition-all duration-150 mx-auto rotate-[-45deg] translate-y-[-0.1rem]"
              : "w-6 h-[2px] rounded-full bg-black transition-all duration-150 mx-auto mt-2 "
          }
        ></div>
      </button>
    </header>
  );
};

export default Header;
