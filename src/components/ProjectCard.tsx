"use client";

import { useState } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";

type ProjectCardProps = {
  projectList?: Content.ProjectsSliceDefaultPrimaryProjectsItem[];
};

const ProjectCards: React.FC<ProjectCardProps> = ({ projectList = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemCount = projectList.length || 1;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + itemCount) % itemCount);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % itemCount);
  };

  return (
    <div className="relative w-full flex flex-col items-center justify-center bg-transparent">
      {/* Card Container with perspective */}
      <div className="relative w-full max-w-md h-[400px] flex items-center justify-center" style={{ perspective: "1000px" }}>
        {projectList.map((item, index) => {
          // Only the active card is visible
          const isActive = index === currentIndex;
          return (
            <div
              key={index}
              className={`absolute transition-transform duration-700 ${isActive ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}
              style={{
                width: "256px",
                height: "320px",
                transformStyle: "preserve-3d",
                backfaceVisibility: "hidden",
              }}
            >
              <div className="w-full h-full bg-slate-700 text-white rounded-lg shadow-lg flex flex-col items-center p-6">
                {/* Project Image */}
                {item.project_image?.url && (
                  <img
                    src={item.project_image.url}
                    alt={item.project_image.alt ?? "Project Image"}
                    className="w-full h-full object-cover border-4 rounded-lg border-yellow-300"
                  />
                )}

                {/* Project Name */}
                {item.project_name && (
                  <h3 className="text-xl font-bold mt-2">{item.project_name}</h3>
                )}

                {/* Project Description */}
                {item.project_description && (
                  <div className="text-sm text-gray-300 text-center mt-2">
                    <PrismicRichText field={item.project_description} />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Controls BELOW the Card */}
      <div className="flex justify-between gap-4 mt-4">
        <button
          onClick={handlePrev}
          className="bg-slate-800 text-white px-4 py-2 rounded-md shadow-md hover:bg-slate-600 transition"
        >
          Prev
        </button>
        <button
          onClick={handleNext}
          className="bg-slate-800 text-white px-4 py-2 rounded-md shadow-md hover:bg-slate-600 transition"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProjectCards;
