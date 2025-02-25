"use client";

//import { useState } from "react";
import { Content } from "@prismicio/client";

type ModalProps = {
    /*name: KeyTextField;
    startDate: DateField;
    endDate?: DateField;
    expandedDescription: RichTextField;
    techStack?: RichTextField;
    link?: LinkField;*/
    project: Content.ProjectsSliceDefaultPrimaryProjectsItem;
};

const ProjectCards: React.FC<ModalProps> = ({ project }) => {
    console.log(project)

    return (
        <div className="relative w-full h-screen flex flex-col items-center justify-center bg-gray-900">
            
        </div>
    );
};

export default ProjectCards;
