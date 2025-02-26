import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";
import ProjectCards from "@/components/ProjectCard";

/**
 * Props for `Projects`.
 */
export type ProjectsProps = SliceComponentProps<Content.ProjectsSlice>;

/**
 * Component for "Projects" Slices.
 */
const Projects: FC<ProjectsProps> = ({ slice }) => {
  const projectList = slice.primary.projects;

  return (
    <Bounded>
      {/* Remove full-screen height constraint */}
      <div className="flex flex-col items-center justify-center w-full">
        {/* Title & Description */}
        <div className="w-full max-w-4xl text-center space-y-4 mb-4"> {/* Reduced mb-8 to mb-4 */}
          <Heading as="h2" size="lg">{slice.primary.heading}</Heading>
          <div className="prose prose-xl prose-slate prose-invert mx-auto">
            <PrismicRichText field={slice.primary.decsription} />
          </div>
        </div>

        {/* Adjust card container */}
        <div className="w-full flex justify-center">
          <ProjectCards projectList={projectList} />
        </div>
      </div>
    </Bounded>
  );
};

export default Projects;
