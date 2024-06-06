"use client";
import Header from "./Header";
import Link from "next/link";
import { useState } from "react";
import Footer from "./Footer";
const Layout = ({ children }) => {
  const [isNavBarOpen, setIsNavbarOpen] = useState(false);
  return (
    <>
      {" "}
      <div className="transition-all duration-150 fixed z-50 top-0  w-full  ">
        <Header isNavBarOpen={isNavBarOpen} setIsNavbarOpen={setIsNavbarOpen} />

        <div
          className={` absolute transition-all duration-150 overflow-hidden  right-0  border-l ${
            isNavBarOpen
              ? "bg-[#00000072] h-screen w-screen "
              : "border-none  bg-transparent h-0"
          }
        `}
        >
          <div
            className={` absolute bg-white right-0 transition-all duration-150  border-l ${
              isNavBarOpen
                ? "h-screen w-[45%]right-0 "
                : "  border-none bg-transparent -right-80 "
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
        </div>
      </div>
      {children}
      <Footer />
    </>
  );
};

export default Layout;
