"use client";
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
  bedroomsCount,
  bathroomsCount,
  size,
  userId,
  isOnAccountPage
}) => {
  const handleImageUrl = () => {
    if (imageUrls && imageUrls[0] && imageUrls[0] !== "h" && typeof imageUrls[0] === "string") {
      return `${imageUrls[0]}`;
    } else {
      return NoImage;
    }
  };
  return (
    <>
      <div className="">
        <div className={` ${isOnAccountPage ? "hidden" : ""}  relative w-24  top-8 -mt-2`}>
          <div
            className={`bg-white/80 backdrop-blur-lg ${
              price ? "text-primary" : "text-secondary"
            }  px-3 py-1 text-xs rounded-r-lg flex items-center justify-center gap-2`}
          >
            <GoStarFill />
            {price ? "For Sale" : "For Rent"}
          </div>
        </div>
       
        <Image
          src={handleImageUrl()}
          alt={title}
          className={`w-[400px] h-48 object-cover rounded-t-lg mb-1 ${isOnAccountPage ? "hidden" : ""} `}
          width={400}
          height={300}
        />
      </div>
      <div className="p-4">
        <div className="text-primary font-extrabold text-lg flex items-center justify-start">
          {price ? (
            "$" + formatNumber(price)
          ) : (
            <span className="text-secondary">${formatNumber(deposit)}</span>
          )}{" "}
          <p className={price ? "" : "ml-8 text-slate-600 font-semibold "}>
            {price ? (
              ""
            ) : (
              <span className="">
                {"$" + formatNumber(++mortgage) + "/month"}
              </span>
            )}
          </p>
        </div>
        <div className="font-bold text-xl my-2">{title}</div>
        <div className="text-gray-500 mb-3">{city}</div>
        <div className={`flex items-center text-gray-700 text-sm pb-2 border-b ${isOnAccountPage ? "hidden" : ""} `}>
          <LiaBedSolid
            className={`mr-2 ${price ? "text-primary" : "text-secondary"}`}
          />{" "}
          {bedroomsCount ? bedroomsCount : 2}
          <BiBath
            className={`ml-4 mr-2 ${price ? "text-primary" : "text-secondary"}`}
          />{" "}
          {bathroomsCount ? bathroomsCount : 1}
          <TbSquareRotated
            className={`ml-4 mr-2 ${price ? "text-primary" : "text-secondary"}`}
          />{" "}
          {size} m²
        </div>
      </div>
    </>
  );
};

export default PostCard;
