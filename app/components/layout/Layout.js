"use client";
import Header from "./Header";
import Link from "next/link";
import { useState } from "react";
import Footer from "./Footer";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
const Layout = ({ children }) => {
  const { data } = useSession();
  const [isNavBarOpen, setIsNavbarOpen] = useState(false);
  const pathname = usePathname();
  const isAuthPage = pathname === "/signup" || pathname === "/login";
  const isDashboard =
    pathname.includes("/dashboard") || pathname.includes("/Admin");

  return (
    <>
      {!isAuthPage ? (
        <>
          <div className="transition-all duration-150 fixed z-50 top-0  w-full">
            <Header
              isNavBarOpen={isNavBarOpen}
              setIsNavbarOpen={setIsNavbarOpen}
            />

            <div
              className={`absolute transition-all duration-150 overflow-hidden right-0 border-l ${
                isNavBarOpen
                  ? "bg-[#00000072] h-screen w-screen"
                  : "border-none bg-transparent h-0"
              }`}
            >
              <div
                className={`absolute bg-white right-0 transition-all duration-150 border-l ${
                  isNavBarOpen
                    ? "h-screen w-[45%] right-0"
                    : "border-none bg-transparent -right-80"
                }`}
              >
                <div
                  className={`flex flex-col gap-4 px-4 transition-all duration-150 pt-8 ${
                    isNavBarOpen ? "" : "hidden"
                  }`}
                >
                  {data ? (
                    <Link
                      onClick={() => setIsNavbarOpen(false)}
                      href={"/dashboard"}
                    >
                      Dashboard
                    </Link>
                  ) : (
                    <>
                      {" "}
                      <Link
                        onClick={() => setIsNavbarOpen(false)}
                        href={"/login"}
                        className="bg-primary text-white w-20 h-10 mx-auto flex items-center justify-center rounded-md"
                      >
                        Login
                      </Link>
                      <Link
                        onClick={() => setIsNavbarOpen(false)}
                        href={"/signup"}
                        className="text-primary mx-auto"
                      >
                        Signup
                      </Link>{" "}
                    </>
                  )}
                  <Link onClick={() => setIsNavbarOpen(false)} href={"/feed?sort=date&filter=sell"}>
                    Rent
                  </Link>
                  <Link onClick={() => setIsNavbarOpen(false)} href={"/feed?sort=date&filter=sell"}>
                    Buy
                  </Link>
                  <Link onClick={() => setIsNavbarOpen(false)} href={"/feed?sort=date&filter=sell"}>
                    Sell
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <main className="min-h-screen pt-20">{children}</main>
          {!isDashboard && <Footer />}
        </>
      ) : (
        <main className="min-h-screen">{children}</main>
      )}
    </>
  );
};

export default Layout;
