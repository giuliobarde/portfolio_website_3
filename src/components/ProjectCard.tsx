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
    <div className="relative w-full h-screen flex flex-col items-center justify-center bg-gray-900">
      {/* Navigation Controls */}
      <div className="absolute top-1/2 transform -translate-y-1/2 w-full flex justify-between px-8 z-30">
        <button
          onClick={handlePrev}
          className="bg-gray-800 text-white px-4 py-2 rounded-full focus:outline-none"
        >
          Prev
        </button>
        <button
          onClick={handleNext}
          className="bg-gray-800 text-white px-4 py-2 rounded-full focus:outline-none"
        >
          Next
        </button>
      </div>

      {/* Card Container with perspective */}
      <div className="relative w-full h-[600px] flex items-center justify-center" style={{ perspective: "1000px" }}>
        {projectList.map((item, index) => {
          // Only the active card is rotated into view
          const isActive = index === currentIndex;
          return (
            <div
              key={index}
              className="absolute transition-transform duration-1000"
              style={{
                width: "256px",
                height: "320px",
                // When active, the card is facing forward (0deg). When inactive, it spins (e.g., to 90deg)
                transform: isActive ? "rotateY(0deg)" : "rotateY(90deg)",
                transformStyle: "preserve-3d",
                backfaceVisibility: "hidden",
              }}
            >
              <div className="w-full h-full bg-gray-700 text-white rounded-lg shadow-lg flex flex-col items-center p-6">
                {/* Project Image */}
                {item.project_image?.url && (
                  <img
                    src={item.project_image.url}
                    alt={item.project_image.alt ?? "Project Image"}
                    className="w-32 h-32 object-cover rounded-full border-4 border-yellow-300"
                  />
                )}

                {/* Project Name */}
                {item.project_name && (
                  <h3 className="text-xl font-bold mt-4">{item.project_name}</h3>
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
    </div>
  );
};

export default ProjectCards;
