"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import FadeIn from "./FadeIn";

const projects = [
  {
    label: "Website Development",
    title: "Branding",
    image: "/images/branding.jpg",
    subtitle: "Kothari",
  },

  {
    label: "Print Media",
    title: "Print",
    image: "/images/print.jpg",
    subtitle: "Earth Day",
  },
  {
    label: "Jewellery Commerce",
    title: "Digital",
    image: "/images/digital.jpg",
    subtitle: "The Newtown School Kolkata",
  },
];

export default function Industries() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  return (
    <section
      ref={ref}
      className="w-full min-h-[85vh] bg-[#fefdf8] overflow-x-auto"
    >
      <div className="flex w-full min-h-[85vh]">
        {projects.map((project, index) => {
          return (
            <div
              key={index}
              className="relative min-w-[90%] md:min-w-[33.3333333333334%] h-[85vh] overflow-hidden group"
            >
              <FadeIn
                key={index}
                view={"-300px"}
                duration={0.4 + index * 0.09}
                yvalue={20 + index * 50}
              >
                <div
                  key={index}
                  className="relative min-w-[90%] md:min-w-[25%] h-[85vh] overflow-hidden group hover:cursor-pointer"
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    layout="fill"
                    objectFit="cover"
                    className="transition-all duration-700 group-hover:cursor-pointer  group-hover:scale-105 "
                  />

                  <div className="absolute inset-0 py-6 flex flex-col  w-full text-white">
                    {/* Default background gradient */}

                    {/* Hover background gradient */}

                    <div className="absolute bottom-0 w-full">
                      <div className="px-6 pb-6 pt-10">
                        <p className="font-bold relative text-white  text-2xl leading-tight mt-1  transition-all duration-500 z-30 ">
                          {project.title}
                        </p>
                        <p className="text-md mt-1 relative text-gray-100   transition-all duration-500 z-30">
                          {project.subtitle}
                        </p>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent opacity-80 transition-opacity duration-500  z-0"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
          );
        })}
      </div>
    </section>
  );
}
