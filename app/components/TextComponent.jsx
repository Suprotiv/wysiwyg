"use client";
import { motion, useInView, useAnimation, Variant } from "framer-motion";
import { useEffect, useRef } from "react";

function TextComponent({ project, color = "111010" }) {
  return (
    <main className="">
      <div className={`mx-auto max-w-6xl pt-14 px-5  text-[#${color}]`}>
        <AnimatedText
          el="h2"
          text={[project]}
          className="text-[55px]"
          repeatDelay={1000000}
        />
      </div>
    </main>
  );
}

const defaultAnimations = {
  hidden: {
    opacity: 0,
    y: 8,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export const AnimatedText = ({
  text,
  el: Wrapper = "p",
  className,
  once,
  repeatDelay,
  animation = defaultAnimations,
}) => {
  const controls = useAnimation();
  const textArray = Array.isArray(text) ? text : [text];
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.5, once });

  useEffect(() => {
    let timeout;
    const show = () => {
      controls.start("visible");
      if (repeatDelay) {
        timeout = setTimeout(async () => {
          await controls.start("hidden");
          controls.start("visible");
        }, repeatDelay);
      }
    };

    if (isInView) {
      show();
    } else {
      controls.start("hidden");
    }

    return () => clearTimeout(timeout);
  }, [isInView]);

  return (
    <Wrapper className={className}>
      <span className="sr-only">{textArray.join(" ")}</span>
      <motion.span
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={{
          visible: { transition: { staggerChildren: 0.04 } },
          hidden: {},
        }}
        aria-hidden
      >
        {textArray?.map((line, lineIndex) => (
          <span className="block" key={`${line}-${lineIndex}`}>
            {line?.split(" ").map((word, wordIndex, wordsArray) => (
              <span
                className={`inline-block ${
                  (wordsArray.length === 2 && wordIndex === 1) ||
                  (wordsArray.length === 3 && wordIndex === 2)
                    ? "italic font-extralight"
                    : ""
                }`}
                key={`${word}-${wordIndex}`}
              >
                {word?.split("").map((char, charIndex) => (
                  <motion.span
                    key={`${char}-${charIndex}`}
                    className="inline-block"
                    variants={animation}
                  >
                    {char}
                  </motion.span>
                ))}
                <span className="inline-block">&nbsp;</span>
              </span>
            ))}
          </span>
        ))}
      </motion.span>
    </Wrapper>
  );
};

export default TextComponent;
