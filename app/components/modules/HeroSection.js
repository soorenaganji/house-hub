// HeroSection.jsx
"use client";
import { useState } from "react";
import { Typewriter } from "react-simple-typewriter";
import SearchBox from "./SearchBox";
import "@/app/globals.css";
import Image from "next/image";
import banner from "@/public/banner.png";
const HeroSection = () => {
  const words = ["Buy", "Sell", "Rent"];
  return (
    <>
      <div className="text-center flex-col md:flex-row md:flex items-start justify-between overflow-x-hidden w-full min-h-screen ">
        <div className="text-center mt-24 md:text-start md:pl-24 lg:w-[40%] flex-shrink-0">
          <h1 className="text-5xl md:text-6xl leading-snug md:leading-relaxed font-bold mb-4 gradient-text bg-clip-text bg-gradient-to-t from-primary  via-accent to-secondary">
            <span className="">
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
            A great platform to buy, sell, or even rent your properties without
            any commissions.
          </p>
          <SearchBox />
        </div>

        <Image
          src={banner}
          className="md:-mr-24 md:mt-12 hidden md:block md:w-[54%] md:h-screen float-end flex-shrink-0 w-0"
        />
      </div>
    </>
  );
};

export default HeroSection;
