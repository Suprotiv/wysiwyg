"use client";
import React, { useRef, useState, useEffect } from "react";
import Lenis from "@studio-freight/lenis";
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
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis();
    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // 🚨 Clean up on component unmount
    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);
  return (
    <div className="bg-neutral-900">
      <HorizontalScrollCarousel />
    </div>
  );
};

const HorizontalScrollCarousel = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: targetRef });
  const x = useTransform(scrollYProgress, [0, 1], ["28%", "-28.5%"]); //1% , 60.5%

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
    <section ref={targetRef} className="relative h-[250vh]">
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
      className="group relative h-[330px] md:h-[400px] 2xl:h-[600px] w-[350px] md:w-[450px] 2xl:w-[650px] overflow-hidden shadow-xl bg-neutral-200 cursor-pointer rounded-xs"
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
  {
    url: "/images/award5.jpg",
    title: "The Packaging Professional",
    description:
      "The Packaging Professional is a British monthly publication and the magazine of the Packaging Society. Wysiwyg’s Executive Director is quoted in it on Pages 11 and 12 in an article by Eoin Redahan about the nuances of the Indian packaging industry. She expounds on the role of technology and unique design in creating effective packaging.",
    id: 5,
  },
  {
    url: "/images/award8.jpg",
    title: "ITC Sonar",
    description:
      "This beautiful welcome kit was created for members of the ITC Sonar Spa. It was awarded the Srijan Samman Prize for Folders/Brochures. Immersed in a mellow golden hue, it includes booklets, a brochure and more, designed using gold accents with the frangipani flower as a central thematic element.",
    id: 3,
  },
  {
    url: "/images/award4.jpg",
    title: "Festive",
    description:
      "Festive is an annual British catalogue of the best promotional mailing by creative agencies around the world. New year greeting mailers from Wysiwyg are featured on page 112 and show off the imagination and creative exuberance of a team of dedicated and fun-loving professionals.",
    id: 4,
  },

  {
    url: "/images/award7.jpg",
    title: "Kyoorius",
    description:
      "Kyoorius is a design magazine that publishes an annual compilation of the best design work in India. Wysiwyg is featured on Page 161 of Volume 1 and showcases work for three of its clients: ITC Gold Flake, IFB Home Appliances and Mahadevi Birla World Academy.",
    id: 7,
  },
];
