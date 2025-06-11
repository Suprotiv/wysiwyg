"use client";

import Counter from "./Counter";
import FadeIn from "./FadeIn";

const stats = [
  {
    from: 0,
    to: 1600,
    label: "Projects done",
    subLabel:
      "From global campaigns to local identities — and everything in between.",
    suffix: "+",
    format: (val) => `${Math.floor(val)}+`,
  },
  {
    from: 0,
    to: 33,
    label: "Years of experience",
    subLabel: "Designing with intent since 1992.",
    suffix: "+",
  },
  {
    from: 0,
    to: 500,
    label: "Satisfied clients",
    subLabel: "Across industries and continents.",
    suffix: "+",
  },
  {
    from: 0,
    to: 200,
    label: "Leads generated",
    subLabel: "Helping clients grow their reach — one lead at a time.",
    format: (val) => `${val.toLocaleString()}+`,
  },
];

export default function StatisticSection() {
  return (
    <section className="bg-black text-white py-30">
      <FadeIn>
        <div className="w-full mx-auto  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-15  text-center max-w-6xl">
          {stats.map((stat, index) => (
            <div key={index}>
              <div className="text-4xl  mb-2">
                <div className="flex font-medium text-5xl gap-1 justify-center items-center">
                  {stat.prefix || ""}
                  <Counter from={stat.from} to={stat.to} /> +
                </div>
              </div>
              <div className="text-xl mt-5">{stat.label}</div>
              <div className="text-sm text-gray-400 mt-1">{stat.subLabel}</div>
            </div>
          ))}
        </div>
      </FadeIn>
    </section>
  );
}
