import AdminCard from "../modules/AdminCard";

const ConfirmPost = async ({ posts }) => {
  return (
    <div
      className={
        "w-full flex items-center justify-start flex-col-reverse gap-12 my-24 "
      }
    >
      <div className="w-full flex items-center justify-start flex-col-reverse gap-12 my-24 ">
        {(await posts?.length) ? (
          posts.map((post) => (
            <>
              <AdminCard data={post} />
            </>
          ))
        ) : (
          <p>No Post yet</p>
        )}
      </div>
    </div>
  );
};

export default ConfirmPost;
