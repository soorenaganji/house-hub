import PostCard from "../modules/PostCard";

const Posts = ({ posts }) => {
  console.log(posts);
  return (
    <div className="w-full flex items-center justify-start flex-col-reverse gap-12 my-24 ">
      {posts?.length ? (
        posts.map((post) => (
          <>
            <PostCard {...post} />
          </>
        ))
      ) : (
        <p>No Post yet</p>
      )}
    </div>
  );
};

export default Posts;
