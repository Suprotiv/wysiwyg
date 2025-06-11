"use client";

import React, { useRef, useEffect, useState } from "react";
import {
  useScroll,
  useTransform,
  motion,
  AnimatePresence,
} from "framer-motion";
import FadeIn from "./FadeIn";
import Lenis from "@studio-freight/lenis";
import ProjectCard from "./ProjectCard";

const Portfolio = () => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hovered, setHovered] = useState(null);
  const lenisRef = useRef(null);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
      lenisRef.current?.stop();
    } else {
      document.body.style.overflow = "";
      lenisRef.current?.start();
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

  const portfolioItems = [
    {
      id: 1,
      title: "Anjika",
      category:
        "Anjika is a dance troupe founded by famed Manipuri dancer Priti Patel",
      image: "/images/project1.jpg",
      description:
        "Anjika is a dance troupe founded by famed Manipuri dancer Priti Patel. The brand identity and collaterals reflect the elegance and versatility of her art form. COLLATERALS Logo, Invitations, Gifting, Stationery, Calendars",
    },
    {
      id: 2,
      title: "Amaison Designs",
      category:
        "We designed the identity for a luxe interior design firm, Amaison Designs",
      image: "/images/project2.jpg",
      description:
        "We designed the identity for a luxe interior design firm, Amaison Designs. Our design solution combined boldness and luxury throwing the brand into the limelight. COLLATERALS Logo, Stationery, Lookbooks, Press Ads, Website, Digital Invites, Emailers, Carry Bags",
    },
    {
      id: 3,
      title: "Avama Jewellers",
      category:
        "Avama the jewellery brand needed communication that started from the name upwards.",
      image: "/images/project3.jpg",
      description: "",
    },
  ];

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

  return (
    <div
      ref={container}
      className="relative w-full min-h-screen scrollbar-hide"
    >
      <motion.div
        style={{ backgroundColor: bgColor }}
        className="fixed top-0 left-0 w-full h-full -z-10 transition-colors duration-700"
      />

      <div className="container mx-auto py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioItems.map((item, index) => (
            <FadeIn
              key={index}
              duration={0.4 + (index % 3) * 0.1}
              yvalue={20 + (index % 3) * 12}
            >
              <motion.div
                className="relative group overflow-hidden cursor-pointer"
                onMouseEnter={() => setHovered(index)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => handleOpenModal(item)}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-[260px] object-cover transition-transform duration-300 group-hover:scale-105"
                />

                <AnimatePresence mode="wait">
                  {hovered === index && (
                    <motion.div
                      key={`overlay-${index}`}
                      variants={overlayVariants}
                      initial="initial"
                      animate="animate"
                      exit="initial"
                      className="absolute inset-0 bg-black/60 flex flex-col justify-end p-4 pointer-events-none"
                    >
                      <motion.h3
                        key={`title-${index}`}
                        variants={textVariants}
                        className="text-lg font-semibold text-white"
                      >
                        {item.title}
                      </motion.h3>
                      <motion.p
                        key={`subtitle-${index}`}
                        variants={textVariants}
                        className="text-sm text-gray-200 mt-1"
                      >
                        {item.category}
                      </motion.p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>

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
