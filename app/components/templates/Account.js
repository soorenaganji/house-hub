"use client";

import { useState, useEffect } from "react";
import { getUser, editUser } from "@/app/apiCalls/user";
import InputField from "@/app/components/elements/InputField";
import Image from "next/image";
import toast from "react-hot-toast";
import loadingGif from "@/public/loading.gif";
import handWaving from "@/public/emoji.png";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import DashboardCard from "@/app/components/modules/DashboardCard";

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
        console.log(userData);
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
      console.log("Submitting form data:", formData);
      const updatedUser = await editUser(formData);
      console.log("Updated user data:", updatedUser);
      setUser( {
        ...user ,
        name : updatedUser.name ,
        lastName : updatedUser.lastName
      });
      toast.success("User data updated successfully");
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update user data:", error);
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
      <div className="flex justify-center items-start mt-8 w-screen h-screen">
        <Image src={loadingGif} alt="Loading" width={100} height={100} className="w-72 h-72 " />
      </div>
    );
  }

  return (
    <div className="max-w-sm mx-auto mt-24">
      <div className="flex items-end justify-around mb-12">
        <Image
          src={handWaving}
          alt="Hand Waving"
          width={96}
          height={96}
          className="ml-2"
        />
        <h2 className="text-2xl font-bold mb-4">Hello, {user.name}</h2>
      </div>
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
          <div className="mb-12 mt-4">
            <p className="mb-8 text-lg">
              <span className="font-semibold">Name:</span> {user.name}
            </p>
            <p className="mb-8 text-lg">
              <span className="font-semibold">Last Name:</span> {user.lastName}
            </p>
            <p className="mb-8 text-lg">
              <span className="font-semibold">Email:</span> {user.email}
            </p>
          </div>
          <div className="mt-8 mb-12  ">
            <h3 className="text-xl font-bold mb-4">Your Posts</h3>
            <div className="flex flex-row overflow-x-scroll space-x-12 snap-x snap-mandatory py-6 hide-scroll-bar px-8">
              {user?.posts?.map((post) => (
                <DashboardCard
                  key={post.id}
                  data={post}
                  isOnAccountPage={true}
                />
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between gap-3 flex-row-reverse">
            <button
              className="w-full bg-primary text-white rounded-lg py-2"
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </button>
            <button
              className="w-full bg-secondary/10 border border-secondary text-secondary rounded-lg py-2"
              onClick={handleLogout}
            >
              Log Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Account;
