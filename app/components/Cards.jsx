import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion"; // Update path as per your project structure

const Card = ({ image, name }) => {
  const [showOverlay, setShowOverlay] = useState(false);

  return (
    <motion.div
      className="relative  overflow-hidden h-[100px] min-w-[140px] md:h-[90px] md:min-w-[90px] rounded-sm  flex justify-center items-center group   hover:cursor-pointer transition-all duration-500"
      key={image}
      onHoverStart={() => setShowOverlay(true)}
      onHoverEnd={() => setShowOverlay(false)}
    >
      {/* Hover overlay */}
      {/* <AnimatePresence>
        {showOverlay && (
          <motion.div
            className="absolute left-0 top-0 bottom-0 right-0 z-10 flex justify-center items-center rounded-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute bg-black pointer-events-none rounded-sm opacity-50 h-full w-full" />
            <motion.h1
              className="bg-white font-semibold text-sm z-10 px-3  rounded-full flex items-center gap-[0.5ch] hover:opacity-75"
              initial={{ y: 10 }}
              animate={{ y: 0 }}
              exit={{ y: 10 }}
            >
              <span className="text-center">{name}</span>
            </motion.h1>
          </motion.div>
        )}
      </AnimatePresence> */}
      <div
        className="h-full w-full blur-load"
        style={{
          backgroundImage: `url(blur.jpg)`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          height: "100%",
          width: "100%",
        }}
      >
        <div className="h-[80%] w-[90%] relative  inner-div rounded-2xl">
          <img
            src={image}
            alt={image}
            className="absolute h-full w-full object-fit filter opacity-80 group-hover:opacity-100 transition duration-500"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default Card;
