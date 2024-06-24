"use client";
import Link from "next/link";
import PostCard from "./PostCard";
import toast from "react-hot-toast";
import { deletePost } from "@/app/apiCalls/post";
const DashboardCard = ({ data }) => {
  const handlePostDelete = async () => {
    let isUserSure = false
     const handleUserConfirmation = async (t , confirmation) => {
      toast.dismiss(t.id);
      isUserSure = confirmation;
      if(isUserSure){
        const response = await deletePost(data._id);
        if (response.data.error) {
          toast.error(response.data.error);
        } else {
          toast.success("Post deleted successfully");
        }
      }
     }
     toast.custom((t) => (
      <div
        className={`${
          t.visible ? "animate-enter" : "animate-leave"
        } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
      >
        <div className="flex-1 w-0 p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-900">
              Are you sure you want to delete this post permanently?
            </span>
            <div className="ml-4 flex-shrink-0 flex space-x-2">
              <button
                onClick={() => handleUserConfirmation(t, true)}
                className=" rounded-md p-2 flex items-center justify-center text-sm font-medium text-red-600 hover:text-red-500 focus:outline-none "
              >
                Delete
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
  const postCardData = JSON.parse(JSON.stringify(data));
  return (
    <div className="max-w-[250px] rounded-lg shadow-lg bg-white">
      <PostCard {...postCardData} />
      <div className="flex items-center justify-between px-4 pb-2">
        <Link
          href={`/dashboard/my-posts/edit/${data._id}`}
          className="px-3 py-2 bg-green-500 text-white rounded-lg flex items-center justify-start "
        >
          {" "}
          Edit
        </Link>
        <button
          onClick={handlePostDelete}
          className="px-3 py-2 bg-red-500 text-white rounded-lg flex items-center justify-start "
        >
          {" "}
          Delete
        </button>
      </div>
    </div>
  );
};

export default DashboardCard;
