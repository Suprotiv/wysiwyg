"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState, useRef } from "react";
import Fuse from "fuse.js";
import { projects, categories } from "../constants/portfolio.json"; // replace with actual import path
import Image from "next/image";
import Link from "next/link";
import FadeIn from "./FadeIn";
import { useScroll } from "framer-motion";
import Lenis from "@studio-freight/lenis";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [projectResults, setProjectResults] = useState([]);
  const [categoryResults, setCategoryResults] = useState([]);

  const { scrollYProgress } = useScroll();
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

  const combinedData = useMemo(() => {
    const taggedProjects = projects.map((p) => ({ ...p, type: "project" }));
    const taggedCategories = categories.map((c) => ({
      ...c,
      type: "category",
    }));
    return [...taggedProjects, ...taggedCategories];
  }, []);

  const fuse = useMemo(() => {
    return new Fuse(combinedData, {
      keys: ["title", "projectDescription", "tags", "name", "category"],
      threshold: 0.3,
      includeScore: true,
    });
  }, [combinedData]);

  useEffect(() => {
    if (query.trim() === "") {
      setProjectResults([]);
      setCategoryResults([]);
    } else {
      const searchResults = fuse.search(query).map((res) => res.item);
      setProjectResults(
        searchResults.filter((item) => item.type === "project")
      );
      setCategoryResults(
        searchResults.filter((item) => item.type === "category")
      );
    }
  }, [query, fuse]);

  return (
    <div className="bg-[#111010]">
      <div className="min-h-screen  p-6 md:p-12 pt-15 md:pt-25 text-[#fefdf8] animate-fadeIn">
        <h1 className="text-2xl md:text-3xl font-semibold mb-6">
          Search results for: <span className="text-blue-500">{query}</span>
        </h1>

        {projectResults.length > 0 && (
          <>
            <h2 className="text-xl md:text-2xl font-bold mb-4">Projects</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {projectResults.map((project, index) => (
                <Link
                  key={index}
                  href={`/projects/${project.project_id}`}
                  className="bg-[#1c1c1c] rounded-lg overflow-hidden shadow-md border border-gray-800 hover:shadow-lg transition "
                >
                  <div className="w-full h-48 relative">
                    <Image
                      src={`/images/projects/${project.project_id}/MainBG.jpg`}
                      alt={project.title}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">
                      {project.title}
                    </h3>
                    <p className="text-gray-300 text-sm">
                      {project.projectDescription}
                    </p>
                    {/* {project.tags && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {project.tags.map((tag, i) => (
                          <span
                            key={i}
                            className="text-xs px-2 py-1 bg-gray-700 text-gray-100 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )} */}
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}

        {categoryResults.length > 0 && (
          <>
            <h2 className="text-xl md:text-2xl font-bold mt-10 mb-4">
              Categories
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {categoryResults.map((category, index) => (
                <Link
                  key={index}
                  href={`/categories/${category.slug}`}
                  className="block bg-[#1c1c1c] rounded-lg p-5 border border-gray-800 hover:shadow-md transition"
                >
                  <h3 className="text-lg font-semibold mb-2 capitalize">
                    📁 {category.name}
                  </h3>
                  <p className="text-gray-300 text-sm">
                    {category.tags?.join(", ")}
                  </p>
                </Link>
              ))}
            </div>
          </>
        )}

        {projectResults.length === 0 && categoryResults.length === 0 && (
          <p className="text-gray-500 text-center mt-20">No results found.</p>
        )}
      </div>
    </div>
  );
}
