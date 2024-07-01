"use client";
import { useState } from "react";
import { BiBath } from "react-icons/bi";
import { TbSquareRotated } from "react-icons/tb";
import { LiaBedSolid } from "react-icons/lia";
import Image from "next/image";
import NoImage from "public/noPhoto.jpeg";
import { formatNumber } from "@/app/helper/functions";
import { FaTags, FaKey } from "react-icons/fa";
import ReactImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

const PostCard = ({
  title,
  city,
  rentalOrSell,
  deposit,
  mortgage,
  price,
  imageUrls,
  bedroomsCount,
  bathroomsCount,
  size,
}) => {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
console.log(size)
  const handleImageUrl = () => {
    if (
      imageUrls &&
      imageUrls[0] &&
      imageUrls[0] !== "h" &&
      typeof imageUrls[0] === "string"
    ) {
      return `${imageUrls[0]}`;
    } else {
      return NoImage;
    }
  };

  const galleryImages =
    imageUrls && imageUrls.length
      ? imageUrls.map((url) => ({
          original: url,
          thumbnail: url,
        }))
      : [{ original: NoImage, thumbnail: NoImage }];

  const handleImageClick = () => {
    setIsGalleryOpen(true);
  };

  const handleGalleryClose = () => {
    setIsGalleryOpen(false);
  };

  const renderItem = (item) => (
    <img
      src={item.original}
      alt="Gallery image"
      onError={(e) => {
        e.target.onerror = null; // Prevent looping
        e.target.src = NoImage.src;
      }}
      className="w-72 h-72 object-cover mx-auto mt-36 "
    />
  );

  return (
    <>
      <div className="flex-shrink-0 w-[250px]">
        <div className={`  relative w-24 top-8 -mt-2`}>
          <div
            className={`bg-white/80 backdrop-blur-lg ${
              price ? "text-primary" : "text-secondary"
            } px-3 py-1 text-xs rounded-r-lg flex items-center justify-center gap-2`}
          >
            {price ? <FaKey /> : <FaTags />}
            {price ? "For Sale" : "For Rent"}
          </div>
        </div>

        <div onClick={handleImageClick}>
          <Image
            src={handleImageUrl()}
            alt={title}
            className={`w-[400px] h-48 object-cover rounded-t-lg mb-1 `}
            width={400}
            height={300}
          />
        </div>
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
        <div
          className={`flex items-center text-gray-700 text-sm pb-2 border-b `}
        >
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

      {isGalleryOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center">
          <div className="relative w-full h-full">
            <button
              className="absolute top-4 right-4 text-white text-2xl z-50"
              onClick={handleGalleryClose}
            >
              &times;
            </button>
            <ReactImageGallery
              items={galleryImages}
              showThumbnails={false}
              showFullscreenButton={false}
              showPlayButton={false}
              showIndex={true}
              renderItem={renderItem}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default PostCard;
