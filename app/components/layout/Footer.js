// components/Footer.jsx
"use client";
import Image from "next/image";
import Link from "next/link";
import logo from "public/Frame.png";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";

const footerSections = [
  {
    title: "SELL A HOME",
    links: ["Request an offer", "Pricing", "Reviews", "Stories"],
  },
  {
    title: "BUY A HOME",
    links: ["Buy", "Finance"],
  },
  {
    title: "BUY, RENT AND SELL",
    links: ["Buy & sell properties", "Rent home", "Builder trade-up"],
  },
  {
    title: "TERMS & PRIVACY",
    links: ["Trust & Safety", "Terms of Service", "Privacy Policy"],
  },
  {
    title: "ABOUT",
    links: ["Company", "How it works", "Contact", "Investors"],
  },
  {
    title: "RESOURCES",
    links: ["Blog", "Guides", "FAQ", "Help Center"],
  },
];

const socialMediaLinks = [
  { icon: <FaFacebookF />, ariaLabel: "Facebook" },
  { icon: <FaInstagram />, ariaLabel: "Instagram" },
  { icon: <FaTwitter />, ariaLabel: "Twitter" },
  { icon: <FaLinkedinIn />, ariaLabel: "LinkedIn" },
];

const Footer = () => {
  return (
    <footer className="bg-white py-10 border-t mt-16 ">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between my-8">
          <div className="w-full md:w-auto">
            <div className="flex items-center gap-3">
              <Image
                src={logo}
                width={32}
                height={32}
                alt="HouseHub Logo"
                className="h-8"
              />
              <span className="text-xl font-semibold">HouseHub</span>
            </div>
          </div>
          <div className="flex flex-wrap w-full mt-6 gap-6 md:mt-0 md:w-auto">
            {footerSections.map((section) => (
              <div
                key={section.title}
                className="w-1/2 md:w-auto mb-6 md:mb-0 md:mr-8"
              >
                <h5 className="font-bold text-gray-900 mb-2">
                  {section.title}
                </h5>
                <ul className="text-[#000929]  ">
                  {section.links.map((link) => (
                    <li
                      key={link}
                      className="md:mb-3 mb-1 text-sm hover:text-primary transition-all duration-150"
                    >
                      <Link href={"/"}>{link}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-center mt-6 border-t pt-6">
          <p className="text-gray-500 text-sm">
            &copy;2024 HouseHub. All rights reserved
          </p>
          <div className="flex gap-8 mt-4">
            {socialMediaLinks.map(({ icon, ariaLabel }) => (
              <a
                key={ariaLabel}
                href="#"
                aria-label={ariaLabel}
                className="text-gray-500 hover:text-gray-900 text-xl"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
