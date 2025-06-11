"use client";
import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <div className="relative h-auto z-[-10]">
      <div className="mt-[-100vh] h-[185vh] md:h-[145vh] sticky bottom-0 bg-[#111010]">
        {/* Background image */}
        <Image
          src="/asBG.jpg"
          alt="Background Image"
          fill
          className="object-cover rounded-2xl"
        />

        {/* Overlay */}
        <div className="absolute bottom-0 w-full text-white  bg-opacity-60">
          <div className="container mx-auto px-5 py-5">
            {/* Top section: Links + Newsletter */}
            <div className="flex flex-col md:flex-row justify-between gap-10">
              {/* Link groups */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-10 md:gap-45 text-sm font-medium">
                <div className="space-y-2 ">
                  <p>ABOUT US</p>
                  <p>ACCOLADES</p>
                  <p>ALL PROJECTS</p>
                  <p>ART & CULTURE</p>
                  <p>B2B</p>
                  <p>CASE STUDIES</p>
                </div>
                <div className="space-y-2">
                  <p>CONSUMER DURABLES</p>
                  <p>CSR</p>
                  <p>EDUCATION</p>
                  <p>FINANCE</p>
                  <p>FMCG</p>
                  <p>LIFESTYLE</p>
                </div>
                <div className="space-y-2 ">
                  <p>LUXURY</p>
                  <p>PUBLICATIONS</p>
                  <p>REAL ESTATE</p>
                  <p>RETAIL</p>
                  <p>WEB & APP</p>
                </div>
              </div>

              {/* Newsletter section */}
              <div className="max-w-sm mt-8 md:mt-0">
                <h3 className="text-lg font-semibold">
                  Get our monthly newsletter
                </h3>
                <p className="text-sm mb-4">Sign up!</p>
                <input
                  type="email"
                  placeholder="Enter email address"
                  className="w-full border border-gray-300 px-4 py-2 rounded text-black mb-4"
                />
                <div className="flex items-center gap-2">
                  <button className="bg-white text-black font-bold px-6 py-2">
                    SUBMIT
                  </button>
                  <div className="w-9 h-9 bg-black text-white flex items-center justify-center rounded-full text-lg">
                    ▶
                  </div>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-700 my-10"></div>

            {/* Bottom section: logo + links + icons */}

            {/* Footer note */}
            <div className="text-center mt-10 text-xs md:text-sm text-gray-400">
              &copy; {new Date().getFullYear()} Wysiwyg. All Rights Reserved.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
