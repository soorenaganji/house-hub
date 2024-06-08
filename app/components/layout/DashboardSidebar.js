"use client";
import { useState } from "react";
import { MdSpaceDashboard, MdOutlineLogout } from "react-icons/md";
import { CiSquarePlus, CiBoxList, CiUser } from "react-icons/ci";
import { signOut } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from 'next/navigation';

const DashBoardSidebar = ({ children }) => {
      const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleSignOut = async (e) => {
    e.preventDefault()
    toast.promise(() => signOut({ redirect: false }), {
      loading: "Signing out...",
      success: "Signed out successfully!",
      error: "Sign out failed!",
    });
   await router.push("/")
  };
  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuItemClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="pt-8 w-ful min-h-screen px-4">
      <div className="relative ">
        <button
          onClick={handleMenuToggle}
          className="p-2 border rounded-md flex items-center justify-center gap-2 float-left hover:border-primary hover:shadow-md transition-all duration-150"
        >
          <MdSpaceDashboard className="text-2xl text-primary" />
          Dashboard Menu
        </button>

        {isMenuOpen && (
          <div className="absolute top-16 -left-2 w-48 bg-white shadow-lg rounded-md p-4 z-50 transition-all duration-300 ease-in-out">
            <ul>
              <li
                className="py-2 border-b border-gray-300 flex items-center gap-2 cursor-pointer"
                onClick={handleMenuItemClick}
              >
                <CiUser className="text-lg" />
                <a href="/dashboard/account" className="text-black">
                  Account
                </a>
              </li>
              <li
                className="py-2 border-b border-gray-300 flex items-center gap-2 cursor-pointer"
                onClick={handleMenuItemClick}
              >
                <CiBoxList className="text-lg" />
                <a href="/dashboard/my-posts" className="text-black">
                  My Posts
                </a>
              </li>
              <li
                className="py-2 border-b border-gray-300 flex items-center gap-2 cursor-pointer"
                onClick={handleMenuItemClick}
              >
                <CiSquarePlus className="text-lg" />
                <a href="/dashboard/add-post" className="text-black">
                  Add Post
                </a>
              </li>
              <li
                className="py-2 flex items-center gap-2 cursor-pointer"
                onClick={handleMenuItemClick}
              >
                <MdOutlineLogout className="text-lg text-red-500" />
                <button onClick={handleSignOut} className="text-red-500">
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
      {children}
    </div>
  );
};

export default DashBoardSidebar;
