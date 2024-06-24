"use client";
import { useState } from "react";
import { Typewriter } from "react-simple-typewriter";
import SearchBox from "./SearchBox";
import NumbersBox from "./NumbersBox";
import number1 from "public/number1.png";
import number2 from "public/number2.png";

const HeroSection = () => {
  const words = ["Buy", "Sell", "Rent"];
  return (
    <>
      <div className="text-center mt-16">
        <h1 className="text-5xl leading-snug font-bold mb-4">
          <span >
            <Typewriter
              words={words}
              loop={0}
              cursor
              cursorStyle="_"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1200}
            />
          </span>
          <span className="mt-2 block">Your Property easily</span>
        </h1>
        <p className="text-lg mt-8">
          A great platform to buy, sell, or even rent your properties without any
          commissions.
        </p>
      </div>
      <SearchBox />
      <div className="flex items-center justify-between mt-16">
        <NumbersBox
          icon={number1}
          title={"50k+ renters"}
          description={"believe in our service"}
        />
        <NumbersBox
          icon={number2}
          title={"10k+ properties"}
          description={"ready for occupancy"}
        />
      </div>
    </>
  );
};

export default HeroSection;
