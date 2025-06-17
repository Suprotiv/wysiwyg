"use client";

import React, { useEffect, useState } from "react";
import { motion, animate, useMotionValue } from "framer-motion";
import useMeasure from "react-use-measure";
import Card from "./Cards";

const Clients = ({ direction = "left" }) => {
  const FAST_DURATION = 37;
  const SLOW_DURATION = 75;

  const clients = [
    { name: "Apple", image: "/images/client1.png" },
    { name: "Google", image: "/images/client2.png" },
    { name: "Microsoft", image: "/images/client3.png" },
    { name: "Netflix", image: "/images/client4.png" },
    { name: "Amazon", image: "/images/client5.png" },
    { name: "Apple", image: "/images/client6.png" },
    { name: "Google", image: "/images/client7.png" },
    { name: "Microsoft", image: "/images/client8.png" },
    { name: "Netflix", image: "/images/client9.png" },
    { name: "Amazon", image: "/images/client10.png" },
  ];

  const [duration, setDuration] = useState(FAST_DURATION);
  const [mustFinish, setMustFinish] = useState(false);
  const [rerender, setRerender] = useState(false);
  const [ref, { width }] = useMeasure();
  const xTranslation = useMotionValue(0);

  useEffect(() => {
    let controls;
    const finalPosition =
      direction === "left" ? -width / 2 - 19 : width / 2 + 19;

    if (mustFinish) {
      controls = animate(xTranslation, [xTranslation.get(), finalPosition], {
        ease: "linear",
        duration:
          duration *
          (1 - Math.abs(xTranslation.get()) / Math.abs(finalPosition)),
        onComplete: () => {
          setMustFinish(false);
          setRerender(!rerender);
        },
      });
    } else {
      controls = animate(xTranslation, [0, finalPosition], {
        ease: "linear",
        duration: duration,
        repeat: Infinity,
        repeatType: "loop",
        repeatDelay: 0,
      });
    }

    return () => controls?.stop?.();
  }, [rerender, xTranslation, duration, width, direction]);

  return (
    <div className="bg-black ">
      {/* Top Line */}
      <div className="animate-fadeInSlow">
        <div className="w-full h-px bg-gray-500 opacity-40" />

        {/* Content Section */}
        <div className="py-8 px-4 md:px-20 md:flex justify-between items-center gap-10">
          {/* Left Text */}
          <div className="text-white max-w-md flex-shrink-0 z-20 mb-12 md:mb-2">
            <h2 className="text-md md:text-lg text-gray-200 font-medium mb-2">
              At Wysiwyg, we design with heart, mind, and a bit of madness.
              Because when you’re creating something unforgettable, playing it
              safe isn’t part of the script.
            </h2>
            <p className="text-gray-200 text-sm md:text-base">
              As already successfully implemented by 250+ partners:
            </p>
          </div>

          {/* Scrolling Clients */}
          <div className="relative h-[12vh] overflow-x-hidden flex-1 w-full max-w-full">
            <motion.div
              className="absolute left-0 flex gap-8 md:gap-10 items-center"
              style={{ x: xTranslation }}
              ref={ref}
              onHoverStart={() => {
                setMustFinish(true);
                setDuration(SLOW_DURATION);
              }}
              onHoverEnd={() => {
                setMustFinish(true);
                setDuration(FAST_DURATION);
              }}
            >
              {[...clients, ...clients].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                >
                  <Card image={item.image} name={item.name} />
                </motion.div>
              ))}
            </motion.div>

            {/* Fade Overlay */}
            <div className="absolute inset-0 z-10 w-full pointer-events-none bg-[linear-gradient(to_right,_black_0%,_rgba(0,0,0,0.65)_40%,_rgba(0,0,0,0)_60%,_rgba(0,0,0,0.65)_80%,_black_100%)]" />
          </div>
        </div>

        {/* Bottom Line */}
        <div className="w-full h-px bg-gray-500 opacity-40" />
      </div>
    </div>
  );
};

export default Clients;
