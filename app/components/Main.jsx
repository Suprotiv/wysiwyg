"use client";
import React from "react";
import Botton from "./Botton";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  variable: "--font-playfair",
  display: "swap",
});

function Main() {
  return (
    <section className="w-full  min-h-[80vh] flex flex-col lg:flex-row gap-5  md:gap-50  justify-center items-center bg-gradient-to-br from-[#111010] via-[#0f0e0e] to-[#000000] px-6 md:px-12 lg:px-30 md:pt-24 lg:pt-0 text-white ">
      {/* Left section: Headline */}
      <div className="mt-10 animate-fadeInSlow">
        <h1 className="text-6xl xl:text-[82px] 2xl:text-[120px] font-medium  md:leading-tight text-white">
          We don’t just <br />
          <span className="font-medium">design</span>, we <br />
          <span className={` text-white`}>
            disrupt <span className={`${playfair.className}`}> norms</span>
          </span>
        </h1>
      </div>

      {/* Right section: Manifesto Summary & CTA */}
      <div className="mt-10 max-w-md space-y-4  text-left animate-fadeInSlow">
        <p className="text-gray-300 text-sm 2xl:text-lg md:text-base leading-relaxed">
          Symmetry is optional. Vibe is everything. We design with precision—but
          we leave room for the unexpected. Because perfect is boring.
        </p>
        <p className="uppercase text-xs text-gray-400 tracking-wider">
          Real design. Real impact. No filters.
        </p>
        <Botton value={"SEE MORE ABOUT US"} size={"xl"} />
      </div>
    </section>
  );
}

export default Main;
