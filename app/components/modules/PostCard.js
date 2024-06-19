// components/PostCard.js
import { BiBath } from "react-icons/bi";
import { TbSquareRotated } from "react-icons/tb";
import { GoStarFill } from "react-icons/go";
import { LiaBedSolid } from "react-icons/lia";
import Image from "next/image";
import NoImage from "public/noPhoto.jpeg";
import { formatNumber } from "@/app/helper/functions";
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
  imageUrls,
  isPopular,
  bedroomsCount,
  bathroomsCount,
  size,
}) => {
  return (
    <div className="max-w-[250px] rounded-lg   shadow-lg bg-white">
      <div className="relative">
        <Image
          src={
            imageUrls ? (imageUrls[0] ? `${imageUrls[0]}` : NoImage) : NoImage
          }
          alt={title}
          className="w-[400px] h-48 object-cover rounded-t-lg mb-1"
          width={400}
          height={300}
        />
        <div className="absolute  -left-2">
          <div className=" bg-primary text-white px-3 py-[6px] font-medium text-xs  rounded-tl-lg rounded-tr-lg rounded-br-lg rounded-bl-none flex items-center justify-center gap-2">
            <GoStarFill />
            POPULAR
          </div>
          <div className="w-0 h-0 border-l-[10px] border-l-transparent  border-t-[10px] border-t-[#5245ED] "></div>
        </div>
      </div>
      <div className="p-4 mt-6">
        <div className="text-primary font-extrabold text-lg flex items-center justify-start">
          ${price ? formatNumber(price) : formatNumber(deposit)}{" "}
          <p
            className={
              price
                ? "p-1 rounded-md text-black ml-6 text-xs font-light bg-indigo-200"
                : "ml-8 text-slate-600 font-semibold "
            }
          >
            {price ? "For Sale" : "$" + formatNumber(++mortgage) + "/month"}
          </p>
        </div>
        <div className="font-bold text-xl my-2">{title}</div>
        <div className="text-gray-500 mb-3">{city}</div>
        <div className="flex items-center text-gray-700 text-sm">
          <LiaBedSolid className="mr-2 text-primary" />{" "}
          {bedroomsCount ? bedroomsCount : 2}
          <BiBath className="ml-4 mr-2 text-primary" />{" "}
          {bathroomsCount ? bathroomsCount : 1}
          <TbSquareRotated className="ml-4 mr-2 text-primary" /> {size} m²
        </div>
      </div>
    </div>
  );
};

export default PostCard;
