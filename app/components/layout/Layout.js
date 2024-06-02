"use client";
import Header from "./Header";
import Link from "next/link";
import { useState } from "react";
const Layout = () => {
  const [isNavBarOpen, setIsNavbarOpen] = useState(false);
  return (
    <div className="transition-all duration-150 ">
      <Header isNavBarOpen={isNavBarOpen} setIsNavbarOpen={setIsNavbarOpen} />

      <>
        <div
          className={`h-screen w-[45%] fixed transition-size duration-150  right-0  border-l ${
            isNavBarOpen
              ? "transition-all duration-150 "
              : " w-[0.0001%] border-none "
          } `}
        >
          <div
            className={`flex flex-col gap-4 px-4 transition-all duration-150 pt-8 ${
              isNavBarOpen ? "" : "hidden"
            } `}
          >
            <Link
              href={"/"}
              className="bg-primary text-white w-20 h-10 mx-auto flex items-center justify-center rounded-md "
            >
              Login
            </Link>
            <Link href={"/"} className="text-primary mx-auto">
              Signup
            </Link>
            <Link href={"/"}>Rent</Link>
            <Link href={"/"}>Buy</Link>
            <Link href={"/"}>Sell</Link>
            <Link href={"/"}>ManageProperty</Link>
            <Link href={"/"}>Resources</Link>
          </div>
        </div>
      </>
    </div>
  );
};

export default Layout;
