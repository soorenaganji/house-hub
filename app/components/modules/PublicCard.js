import PostCard from "./PostCard";
import Link from "next/link";
const PublicCard = ({ data }) => {
  return (
    <div className="max-w-[250px] rounded-lg shadow-lg bg-white flex-shrink-0 snap-center">
      <PostCard {...data} />
      <div className=" px-2 pb-2">
        <Link
          href={`/feed/${data._id}`}
          className={`block py-2 px-2 mx-auto rounded-lg bg-primary text-white text-center `}
        >
          See Post
        </Link>
      </div>
    </div>
  );
};

export default PublicCard;
