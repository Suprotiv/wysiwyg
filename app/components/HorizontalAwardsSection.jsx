"use client";
import React, { useRef, useState } from "react";
import {
  motion,
  useTransform,
  useScroll,
  AnimatePresence,
} from "framer-motion";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  variable: "--font-playfair",
  display: "swap",
});

const HorizontalAwardSection = () => {
  return (
    <div className="bg-neutral-900">
      <HorizontalScrollCarousel />
    </div>
  );
};

const HorizontalScrollCarousel = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: targetRef });
  const x = useTransform(scrollYProgress, [0, 1], ["32%", "-30.5%"]); //1% , 60.5%

  return (
    // <section ref={targetRef} className="relative h-[300vh]">
    //   <div className="sticky top-0 flex h-[100vh] items-center overflow-hidden">
    //     <div className="flex  p-[10vh] items-center  text-[#fefdf8] font-semibold text-6xl justify-center">
    //       <p className={playfair.className}>accolades</p>
    //     </div>

    //     <motion.div style={{ x }} className="flex gap-4 px-10">
    //       {cards.map((card) => (
    //         <Card card={card} key={card.id} />
    //       ))}
    //     </motion.div>
    //   </div>
    // </section>
    <section ref={targetRef} className="relative h-[300vh]">
      <div className="sticky top-0 flex flex-col h-[100vh] items-center overflow-hidden">
        <div className="flex  p-[10vh] items-center  text-[#fefdf8] font-semibold text-6xl justify-center">
          <p className={playfair.className}>accolades</p>
        </div>

        <motion.div style={{ x }} className="flex gap-4 px-10">
          {cards.map((card) => (
            <Card card={card} key={card.id} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// Animation variants
const overlayVariants = {
  initial: { opacity: 0 },
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

const Card = ({ card }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="group relative h-[450px] w-[450px] md:w-[550px] overflow-hidden shadow-xl bg-neutral-200 cursor-pointer rounded-xs"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        style={{
          backgroundImage: `url(${card.url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="absolute inset-0 z-0 transition-transform duration-300 group-hover:scale-110"
      />

      <AnimatePresence mode="wait">
        {hovered && (
          <motion.div
            key={`overlay-${card.id}`}
            variants={overlayVariants}
            initial="initial"
            animate="animate"
            exit="initial"
            className="absolute inset-0 bg-black/70 z-10 flex items-center p-6"
          >
            <div className="flex flex-col items-center justify-center w-full">
              <motion.h3
                variants={textVariants}
                className="text-white text-3xl font-semibold text-center"
              >
                {card.title}
              </motion.h3>
              <motion.p
                variants={textVariants}
                className="text-gray-300 mt-5 text-lg font-medium text-center"
              >
                {card.description}
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HorizontalAwardSection;

const cards = [
  {
    url: "/images/award1.jpg",
    title: "British Council",
    description:
      "Every year the British Council organises the Rivers of the World project, a cultural link between the historic cities of London and Kolkata and the rivers that run through them. Colourful artworks created by the students of Calcutta International School were displayed at the London 2012 Olympics. These were compiled into collages by Wysiwyg, which has been a proud partner in the Rivers of the World project since its very inception.",
    id: 1,
  },
  {
    url: "/images/award2.jpg",
    title: "Ambuja Utalika",
    description:
      "We’re over the moon because the Ambuja Utalika has won yet another award. This time it comes from a unanimous jury decision at the eLets India Brand Summit, held at New Delhi last week, for the best launch campaign for ‘Utalika—Let this world be yours’.Proud to be part of a team that consistently pushes the boundaries of creativity.",
    id: 2,
  },

  {
    url: "/images/award6.jpg",
    title: "Rotary Club",
    description:
      "his award was presented to Wysiwyg by the Rotary Club for  producing the best newsletter for the year 2012–2013. Wysiwyg’sexacting standards of copy, design and artwork were applied to create a finished product, month-after-month, that reflects the esteem and prestige of the Rotary Club of Calcutta.",
    id: 6,
  },
  { url: "/images/award5.jpg", title: "Title 5", id: 5 },
  { url: "/images/award8.jpg", title: "ITC Sonar", id: 3 },
  { url: "/images/award4.jpg", title: "Title 4", id: 4 },

  { url: "/images/award7.jpg", title: "Rotary Club", id: 7 },
];
