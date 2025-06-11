import Image from "next/image";

import React from "react";
import { Check } from "lucide-react";
import TextComponent from "@/app/components/TextComponent";
import ProjectPage from "@/app/components/ProjectPage";

export async function generateStaticParams() {
  return [
    {
      project_name: "occasions-&-gifting",
      project_id: "project1",
    },
    {
      project_name: "catalogue",
      project_id: "project2",
    },
    {
      project_name: "advertisements",
      project_id: "project3",
    },
    // Add more combinations if needed
  ];
}

const Page = ({ params }) => {
  const formattedProjectName = params.project_id
    .split("-")
    .map((word) =>
      word === "%26" ? "&" : word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join(" ");

  return (
    <>
      <ProjectPage project_id={formattedProjectName} />
    </>
  );
};

export default Page;
