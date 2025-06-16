import Clients from "./components/Clients";

import FadeIn from "./components/FadeIn";
import FeaturedContent from "./components/FeaturedContent";
import Footer from "./components/Footer";
import Industries from "./components/Industries";
import InfoSection from "./components/InfoSection";
import Main from "./components/Main";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects";
import ParallaxProjects from "./components/ProjectsNew";
import ScrollScaleImage from "./components/ScrollScaleImage";
import { Playfair_Display } from "next/font/google";
import StatisticSection from "./components/StatisticSection";
import HorizontalAwardSection from "./components/HorizontalAwardsSection";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  variable: "--font-playfair",
  display: "swap",
});

export default function Home() {
  return (
    <div className="relative gap-16 font-[var(--font-plus-jakarta)]">
      <Main />
      <Clients />
      <ScrollScaleImage />
      <StatisticSection />
      <div className="bg-black flex text-4xl flex-col justify-center items-center text-[#fefdf8] pb-25">
        <FadeIn>
          <h1 className={playfair.className}>our</h1>
        </FadeIn>
        <FadeIn>
          <h1 className="text-6xl font-semibold">expertise</h1>
        </FadeIn>
      </div>

      <Industries />

      <Projects />

      <FeaturedContent />

      <HorizontalAwardSection />
      <Footer />
    </div>
  );
}
