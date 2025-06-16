import Head from "next/head";
import FadeIn from "../components/FadeIn";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  variable: "--font-playfair",
  display: "swap",
});

const team = [
  {
    name: "Nidhi Harlalka",
    image: "images/team/Nidhi-Harlalka.jpg",
    position: "Creative Managing Director",
  },
  {
    name: "Biranchi Samal",
    image: "images/team/Biranchi-Samal.jpg",
    position: "Administrator",
  },
  {
    name: "Dipesh Das",
    image: "images/team/Dipesh-Das.jpg",
    position: "Pre-Production",
  },
  {
    name: "Nimisha Bowry Dhawan",
    image: "images/team/Nimisha-Bowry-Dhawan.jpg",
    position: "Graphic Designer",
  },
  {
    name: "Priyanka Mitra",
    image: "images/team/Priyanka-Mitra.jpg",
    position: "Accountant",
  },
  {
    name: "Navneet Kanoi",
    image: "images/team/Navneet-Kanoi.jpg",
    position: "Web Designer",
  },
  {
    name: "Sandip Mondal",
    image: "images/team/Sandip-Mondal.jpg",
    position: "Pre-Production",
  },
  {
    name: "Shalini Worah",
    image: "images/team/Shalini-Worah.jpg",
    position: "Graphic Designer",
  },
  {
    name: "Stephen Shedrick",
    image: "images/team/Stephen-Shedrick.jpg",
    position: "Illustrator",
  },
  {
    name: "Subhrajit Dhal",
    image: "images/team/Subhrajit-Dhal.jpg",
    position: "Administrator",
  },
];

export default function AboutPage() {
  return (
    <main className=" text-gray-800 px-6 py-16 pt-30 bg-[#fefdf8] animate-fadeIn">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
          Meet our team of <span className={playfair.className}>creators</span>,{" "}
          <span className={playfair.className}>designers</span>, and world-class{" "}
          <span className={playfair.className}>problem solvers</span>
        </h1>
        <p className="mt-6 text-lg text-gray-600">
          To be the company our customers want us to be, it takes an{" "}
          <span className={playfair.className}>eclectic group</span> of
          passionate operators. Get to know the people{" "}
          <span className="italic">leading the way</span> at Wysiwyg .
        </p>
      </div>

      {/* Optional swirl SVG */}
      <div className="flex justify-end mt-10 pr-10">
        <svg
          width="100"
          height="100"
          viewBox="0 0 100 100"
          className="text-gray-200"
        >
          <path
            d="M50,50 m0,-45 a45,45 0 1,1 -45,45"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
        </svg>
      </div>

      {/* Team Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10  max-w-5xl mx-auto ">
        {team.map((member, i) => (
          <FadeIn key={i}>
            <div className="relative ">
              <div className="absolute inset-0  m-auto w-60 h-60   z-0" />
              <img
                src={member.image}
                alt={member.name}
                className="relative z-10   w-60 h-60 object-cover border-4 border-white shadow-xl"
              />
              <h1 className="mt-6 text-xl font-bold">{member.name}</h1>
              <p className={playfair.className}>{member.position}</p>
            </div>
          </FadeIn>
        ))}
      </div>
    </main>
  );
}
