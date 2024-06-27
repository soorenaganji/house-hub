"use client";

import { useState } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import NoImage from "public/noPhoto.jpeg";
import ContactModal from "../modules/ContactModal";

const PostView = ({ data, images }) => {
  const isSale = data.rentalOrSell === "sell";
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const openContactModal = () => {
    setIsContactModalOpen(true);
  };
  const closeContactModal = () => {
    setIsContactModalOpen(false);
  };
  // Transform images array to match react-image-gallery format
  const galleryImages = images.map((image) => ({
    original: image.url,
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
                <div className="flex items-center justify-center gap-3 mt-6 flex-wrap">
                  {data.facilities.length ? (
                    data.facilities.map((f, index) => (
                      <span
                        key={index}
                        className={`p-2 rounded-lg ${
                          isSale ? "bg-primary" : "bg-secondary"
                        }`}
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
                <div className="flex items-center justify-center gap-3 flex-wrap mt-6">
                  {data.rules.length ? (
                    data.rules.map((r, index) => (
                      <span
                        key={index}
                        className={`p-2 rounded-lg ${
                          isSale ? "bg-primary" : "bg-secondary"
                        }`}
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
              {isContactModalOpen ? (
                <div className="w-full flex items-center justify-center" >
                <ContactModal
                  closeContactModal={closeContactModal}
                  email={data.email}
                  phoneNumber={data.phoneNumber}
                  className={isContactModalOpen ? "" : "translate-x-24"}
                /></div>
              ) : (
                <button
                  onClick={openContactModal}
                  className={`w-full text-lg mt-16 text-white rounded-lg py-3 ${
                    isSale ? "bg-primary" : "bg-secondary"
                  }`}
                >
                  Contact
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostView;
