"use client";
import React, { useEffect, useState } from "react";
import PublicCard from "@/app/components/modules/PublicCard";
import { getPosts } from "@/app/apiCalls/post";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import toast from "react-hot-toast";
const Feed = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsData = await getPosts();
        setPosts(postsData);
      } catch (err) {
        toast.error("Error fetching post details");
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className=" w-full flex items-center justify-start flex-col-reverse gap-12 my-24 ">
      {posts.length ? (
        posts.map((post, index) => <PublicCard data={post} key={index} />)
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

export default Feed;
