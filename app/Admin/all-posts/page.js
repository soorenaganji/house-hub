"use client";
import React, { useEffect, useState } from "react";
import { getPosts } from "@/app/apiCalls/post";
import DashboardCard from "@/app/components/modules/DashboardCard";
const AllPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPosts();
      setPosts(data);
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col gap-x-12 py-6 px-12 md:px-0 flex-shrink-0 md:flex-row  md:flex-wrap md:gap-y-12 md:items-center md:justify-center">
      {posts.length ? (
        posts.map((post, index) => (
          <div key={index}>
            <DashboardCard data={post} />
          </div>
        ))
      ) : (
        <div>No posts available</div>
      )}
    </div>
  );
};

export default AllPosts;
