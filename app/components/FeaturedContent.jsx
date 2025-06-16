"use client";
import Image from "next/image";
import FadeIn from "./FadeIn";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  variable: "--font-playfair",
  display: "swap",
});

const FeaturedContent = () => {
  return (
    <div className="relative">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-[#fefdf8] opacity-80 z-0"
        aria-hidden="true"
      ></div>

      {/* Content Section */}
      <div className="relative flex flex-col bg-[#fefdf8] md:flex-row md:gap-10 items-center justify-center min-h-screen p-4 sm:p-6 md:p-12 text-white bg-fixed bg-center bg-cover">
        {/* Left: Image */}
        <div className="w-full md:w-3/5 h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px] flex items-center justify-center relative mb-6 md:mb-0 hover:cursor-pointer  transition-all duration-300">
          <FadeIn>
            <Image
              src="/images/scrollImage5.jpg"
              alt="Case Study"
              width={900}
              height={600}
              objectFit="cover"
              className=" shadow-xl"
            />
          </FadeIn>
        </div>

        {/* Right: Text */}
        <div className="w-full md:w-1/2 bg-opacity-60 mt-10 p-4 sm:p-6 md:p-8  z-10">
          <FadeIn>
            <h1 className="text-2xl sm:text-3xl text-[#111010] md:text-4xl  font-semibold mb-4 sm:mb-6">
              <span className={playfair.className}>featured </span> case study
              ITC
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-gray-900 leading-relaxed">
              The tobacco packaging designed for ITC’s various brands are a
              careful blend of creative visualisation and target demographics.
              We customised each brand and its various elements to the
              particular mood, style or aspiration of its target group. From
              vintage style crests to futuristic digital patterns, our designs
              cover the full spectrum of ITC’s tobacco customers. Innovations in
              packaging have provided further opportunities for us to reimagine
              the experience for them. <br className="hidden sm:block" />
              <br />
              <strong>COLLATERALS </strong> Packaging, Limited Editions, Gifting
            </p>
          </FadeIn>
        </div>
      </div>
    </div>
  );
};

export default FeaturedContent;
