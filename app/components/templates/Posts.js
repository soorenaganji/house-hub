import DashboardCard from "../modules/DashboardCard";

const Posts = async ({ posts }) => {
  console.log(posts);
  return (
    <div className="w-full flex items-center justify-start flex-col-reverse gap-12 my-24 ">
      {(await posts?.length) ? (
        posts.map((post) => (
          <>
            <DashboardCard data={post}  />
          </>
        ))
      ) : (
        <p>No Post yet</p>
      )}
    </div>
  );
};

export default Posts;
