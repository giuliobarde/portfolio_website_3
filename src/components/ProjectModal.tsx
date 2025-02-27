import React, { useEffect } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";
import { PrismicNextLink } from "@prismicio/next";

type ProjectModalProps = {
    project: Content.ProjectsSliceDefaultPrimaryProjectsItem;
    onClose: () => void;
};

    const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
    // Prevent scrolling when the modal is open
    useEffect(() => {
        document.body.classList.add("overflow-hidden");
        return () => {
        document.body.classList.remove("overflow-hidden");
        };
    }, []);

    // Close modal when clicking outside
    const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if ((e.target as HTMLElement).id === "modal-overlay") {
            onClose();
        }
    }

    return (
        <div 
            id="modal-overlay"
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
            onClick={handleOutsideClick}
        >
            <div className="bg-slate-700 p-8 rounded-lg shadow-lg max-w-xl  w-full relative">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 bg-gray-200 text-gray-800 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-300 shadow-md transition"
                    aria-label="Close"
                >
                    ✕
                </button>
                <div className="flex flex-col md:flex-row gap-6">
                    {/* Left Column: Text */}
                    <div className="flex-1">
                        {/* Project Name */}
                        {project.project_name && (
                        <h2 className="text-2xl font-bold">{project.project_name}</h2>
                        )}

                        {/* Project Description */}
                        {project.project_expanded_description && (
                            <div className="text-slate-100 mt-4">
                                <PrismicRichText field={project.project_expanded_description} />
                            </div>
                        )}

                        {/* Links */}
                        {Array.isArray(project.project_link) && project.project_link.map((link, index) => (
                            <div key={index}>
                                <br />
                                <PrismicNextLink
                                    key={link.key}
                                    field={link} 
                                    className="text-blue-400 hover:underline"
                                />
                            </div>
                        ))}
                    </div>

                    <div className="hidden md:block w-[1px] bg-slate-100"></div>
                    
                    <div className="columns">
                        {/* Project Image */}
                        {project.project_image?.url && (
                            <div className="flex justify-center">
                            <img
                                src={project.project_image.url}
                                alt={project.project_image.alt ?? "Project Image"}
                                className="w-full h-full object-cover rounded-lg md:w-48"
                            />
                            </div>
                        )}
                        {/* Tech Stack */}
                        {project.tech_stack && (
                            <div className="text-slate-100 mt-4">
                                <PrismicRichText field={project.tech_stack} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectModal;