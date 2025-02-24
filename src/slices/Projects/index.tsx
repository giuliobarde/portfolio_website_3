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
      {/* Full-Screen Centered Layout */}
      <div className="flex flex-col items-center justify-center h-screen w-full">
        {/* Title & Description */}
        <div className="w-full max-w-4xl text-center space-y-6 mb-8">
          <Heading as="h2" size="lg">{slice.primary.heading}</Heading>
          <div className="prose prose-xl prose-slate prose-invert mx-auto">
            <PrismicRichText field={slice.primary.decsription} />
          </div>
        </div>

        {/* Full-Screen Centered Carousel */}
        <div className="w-full h-[600px] flex justify-center">
          <ProjectCards projectList={projectList} />
        </div>
      </div>
    </Bounded>
  );
};

export default Projects;
