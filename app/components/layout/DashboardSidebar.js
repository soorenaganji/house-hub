"use client";
import { useState } from "react";
import { MdSpaceDashboard, MdOutlineLogout } from "react-icons/md";
import { CiSquarePlus, CiBoxList, CiUser, CiSaveUp2 } from "react-icons/ci";
import { PiChartPieSliceLight } from "react-icons/pi";
import { signOut } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

const DashBoardSidebar = ({ children, role }) => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSignOut = async (e) => {
    let isUserSure = false;
    const handleUserConfirmation = async (t, confirmation) => {
      toast.dismiss(t.id);
      isUserSure = confirmation;
      if (isUserSure) {
        await signOut({ redirect: false });
        toast.success("LogOut Successful");
        router.push("/");
        e.preventDefault();
      }
    };

    toast.custom((t) => (
      <div
        className={`${
          t.visible ? "animate-enter" : "animate-leave"
        } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
      >
        <div className="flex-1 w-0 p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-gray-900">
              Are you sure you want to Log out?
            </span>
            <div className="ml-4 flex-shrink-0 flex space-x-2">
              <button
                onClick={() => handleUserConfirmation(t, true)}
                className="rounded-md p-2 flex items-center justify-center text-sm font-medium text-red-600 hover:text-red-500 focus:outline-none"
              >
                Log Out
              </button>
              <button
                onClick={() => handleUserConfirmation(t, false)}
                className="rounded-md p-2 flex items-center justify-center text-sm font-medium text-primary hover:text-indigo-300 focus:outline-none"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    ));
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuItemClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <div className="md:hidden relative">
        <button
          onClick={handleMenuToggle}
          className="p-2 border rounded-xl flex items-center group justify-center gap-2 float-left hover:bg-primary hover:shadow-indigo-200 hover:text-white hover:border-none hover:shadow-lg transition-all duration-150"
        >
          <MdSpaceDashboard className="text-2xl text-primary group-hover:text-white" />
          Dashboard Menu
        </button>
        {isMenuOpen && (
          <div className="absolute top-16 left-0 w-48 bg-white bg-opacity-65 shadow-lg rounded-md p-4 z-50 transition-all duration-300 ease-in-out backdrop-blur-xl border border-white lg:w-64 lg:shadow-none lg:rounded-none lg:border-r lg:static lg:top-0">
            {role === "ADMIN" ? (
              <ul>
                <li
                  className="py-4 border-b border-gray-300 flex items-center gap-2 cursor-pointer"
                  onClick={handleMenuItemClick}
                >
                  <CiUser className="text-lg" />
                  <Link href="/dashboard/account" className="text-black">
                    Account
                  </Link>
                </li>
                <li
                  className="py-4 border-b border-gray-300 flex items-center gap-2 cursor-pointer"
                  onClick={handleMenuItemClick}
                >
                  <CiBoxList className="text-lg" />
                  <Link href="/dashboard/my-posts" className="text-black">
                    All Posts
                  </Link>
                </li>
                <li
                  className="py-4 border-b border-gray-300 flex items-center gap-2 cursor-pointer"
                  onClick={handleMenuItemClick}
                >
                  <CiSquarePlus className="text-lg" />
                  <Link href="/dashboard/add-post" className="text-black">
                    Add Post
                  </Link>
                </li>
                <li
                  className="py-4 border-b border-gray-300 flex items-center gap-2 cursor-pointer"
                  onClick={handleMenuItemClick}
                >
                  <CiSaveUp2 className="text-lg" />
                  <Link href="/Admin/confirm-posts" className="text-black">
                    Confirmation
                  </Link>
                </li>
                <li
                  className="py-4 border-b border-gray-300 flex items-center gap-2 cursor-pointer"
                  onClick={handleMenuItemClick}
                >
                  <PiChartPieSliceLight className="text-lg" />
                  <Link href="/Admin" className="text-black">
                    Analytics
                  </Link>
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
            ) : (
              <ul>
                <li
                  className="py-4 border-b border-gray-300 flex items-center gap-2 cursor-pointer"
                  onClick={handleMenuItemClick}
                >
                  <CiUser className="text-lg" />
                  <Link href="/dashboard/account" className="text-black">
                    Account
                  </Link>
                </li>
                <li
                  className="py-4 border-b border-gray-300 flex items-center gap-2 cursor-pointer"
                  onClick={handleMenuItemClick}
                >
                  <CiBoxList className="text-lg" />
                  <Link href="/dashboard/my-posts" className="text-black">
                    Your Posts
                  </Link>
                </li>
                <li
                  className="py-4 border-b border-gray-300 flex items-center gap-2 cursor-pointer"
                  onClick={handleMenuItemClick}
                >
                  <CiSquarePlus className="text-lg" />
                  <Link href="/dashboard/add-post" className="text-black">
                    Add Post
                  </Link>
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
            )}
          </div>
        )}
      </div>
      <div className="hidden md:block md:w-64 bg-white shadow-lg p-4 lg:shadow-none lg:rounded-none lg:border-r">
        <div className="mb-4">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-primary lg:hidden"
          >
            <MdSpaceDashboard className="text-2xl" />
            <span>Dashboard Menu</span>
          </Link>
        </div>
        {role === "ADMIN" ? (
          <ul>
            <li className="py-4 border-b border-gray-300 flex items-center gap-2">
              <CiUser className="text-lg" />
              <Link href="/dashboard/account" className="text-black">
                Account
              </Link>
            </li>
            <li className="py-4 border-b border-gray-300 flex items-center gap-2">
              <CiBoxList className="text-lg" />
              <Link href="/dashboard/my-posts" className="text-black">
                All Posts
              </Link>
            </li>
            <li className="py-4 border-b border-gray-300 flex items-center gap-2">
              <CiSquarePlus className="text-lg" />
              <Link href="/dashboard/add-post" className="text-black">
                Add Post
              </Link>
            </li>
            <li className="py-4 border-b border-gray-300 flex items-center gap-2">
              <CiSaveUp2 className="text-lg" />
              <Link href="/Admin/confirm-posts" className="text-black">
                Confirmation
              </Link>
            </li>
            <li className="py-4 border-b border-gray-300 flex items-center gap-2">
              <PiChartPieSliceLight className="text-lg" />
              <Link href="/Admin" className="text-black">
                Analytics
              </Link>
            </li>
            <li className="py-2 flex items-center gap-2">
              <MdOutlineLogout className="text-lg text-red-500" />
              <button onClick={handleSignOut} className="text-red-500">
                Logout
              </button>
            </li>
          </ul>
        ) : (
          <ul>
            <li
              className="py-4 border-b border-gray-300 flex items-center gap-2 cursor-pointer"
              onClick={handleMenuItemClick}
            >
              <CiUser className="text-lg" />
              <Link href="/dashboard/account" className="text-black">
                Account
              </Link>
            </li>
            <li
              className="py-4 border-b border-gray-300 flex items-center gap-2 cursor-pointer"
              onClick={handleMenuItemClick}
            >
              <CiBoxList className="text-lg" />
              <Link href="/dashboard/my-posts" className="text-black">
                Your Posts
              </Link>
            </li>
            <li
              className="py-4 border-b border-gray-300 flex items-center gap-2 cursor-pointer"
              onClick={handleMenuItemClick}
            >
              <CiSquarePlus className="text-lg" />
              <Link href="/dashboard/add-post" className="text-black">
                Add Post
              </Link>
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
        )}
      </div>
      <div className="flex-1 p-4" onClick={() => setIsMenuOpen(false)}>
        {children}
      </div>
    </div>
  );
};

export default DashBoardSidebar;
