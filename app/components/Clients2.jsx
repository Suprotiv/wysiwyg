"use client";

import React, { useEffect, useState } from "react";
import { motion, animate, useMotionValue } from "framer-motion";
import useMeasure from "react-use-measure";
import Card from "./Cards";

const Clients = ({ direction = "left" }) => {
  const FAST_DURATION = 20;
  const SLOW_DURATION = 60;

  const clients = [
    { name: "Apple", image: "/images/client5.jpg" },
    { name: "Google", image: "/images/client6.jpg" },
    { name: "Microsoft", image: "/images/client7.jpg" },
    { name: "Netflix", image: "/images/client8.jpg" },
    { name: "Amazon", image: "/images/client9.jpg" },
    { name: "Apple", image: "/images/client10.jpg" },
    { name: "Google", image: "/images/client2.gif" },
    { name: "Microsoft", image: "/images/client3.png" },
    { name: "Netflix", image: "/images/client8.jpg" },
    { name: "Amazon", image: "/images/client9.jpg" },
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
    <div className="relative  h-[15vh] mt-2 overflow-x-hidden flex justify-center items-center ">
      <motion.div
        className="absolute left-0 flex gap-10"
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
    </div>
  );
};

export default Clients;
