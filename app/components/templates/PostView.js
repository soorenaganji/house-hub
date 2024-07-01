"use client";

import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import NoImage from "public/noPhoto.jpeg";
import { LuMailPlus } from "react-icons/lu";
import { SlCallOut } from "react-icons/sl";
const PostView = ({ data }) => {
  const images = data.imageUrls;
  const isSale = data.rentalOrSell === "sell";
  // Transform images array to match react-image-gallery format
  const galleryImages = images.map((image) => ({
    original: image.url ? image.url : image,
  }));
  // Custom renderItem function to handle image errors and set static dimensions
  const renderItem = (item) => (
    <img
      src={item.original}
      alt="Gallery image"
      onError={(e) => {
        e.target.onerror = null; // Prevent looping
        e.target.src = NoImage.src;
      }}
      className="w-64 h-64 object-cover mx-auto"
    />
  );

  return (
    <>
      <div>
        <div className="py-4  mx-auto mt-24 overflow-hidden ">
          <ImageGallery
            items={galleryImages}
            showThumbnails={false}
            useBrowserFullscreen={false}
            showPlayButton={false}
            showIndex={true}
            renderItem={renderItem}
          />
          <div className="mt-4">
            <h1
              className={`text-2xl font-bold ${
                isSale ? "text-primary" : "text-secondary"
              }`}
            >
              {data.title}
            </h1>

            <div className="mt-8 space-y-6">
              <p>
                <span className="font-semibold">City:</span> {data.city}
              </p>
              <p>
                <span className="font-semibold">Street:</span> {data.street}
              </p>
              <p>
                <span className="font-semibold">Zipcode:</span> {data.zipcode}
              </p>
              <p>
                <span className="font-semibold">Size:</span> {data.size} m²
              </p>
              <p>
                <span className="font-semibold">Bedrooms:</span>{" "}
                {data.bedroomsCount}
              </p>
              <p>
                <span className="font-semibold">Bathrooms:</span>{" "}
                {data.bathroomsCount}
              </p>
              {data.rentalOrSell === "sell" ? (
                <p>
                  <span className="font-semibold">Price:</span> {data.price} $
                </p>
              ) : (
                <>
                  <p>
                    <span className="font-semibold">Deposit:</span>{" "}
                    {data.deposit} $
                  </p>
                  <p>
                    <span className="font-semibold">Mortgage:</span>
                    {data.mortgage} $
                  </p>{" "}
                </>
              )}
            </div>
            <div className="w-full mt-12 pb-4 overflow-hidden  ">
              <h5 className="mb-6 text-xl font-semibold">Description :</h5>
              <p>{data.description}</p>
              <div className="mt-12 mb-6">
                <p className="font-semibold">Facilities:</p>
                <div className="flex items-center justify-start gap-3 mt-6 flex-wrap">
                  {data.facilities.length ? (
                    data.facilities.map((f, index) => (
                      <span
                        key={index}
                        className={`p-2 rounded-md bg-accent text-white`}
                      >
                        {f}
                      </span>
                    ))
                  ) : (
                    <p
                      className={`${
                        isSale ? "text-primary" : "text-secondary"
                      } `}
                    >
                      No Facilities are defined
                    </p>
                  )}
                </div>
              </div>
              <div className="mt-12">
                <p className="font-semibold">Rules :</p>
                <div className="flex items-center justify-start gap-3 flex-wrap mt-6">
                  {data.rules.length ? (
                    data.rules.map((r, index) => (
                      <span
                        key={index}
                        className={`p-2 rounded-md bg-accent text-white`}
                      >
                        {r}
                      </span>
                    ))
                  ) : (
                    <p
                      className={`${
                        isSale ? "text-primary" : "text-secondary"
                      } `}
                    >
                      No Rules are defined
                    </p>
                  )}
                </div>
              </div>

              <div className="w-full  flex items-center justify-center gap-2">
                <a
                  href={`tel:${data.phoneNumber}`}
                  className={`px-8 flex transition-all duration-150 items-center gap-2 text-lg mt-16 text-slate-200 hover:text-white rounded-lg py-3 hover:shadow-lg hover:shadow-green-300 bg-green-500 `}
                >
                  <SlCallOut className="text-xl" /> Call
                </a>
                <a
                  href={`mailto:${data.email}`}
                  target="blank"
                  className={`px-8 flex transition-all duration-150 items-center gap-2 text-lg mt-16 text-slate-200 hover:text-white rounded-lg py-3 hover:shadow-lg hover:shadow-blue-300 bg-blue-500 `}
                >
                  <LuMailPlus className="text-xl" /> Email
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostView;
