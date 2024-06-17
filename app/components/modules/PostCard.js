// components/PostCard.js
import { FaBed, FaBath, FaRulerCombined } from "react-icons/fa";
import { GoStarFill } from "react-icons/go";
import Image from "next/image";
import NoImage from "public/noPhoto.jpeg";
const PostCard = ({
  title,
  description,
  city,
  street,
  zipcode,
  phoneNumber,
  email,
  rentalOrSell,
  deposit,
  mortgage,
  price,
  facilities,
  rules,
  imageUrl,
  isPopular,
  bedroomsCount,
  bathroomsCount,
  size,
}) => {
  console.log(size + "sth");
  return (
    <div className="max-w-[250px] rounded-lg   shadow-lg bg-white">
      <div className="relative">
        <Image
          src={imageUrl ? imageUrl : NoImage}
          alt={title}
          className="w-full h-48 object-cover "
          width={400}
          height={300}
        />
        <div className="absolute  -left-2">
          <div className=" bg-primary text-white px-3 py-1 text-xs rounded-r-lg flex items-center justify-center gap-2">
            <GoStarFill />
            POPULAR
          </div>
          <div className="w-0 h-0 border-l-[10px] border-l-transparent  border-t-[10px] border-t-primary"></div>
        </div>
      </div>
      <div className="p-4 mt-4">
        <div className="text-primary font-bold text-lg flex items-center justify-start">
          ${price ? price : deposit}{" "}
          <p
            className={
              price
                ? "p-1 rounded-md text-black ml-8 text-xs font-light bg-indigo-200"
                : "ml-8 text-slate-600 font-semibold "
            }
          >
            {price ? "For Sale" : "$" + mortgage + "/month"}
          </p>
        </div>
        <div className="font-bold text-xl my-2">{title}</div>
        <div className="text-gray-500 mb-3">{city}</div>
        <div className="flex items-center text-gray-700 text-sm">
          <FaBed className="mr-2" /> {bedroomsCount ? bedroomsCount : 2}
          <FaBath className="ml-4 mr-2" /> {bathroomsCount ? bathroomsCount : 1}
          <FaRulerCombined className="ml-4 mr-2" /> {size} m²
        </div>
      </div>
    </div>
  );
};

export default PostCard;
