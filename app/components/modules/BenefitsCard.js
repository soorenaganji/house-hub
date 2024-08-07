"use client";
import Image from "next/image";
import { Typewriter } from "react-simple-typewriter";
const Benefits = ({ image, title, description }) => {
  return (
    <div className="">
      <div className="flex items-center justify-start gap-6 mb-6 ">
        <Image className={""} src={image} width={56} height={56} />
        <h4 className="text-xl font-semibold " data-aos="fade-right">
          {title}
        </h4>
      </div>
      <p className="font-light ml-20 text-[#4D5461]">{description}</p>
    </div>
  );
};

export default Benefits;
