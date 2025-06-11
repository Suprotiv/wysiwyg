import Portfolio from "@/app/components/Portfolio";
import TextComponent from "@/app/components/TextComponent";
import React from "react";

// Slugs with lowercase, spaces -> -, & preserved
export async function generateStaticParams() {
  return [
    { project_name: "all" },
    { project_name: "art-&-culture" },
    { project_name: "b2b" },
    { project_name: "consumer-durables" },
    { project_name: "csr" },
    { project_name: "education" },
    { project_name: "finance" },
    { project_name: "fmcg" },
    { project_name: "lifestyle" },
    { project_name: "lounges-&-restaurants" },
    { project_name: "luxury" },
    { project_name: "medical" },
    { project_name: "occasions-&-gifting" },
    { project_name: "publications" },
    { project_name: "real-estate" },
    { project_name: "retail" },
    { project_name: "web-&-app" },
    { project_name: "case-study-itc" },
    { project_name: "case-study-ifb" },
  ];
}

const Page = ({ params }) => {
  const formattedProjectName = params.project_name
    .split("-")
    .map((word) =>
      word === "%26" ? "&" : word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join(" ");

  return (
    <div className="mt-35 overflow-hidden">
      <div className=" gap-20 flex flex-col  items-center justify-center">
        <TextComponent project={formattedProjectName} />
        <Portfolio />
      </div>
    </div>
  );
};

export default Page;
