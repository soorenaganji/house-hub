"use client";
import { useState, useEffect } from "react";
import { getPost } from "@/app/apiCalls/post";
import PostView from "@/app/components/templates/PostView";
const Feed = ({ params }) => {
  const id = params.postId;

  const [post, setPost] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPost();
      const targetPost = await data.filter((post) => post._id === id);
      console.log("post dsldaskocnadjks;:", targetPost);
      setPost(await targetPost[0]);
    };

    fetchData();
  }, []);
  console.log("post dsldaskocnadjks;,dlwvmlq:", post);

  return (
    <div>
      <PostView data={post} />
    </div>
  );
};

export default Feed;
