"use client";
import Image from "next/image";
import banner from "public/benefitBanner.svg";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const CallToActionBox = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <div className="w-full border rounded-xl bg-[#F7F7FD] border-[#E0DEF7] overflow-hidden">
      <div
        className="flex flex-col items-start justify-start gap-6 mb-8 pt-8 px-8"
        data-aos="fade"
      >
        <h3 className="text-[#100A55] text-3xl font-bold">
          The new way to find your new home
        </h3>
        <p className="text-[#100A55] opacity-70 text-lg">
          Find your dream place to live in with more than 10k+ properties
          listed.
        </p>
        <button className="bg-[#100A55] rounded-xl font-semibold text-white px-4 py-3 mt-2">
          Browse Properties
        </button>
      </div>
      <div data-aos="slide-up">
        <Image src={banner} width={"100%"} height={262} className="w-full" />
      </div>
    </div>
  );
};

export default CallToActionBox;
