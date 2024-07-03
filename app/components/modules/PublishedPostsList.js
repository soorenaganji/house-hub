"use client";
import React, { useEffect, useState } from "react";
import PublicCard from "./PublicCard";
import { getPosts } from "@/app/apiCalls/post";
const PublishedPostsList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPosts();
      setPosts(data);
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-row overflow-x-scroll space-x-12 snap-x snap-mandatory py-6 hide-scroll-bar px-12 flex-shrink-0">
      {posts.length ? (
        posts.map((post, index) => (
          <div key={index}>
            <PublicCard data={post} />
          </div>
        ))
      ) : (
        <div>No posts available</div>
      )}
    </div>
  );
};

export default PublishedPostsList;
