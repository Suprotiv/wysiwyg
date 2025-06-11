"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Check } from "lucide-react";
import TextComponent from "@/app/components/TextComponent";
import FadeIn from "./FadeIn";

const ProjectPage = ({ project_id, project_name }) => {
  const categories = [
    {
      name: "All Partners",
      image: "/images/project1.jpg",
      points: [
        "Collaborated with multiple global brands.",
        "Delivered over 50+ campaigns.",
        "Enhanced cross-sector engagement.",
      ],
    },
    {
      name: "Wellness",
      image: "/images/project2.jpg",
      points: [
        "Running campaigns for RTT, attracting 19,000+ professionals.",
        "Promoting holistic health solutions.",
        "Scaling wellness apps and live sessions.",
      ],
    },
    {
      name: "Real estate",
      image: "/images/project3.jpg",
      points: [
        "Boosted visibility for luxury properties.",
        "Managed multi-channel real estate campaigns.",
        "Generated quality leads through high-converting funnels.",
      ],
    },
    {
      name: "Fin-tech",
      image: "/images/project4.jpg",
      points: [
        "Led targeted ads for fintech platforms.",
        "Increased app installs by 70%.",
        "Managed user retention strategies.",
      ],
    },
    {
      name: "Ed-tech",
      image: "/images/project3.jpg",
      points: [
        "Drove enrollment for global online courses.",
        "Optimized content for student engagement.",
        "Grew YouTube learning platforms to 100k+ subs.",
      ],
    },
    {
      name: "Coaching",
      image: "/images/project2.jpg",
      points: [
        "Built personal brand funnels for coaches.",
        "Achieved 6x ROI through webinars.",
        "Automated client acquisition journeys.",
      ],
    },
    {
      name: "Personal development",
      image: "/images/project1.jpg",
      points: [
        "Amplified growth brands using emotional storytelling.",
        "Helped creators launch personal growth platforms.",
        "Scaled newsletter audiences to 50k+.",
      ],
    },
  ];

  const formattedProjectName = project_id
    .split("-")
    .map((word) =>
      word === "%26" ? "&" : word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join(" ");

  const [activeCategory, setActiveCategory] = useState(
    categories.find((c) => c.name.toLowerCase() === project_name) ||
      categories[0]
  );

  return (
    <div className="px-6 lg:px-20 py-10 w-full text-white bg-black min-h-screen">
      {/* Header */}
      <div className="text-center mb-16">
        <TextComponent project={formattedProjectName} color="white" />
      </div>

      <div className="flex flex-col  lg:flex-row gap-30">
        {/* Sidebar */}
        <div className="w-full lg:w-1/5 space-y-4">
          {categories.map((cat, i) => {
            const isActive = cat.name === activeCategory.name;
            return (
              <div
                key={i}
                onClick={() => setActiveCategory(cat)}
                className="group relative inline-flex items-center justify-between w-full py-2 cursor-pointer transition-all"
              >
                <span
                  className={`text-sm transition-colors duration-300 ${
                    isActive
                      ? "text-purple-400"
                      : "text-white group-hover:text-white"
                  }`}
                >
                  {cat.name}
                </span>
                <span
                  className={`text-xs transition-colors duration-300 ${
                    isActive
                      ? "text-purple-400"
                      : "text-white group-hover:text-white"
                  }`}
                >
                  →
                </span>

                {/* Underline Animation */}
                <span
                  className={`absolute left-0 top-9 h-[1.6px] z-20 w-0 bg-gray-300 transition-all duration-300 ease-in-out group-hover:w-full mr-2`}
                />
                <span
                  className={`absolute left-0 top-9 h-[1.6px] z-10  bg-[#3d3d3f] transition-all duration-300 ease-in-out w-full mr-2`}
                />
              </div>
            );
          })}
        </div>

        {/* Main Content */}
        <FadeIn key={activeCategory.name}>
          <div className="w-full flex flex-col lg:flex-row gap-10">
            {/* Left: Image */}
            <div className="w-full lg:w-3/4">
              <Image
                src={activeCategory.image}
                alt={activeCategory.name}
                width={600}
                height={800}
                className="rounded-xl object-cover"
              />
            </div>

            {/* Right: Text */}
            <div className="w-full lg:w-1/2 space-y-6">
              <h2 className="text-3xl font-semibold">{activeCategory.name}</h2>
              <p className="text-gray-300">World-renowned expert and leader</p>

              <ul className="space-y-4 mt-6">
                {activeCategory.points.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Check className="text-purple-400 w-5 h-5 mt-1" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
};

export default ProjectPage;
