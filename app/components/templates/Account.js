"use client";

import { useState, useEffect } from "react";
import { getUser, editUser } from "@/app/apiCalls/user";
import InputField from "@/app/components/elements/InputField";
import Image from "next/image";
import toast from "react-hot-toast";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import DashboardCard from "@/app/components/modules/DashboardCard";
import { FiEdit3 } from "react-icons/fi";
import { MdOutlineLogout } from "react-icons/md";
import Link from "next/link";

const Account = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    name: "",
    lastName: "",
    posts: [],
  });
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUser();
        setUser(userData);
        setFormData({
          name: userData.name,
          lastName: userData.lastName,
          email: userData.email,
          posts: userData.posts,
        });
      } catch (error) {
        toast.error("Failed to fetch user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  function getEmailPrefix(email) {
    const atIndex = email.indexOf("@");
    if (atIndex === -1) {
      return "";
    }
    return email.substring(0, atIndex);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async () => {
    const { name, lastName } = formData;

    if (!name || !lastName) {
      toast.error("All fields are required");
      return;
    }

    setSubmitting(true);
    try {
      const updatedUser = await editUser(formData);
      setUser({
        ...user,
        name: updatedUser.name,
        lastName: updatedUser.lastName,
      });
      toast.success("User data updated successfully");
      setIsEditing(false);
    } catch (error) {
      toast.error("Failed to update user data");
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user.name,
      lastName: user.lastName,
      email: user.email,
    });
    setIsEditing(false);
  };

  const handleLogout = async (e) => {
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
              Are you sure you want to Log out ?
            </span>
            <div className="ml-4 flex-shrink-0 flex space-x-2">
              <button
                onClick={() => handleUserConfirmation(t, true)}
                className=" rounded-md p-2 flex items-center justify-center text-sm font-medium text-red-600 hover:text-red-500 focus:outline-none "
              >
                Log Out
              </button>
              <button
                onClick={() => handleUserConfirmation(t, false)}
                className=" rounded-md p-2 flex items-center justify-center text-sm font-medium text-primary hover:text-indigo-300 focus:outline-none "
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    ));
  };

  if (loading) {
    return (
      <div className="flex flex-col space-y-4 p-4 w-full h-screen mt-8 ">
        <div className="w-full h-24 rounded-lg bg-gray-300 shimmer"></div>
        <div className="flex space-x-4">
          <div className="w-16 h-16 rounded-full bg-gray-300 shimmer"></div>
          <div className="flex-1 space-y-4">
            <div className="h-4 w-3/4 bg-gray-300 shimmer rounded"></div>
            <div className="h-4 w-1/2 bg-gray-300 shimmer rounded"></div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="h-4 w-full bg-gray-300 shimmer rounded"></div>
          <div className="h-4 w-full bg-gray-300 shimmer rounded"></div>
          <div className="h-4 w-full bg-gray-300 shimmer rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-sm mx-auto mt-24">
      {isEditing ? (
        <div className="">
          <InputField
            label="Name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
          />
          <InputField
            label="Last Name"
            name="lastName"
            type="text"
            value={formData.lastName}
            onChange={handleChange}
          />
          <p className="">
            <span className="">Email</span>
            <span
              className="w-full border p-2 block rounded focus:border-primary mb-4 focus:shadow-md focus:outline-none transition-all duration-150"
              onClick={() => toast.error("Not Editable")}
            >
              {user.email}
            </span>
          </p>
          <div className="flex space-x-2 mt-4">
            <button
              className="flex-1 bg-secondary/10 border border-secondary text-secondary rounded-lg py-2"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              className={`flex-1 bg-primary text-white rounded-lg py-2 ${
                submitting ? "opacity-50" : ""
              }`}
              onClick={handleSubmit}
              disabled={submitting}
            >
              {submitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="w-full py-4 rounded-lg bg-primary flex items-center justify-between px-3">
            <div className="text-white flex items-center justify-start gap-4 ">
              <Image
                src={`https://avatar.iran.liara.run/username?username=${user.name}+${user.lastName}`}
                width={48}
                height={48}
              />
              <div>
                <h3 className=" text-lg first-letter:capitalize ">
                  {user.name}
                </h3>
                <p className="text-xs text-slate-200 mt-1">
                  @{getEmailPrefix(user.email)}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsEditing(true)}
              className="h-full px-3 text-xl text-white"
            >
              <FiEdit3 />
            </button>
          </div>
          <div className="mt-16 mb-12">
            <h3 className="text-xl font-bold mb-4">Your Posts</h3>
            <div className="flex flex-row overflow-x-scroll space-x-12 snap-x snap-mandatory py-6 hide-scroll-bar px-8">
              {user.posts.length ? user?.posts?.map((post) => (
                <DashboardCard
                  key={post.id}
                  data={post}
                  isOnAccountPage={false}
                />
              )) : <h3 className="text-2xl font-semibold " > No Post Yet :( <span className="block text-sm  font-light mt-6 " >You can Add your first post <Link href={"/dashboard/add-post"} className="text-primary underline" >HERE</Link></span> </h3>}
            </div>
          </div>
          <div className="flex items-center mb-6 justify-between gap-3 flex-row-reverse">
            <button
              className="w-full text-lg  bg-secondary/10 border flex items-center justify-center gap-3 border-secondary text-secondary rounded-lg py-3"
              onClick={handleLogout}
            >
              <MdOutlineLogout /> Log out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Account;
