"use client";

import React, { useRef, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import portfolioData from "../constants/portfolio.json";

const { projects } = portfolioData;
import {
  useScroll,
  useTransform,
  motion,
  AnimatePresence,
} from "framer-motion";
import FadeIn from "./FadeIn";
import ProjectCard from "./ProjectCard";

const Portfolio = ({ category }) => {
  const router = useRouter();
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);

  const handleOpenModal = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  const bgColor = useTransform(
    scrollYProgress,
    [0, 0.7],
    ["#fefdf8", "#fefdf8"]
  );

  const overlayVariants = {
    initial: { opacity: 0, y: 40 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const textVariants = {
    initial: { opacity: 0, y: 10 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  };

  // 🟢 Flatten all projects from staticData

  // 🟢 Filter projects by category
  const filteredProjects =
    category === "all"
      ? projects
      : projects.filter((proj) => proj.category?.includes(category));

  return (
    <div
      ref={container}
      className="relative w-full min-h-screen scrollbar-hide "
    >
      <motion.div
        style={{ backgroundColor: bgColor }}
        className="fixed top-0 left-0 w-full h-full -z-10 transition-colors  duration-700"
      />

      <div className="container mx-auto py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
          {filteredProjects.map((item, index) => (
            <FadeIn
              key={index}
              view="-100px"
              duration={0.4 + (index % 3) * 0.1}
              yvalue={20 + (index % 3) * 12}
            >
              <motion.div
                className="relative group overflow-hidden cursor-pointer "
                onMouseEnter={() => setHovered(index)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => router.push(`/projects/${item.project_id}`)}
              >
                <img
                  src={`/images/projects/${item.project_id}/MainBG.jpg`}
                  alt={item.title}
                  className="w-full h-[260px] object-cover transition-transform rounded-sm duration-300 group-hover:scale-105"
                />

                <AnimatePresence mode="wait">
                  {hovered === index && (
                    <motion.div
                      key={`overlay-${index}`}
                      variants={overlayVariants}
                      initial="initial"
                      animate="animate"
                      exit="initial"
                      className="absolute inset-0 bg-black/60 rounded-sm flex flex-col justify-end p-4 pointer-events-none"
                    >
                      <motion.h3
                        key={`title-${index}`}
                        variants={textVariants}
                        className="text-lg font-semibold text-white"
                      >
                        {item.title}
                      </motion.h3>
                      <motion.p
                        key={`desc-${index}`}
                        variants={textVariants}
                        className="text-sm text-gray-200 mt-1"
                      >
                        {item.projectDescription}
                      </motion.p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>

      {/* Optional modal logic still present, if used elsewhere */}
      <AnimatePresence>
        {isModalOpen && selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-50"
          >
            <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4">
              <ProjectCard project={selectedItem} onClose={handleCloseModal} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Portfolio;
