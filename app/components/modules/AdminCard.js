"use client"
import PostCard from "./PostCard";
import Link from "next/link";
import toast from "react-hot-toast";
import { deletePost } from "@/app/apiCalls/post";
import { PublishPost } from "@/app/apiCalls/post";
const AdminCard = ({ data }) => {
  const postCardData = JSON.parse(JSON.stringify(data));
  const handlePostDelete = async () => {
    let isUserSure = false;
    const handleUserConfirmation = async (t, confirmation) => {
      toast.dismiss(t.id);
      isUserSure = confirmation;
      if (isUserSure) {
        const response = await deletePost(data._id);
        if (response.data.error) {
          toast.error(response.data.error);
        } else {
          toast.success("Post deleted successfully");
          location.reload()
        }
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

  const handlePublishPost = () => {
    let isUserSure = false;
    const handleUserConfirmation = async (t, confirmation) => {
      toast.dismiss(t.id);
      isUserSure = confirmation;
      if (isUserSure) {
        const response = await PublishPost(data._id);
        if (response.error) {
          toast.error(response.data.error);
        } else {
          toast.success("Post Published successfully");
          location.reload()
        }
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
            <span className="text-sm font-medium text-gray-900">
              Are you sure you want to publish this post?
            </span>
            <div className="ml-4 flex-shrink-0 flex space-x-2">
              <button
                onClick={() => handleUserConfirmation(t, true)}
                className=" rounded-md p-2 flex items-center justify-center text-sm font-medium  focus:outline-none "
              >
                Publish
              </button>
              <button
                onClick={() => handleUserConfirmation(t, false)}
                className=" rounded-md p-2 flex items-center justify-center text-sm font-medium  focus:outline-none "
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    ));
  };
  return (
    <div className="max-w-[250px] rounded-lg shadow-lg bg-white">
      <PostCard {...postCardData} />
      <div className=" px-3 pb-2 flex items-center justify-center ">
        <button
          onClick={handlePostDelete}
          className={`block py-3 px-2 w-16 mx-auto rounded-l-lg text-sm border text-red-500 border-red-500  text-center flex-1`}
        >
          Remove
        </button>
        <Link
          href={`/Admin/confirm-posts/${data._id}`}
          className=" w-16 px-2 flex-1 py-3 flex-shrink-0 text-sm border-blue-500 border-t border-b   text-blue-500  flex items-center justify-start hover:text-white hover:bg-blue-500 transition-all duration-150 "
        >
          Preview
        </Link>
        <button
          onClick={handlePublishPost}
          className={`block py-3 px-2 w-16 mx-auto rounded-r-lg text-sm border text-primary border-primary  text-center flex-1`}
        >
          Publish
        </button>
      </div>
    </div>
  );
};

export default AdminCard;
