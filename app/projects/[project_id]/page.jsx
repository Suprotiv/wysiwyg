import { projects } from "../../constants/portfolio.json";
import React from "react";
import ProjectDetails from "../../components/ProjectDetails";
export async function generateStaticParams() {
  return projects.map((project) => ({
    project_id: project.project_id,
  }));
}

const ProjectPage = ({ params }) => {
  const project = params.project_id;

  if (!project) return <p></p>;

  return (
    <div className=" overflow-hidden">
      <ProjectDetails project_id={project} />
    </div>
  );
};

export default ProjectPage;
