"use client";

import { useEffect, useState } from "react";
import { getOnePost } from "@/app/apiCalls/post";
import PostView from "@/app/components/templates/PostView";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';
import toast from 'react-hot-toast';

const PostDetailsPage = ({ params }) => {
  const [post, setPost] = useState(null);
  const { postId } = params;

  useEffect(() => {
    if (postId) {
      const fetchPost = async () => {
        try {
          const postData = await getOnePost(postId);
          setPost(postData);
        } catch (err) {
          toast.error("Error fetching post details");
        }
      };
      fetchPost();
    }
  }, [postId]);

  return (
    <div className={"pt-8 w-ful min-h-screen px-4"} >
 
      {post ? (
        <PostView data={post} />
      ) : (
        <div>
          <Skeleton height={40} />
          <Skeleton height={300} />
          <Skeleton count={5} />
        </div>
      )}
    </div>
  );
};

export default PostDetailsPage;
