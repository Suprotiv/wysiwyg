"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Lenis from "@studio-freight/lenis";
import { useEffect } from "react";
import { projects } from "../constants/portfolio.json";

export default function ProjectDetails({ category, project_id }) {
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const lenis = new Lenis();
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);
  // ✅ Find project by ID (no need to group by category anymore)
  const project = projects.find((p) => p.project_id === project_id);

  if (!project) {
    return (
      <main className="h-screen flex items-center justify-center text-red-500">
        <p>Project not found</p>
      </main>
    );
  }

  const { question, answer, summaryTitle, summary, meta, image_no } = project;

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

  return (
    <main>
      {/* Background Parallax */}
      <motion.div
        className=""
        style={{
          y: backgroundY,
          backgroundImage: `url(/images/projects/${project_id}/MainBG.jpg)`,
          backgroundSize: "cover",

          backgroundPosition: "center",
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          zIndex: -1,
        }}
      />

      {/* Main Page Hero */}
      <motion.div
        className="mainPage"
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "end",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <ChevronDown
          size={50}
          strokeWidth={0.8}
          className="text-white z-20 m animate-bounce "
        />
        <div
          className="absolute bottom-0 left-0 w-full h-32 pointer-events-none"
          style={{
            background: "linear-gradient(to top, rgba(0,0,0,0.4), transparent)",
          }}
        />
      </motion.div>

      {/* Projects Section */}
      <motion.div
        className="projects"
        style={{
          minHeight: "100vh",
          display: "flex flex-col",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        <div className="max-w-7xl w-full p-8 md:p-20 grid grid-cols-1 md:grid-cols-2 gap-12 text-black">
          {/* Left: Q&A */}
          <div>
            <h3 className="text-xl font-semibold text-yellow-500 mb-2">
              Question
            </h3>
            <h2 className="text-3xl font-bold leading-snug mb-8 whitespace-pre-line">
              {question}
            </h2>

            <h3 className="text-xl font-semibold text-yellow-500 mb-2">
              Answer
            </h3>
            <p className="text-2xl font-semibold leading-snug whitespace-pre-line">
              {answer}
            </p>
          </div>

          {/* Right: Summary */}
          <div className="text-base leading-relaxed text-gray-800">
            <h3 className="text-xl font-bold mb-4">{summaryTitle}</h3>
            {summary?.split("\n\n").map((para, i) => (
              <p className="mb-4" key={i}>
                {para}
              </p>
            ))}

            <div className="mt-6 space-y-1 font-semibold text-sm">
              <p>
                <span className="font-bold">SERVICES</span> {meta?.services}
              </p>
              <p>
                <span className="font-bold">CLIENT</span> {meta?.client}
              </p>
              <p>
                <span className="font-bold">SECTOR</span> {meta?.sector}
              </p>
            </div>
          </div>
        </div>

        {/* Collage */}
        <div className="col-span-1 grid grid-cols-2 md:grid-cols-3 gap-4 p-8 md:p-20">
          {project.images?.map((imgSrc, index) => (
            <img
              key={index}
              src={imgSrc}
              alt={`Project image ${index + 1}`}
              className="w-full h-full object-cover rounded-sm"
            />
          ))}
        </div>
      </motion.div>
    </main>
  );
}
