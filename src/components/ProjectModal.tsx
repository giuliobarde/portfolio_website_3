import React from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";

type ProjectModalProps = {
  project: Content.ProjectsSliceDefaultPrimaryProjectsItem;
  onClose: () => void;
};

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-slate-700 p-6 rounded-lg shadow-lg max-w-md w-full relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-black bg-slate-200 p-2 rounded-full hover:bg-gray-300"
        >
          ✕
        </button>

        {/* Project Image */}
        {project.project_image?.url && (
          <img
            src={project.project_image.url}
            alt={project.project_image.alt ?? "Project Image"}
            className="w-full h-48 object-cover rounded-lg"
          />
        )}

        {/* Project Name */}
        {project.project_name && (
          <h2 className="text-xl font-bold mt-2">{project.project_name}</h2>
        )}

        {/* Project Description */}
        {project.project_description && (
          <div className="text-slate-100 mt-2">
            <PrismicRichText field={project.project_expanded_description} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectModal;
