"use client";
import Image from "next/image";
import { useState } from "react";
import avatar1 from "public/avatar1.png";
import avatar2 from "public/avatar2.png";
import avatar3 from "public/avatar3.png";

const TestimonialsSection = () => {
  const userTestimonies = {
    1: [
      "HouseHub is the platform I go to on almost a daily basis for second home and vacation condo shopping, or to just look at dream homes in new areas. Thanks for making home shopping and comparative analyzing so much fun, HouseHub!",
      "Mira Culos",
    ],
    2: [
      "Using HouseHub has been a game-changer for finding rental properties that suit my needs. The platform is user-friendly and offers a wide range of options.",
      "John Doe",
    ],
    3: [
      "As a landlord, HouseHub has made managing my properties so much easier. The platform's tools are invaluable for keeping everything organized and accessible.",
      "Jane Smith",
    ],
  };

  const avatars = [
    { id: 1, src: avatar1, alt: "HouseHub User 1" },
    { id: 2, src: avatar2, alt: "HouseHub User 2" },
    { id: 3, src: avatar3, alt: "HouseHub User 3" },
  ];

  const [userTestimony, setUserTestimony] = useState(userTestimonies[1]);
  const [activeIndex, setActiveIndex] = useState(1);
  const [fade, setFade] = useState(false);

  const switchUserTestimony = (number) => {
    setFade(true);
    setTimeout(() => {
      setUserTestimony(userTestimonies[number]);
      setActiveIndex(number);
      setFade(false);
    }, 300); // Adjust time to match the CSS transition duration
  };

  return (
    <div className="md:px-40">
      <h5 className="mb-4 text-3xl text-center font-bold">Testimonials</h5>
      <p className="text-gray-500 font-light text-center mb-14">
        See what our property managers, landlords, and tenants have to say
      </p>
      <div>
        <p
          className={`font-medium md:text-2xl text-xl leading-loose text-gray-900 text-center mb-12 transition-opacity duration-500 ${
            fade ? "opacity-0" : "opacity-100"
          }`}
        >
          “{userTestimony[0]}”
        </p>
        <p className="text-center text-gray-500 mb-14">
          <span className="font-semibold text-gray-900">
            {userTestimony[1]},
          </span>{" "}
          Renter
        </p>
        <div className="flex items-center justify-center gap-8">
          {avatars.map((avatar) => (
            <Image
              key={avatar.id}
              src={avatar.src}
              alt={avatar.alt}
              width={60}
              height={60}
              className={`cursor-pointer rounded-full border-2 transition-all duration-200 ${
                activeIndex === avatar.id
                  ? "border-primary p-1"
                  : "border-transparent"
              }`}
              onClick={() => switchUserTestimony(avatar.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;
