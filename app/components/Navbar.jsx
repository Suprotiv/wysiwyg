"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaSearch } from "react-icons/fa";
import Botton from "./Botton";

const Navbar = () => {
  const pathname = usePathname();

  const isProjectsRoute = pathname.startsWith("/projects");

  const [navbarClass, setNavbarClass] = useState({
    backgroundColor: isProjectsRoute ? "bg-transparent" : "bg-transparent",
    padding: "py-3",
    textColor: isProjectsRoute ? "text-black" : "text-[#f6f5ec]",
    lineBackground: isProjectsRoute ? "bg-black" : "bg-[#f6f5ec]",
  });

  const [menuOpen, setMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const menuRef = useRef(null);
  const searchRef = useRef(null);

  useEffect(() => {
    const updateNavbarOnScroll = () => {
      if (menuOpen || window.scrollY >= 80) {
        setNavbarClass({
          backgroundColor: "bg-[#111010]",
          padding: "py-1 md:py-0",
          textColor: "text-[#fefdf8]",
          lineBackground: "bg-[#fefdf8]",
          logoSrc: "/images/logo.png", // dark background → light logo
        });
      } else {
        setNavbarClass({
          backgroundColor: "bg-transparent",
          padding: "py-3",
          textColor: isProjectsRoute ? "text-black" : "text-[#fefdf8]",
          lineBackground: isProjectsRoute ? "bg-black" : "bg-[#fefdf8]",
          logoSrc: isProjectsRoute ? "/images/logo2.png" : "/images/logo.png",
        });
      }
    };

    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        searchRef.current &&
        !searchRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
        setShowSearch(false);
        setDropdownOpen(false);
      }
    };

    window.addEventListener("scroll", updateNavbarOnScroll);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", updateNavbarOnScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen, isProjectsRoute]);

  useEffect(() => {
    if (menuOpen) {
      setNavbarClass({
        backgroundColor: "bg-[#111010]",
        padding: "py-1 md:py-0",
        textColor: "text-[#fefdf8]",
        lineBackground: "bg-[#fefdf8]",
        logoSrc: "/images/logo.png", // dark background → light logo
      });
    } else if (window.scrollY < 80) {
      setNavbarClass({
        backgroundColor: "bg-transparent",
        padding: "py-3",
        textColor: isProjectsRoute ? "text-black" : "text-[#fefdf8]",
        lineBackground: isProjectsRoute ? "bg-black" : "bg-[#fefdf8]",
        logoSrc: isProjectsRoute ? "/images/logo2.png" : "/images/logo.png",
      });
    }
  }, [menuOpen, isProjectsRoute]);

  const navItems = [
    {
      label: "Projects",
      subItems: [
        "All",
        "Art & Culture",
        "B2B",
        "Consumer Durables",
        "CSR",
        "Education",
        "Finance",
        "FMCG",
        "Lifestyle",
        "Lounges & Restaurants",
        "Luxury",
        "Medical",
        "Occasions & Gifting",
        "Publications",
        "Real Estate",
        "Retail",
        "Web & App",
        "Case Study ITC",
        "Case Study IFB",
      ],
    },
    { label: "Case studies" },
    { label: "About" },
    { label: "Accolades" },
    { label: "Contact" },
    { label: "Jobs" },
  ];

  return (
    <nav
      className={`${navbarClass.backgroundColor} fixed w-full z-40 top-0 left-0 animate-fadeInTopToBottom transition-all duration-300 ${navbarClass.padding}`}
    >
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto relative">
        <Link
          href="/"
          onClick={() => setMenuOpen(false)}
          className="flex items-center  gap-4"
        >
          <img
            src={navbarClass.logoSrc}
            alt="Logo"
            className="h-13 w-13 object-contain top-0"
          />
          <Botton value={"Wysiwyg"} size={"md"} color={navbarClass.textColor} />
        </Link>

        {/* Mobile Toggle */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setMenuOpen((prev) => !prev);
            setDropdownOpen(false);
          }}
          className={`inline-flex items-center z-50 p-2 text-sm ${navbarClass.textColor} rounded-lg md:hidden focus:outline-none`}
        >
          <div className="relative w-6 h-6">
            <svg
              className={`absolute top-0 left-0 w-6 h-6 transition-all ${
                menuOpen ? "opacity-100" : "opacity-0 -rotate-45"
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            <svg
              className={`absolute top-0 left-0 w-6 h-6 transition-all ${
                menuOpen ? "opacity-0" : "opacity-100"
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </div>
        </button>

        {/* Menu */}
        <div
          ref={menuRef}
          className={`${
            menuOpen ? "fixed top-0 z-30 animate-slideDown" : "hidden"
          } w-full md:flex md:w-auto md:order-1 transition-all duration-100`}
        >
          <ul
            className={`flex flex-col p-4 pt-[7vh] md:pt-4 rounded-b-xl relative z-30 ${navbarClass.backgroundColor} md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:bg-transparent`}
          >
            {navItems.map((item) =>
              item.label === "Projects" ? (
                <li
                  key="projects"
                  className={`group relative text-lg md:text-sm font-medium cursor-pointer text-center ${navbarClass.textColor}`}
                >
                  <div
                    className="relative z-10"
                    onClick={(e) => {
                      e.preventDefault();
                      setDropdownOpen(!dropdownOpen);
                    }}
                  >
                    Projects
                  </div>
                  <span
                    className={`absolute left-0 top-5 bottom-0 w-0 h-[1.4px] ${navbarClass.lineBackground} transition-all duration-300 ease-in-out group-hover:w-full`}
                    aria-hidden="true"
                  ></span>

                  <ul
                    className={`absolute mt-2 w-[500px] grid grid-cols-4 gap-2 z-50 rounded-md animate-fadeInMedium shadow-lg bg-[#111010] p-4 ${
                      dropdownOpen ? "grid" : "hidden"
                    }`}
                  >
                    {item.subItems.map((sub) => (
                      <li key={sub}>
                        <Link
                          href={`/projects/${sub
                            .toLowerCase()
                            .replace(/\s+/g, "-")}`}
                          className="block px-2 py-1 text-sm text-[#f6f5ec] hover:bg-[#222] rounded"
                          onClick={() => {
                            setMenuOpen(false);
                            setDropdownOpen(false);
                          }}
                        >
                          {sub}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ) : (
                <li
                  key={item.label.toLowerCase()}
                  className={`group relative text-lg md:text-sm font-medium cursor-pointer text-center ${navbarClass.textColor}`}
                >
                  <Link
                    href={`/${item.label.toLowerCase()}`}
                    onClick={() => setMenuOpen(false)}
                    className="relative z-10"
                  >
                    {item.label}
                  </Link>
                  <span
                    className={`absolute left-0 top-5 bottom-0 w-0 h-[1.4px] ${navbarClass.lineBackground} transition-all duration-300 ease-in-out group-hover:w-full`}
                    aria-hidden="true"
                  ></span>
                </li>
              )
            )}

            {/* Desktop Search */}
            <div
              className="hidden md:flex items-center gap-2 ml-auto relative"
              ref={searchRef}
            >
              <button
                onClick={() => setShowSearch((prev) => !prev)}
                className={`${navbarClass.textColor} rounded cursor-pointer`}
              >
                <FaSearch />
              </button>
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`absolute right-0 top-full mt-2 w-64 px-4 py-2 rounded-md bg-[#fefdf8] text-[#111010] placeholder-[#111010] border border-[#272727] focus:outline-none focus:ring focus:ring-[#444] transition-all duration-300 transform ${
                  showSearch
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-95 pointer-events-none"
                }`}
              />
            </div>

            {/* Mobile Search */}
            <li className="md:hidden mt-3">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 rounded-md bg-[#111010] text-[#f6f5ec] placeholder-[#888] border border-[#272727] focus:outline-none focus:ring focus:ring-[#444] transition-all"
              />
            </li>
          </ul>
        </div>
      </div>

      {/* Background blur */}
      {(menuOpen || dropdownOpen) && (
        <div className="fixed inset-0 backdrop-blur-md z-0 animate-fadeInMedium transition-opacity duration-300"></div>
      )}
    </nav>
  );
};

export default Navbar;
