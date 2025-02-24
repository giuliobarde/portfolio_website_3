"use client";

import { useState } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";

type ProjectCardProps = {
  projectList?: Content.ProjectsSliceDefaultPrimaryProjectsItem[]; // Optional to prevent errors
};

const ProjectCards: React.FC<ProjectCardProps> = ({ projectList = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemCount = projectList.length || 1; // prevent division by zero
  const angle = 360 / itemCount;
  const radius = 250; // Adjust the radius as needed

  // Calculate the overall rotation based on the current index
  const rotateY = currentIndex * -angle;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + itemCount) % itemCount);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % itemCount);
  };

  return (
    <div className="relative w-full h-96 flex items-center justify-center">
      {/* Navigation Controls with higher z-index */}
      <div className="absolute inset-0 flex items-center justify-between px-4 z-20">
        <button
          onClick={handlePrev}
          className="bg-gray-800 text-white p-2 rounded-full focus:outline-none"
        >
          Prev
        </button>
        <button
          onClick={handleNext}
          className="bg-gray-800 text-white p-2 rounded-full focus:outline-none"
        >
          Next
        </button>
      </div>

      {/* Carousel Container with Perspective */}
      <div
        className="w-full h-full relative"
        style={{
          perspective: "1000px",
        }}
      >
        {/* Carousel Inner: rotates based on current index */}
        <div
          className="absolute w-full h-full transition-transform duration-1000"
          style={{
            transformStyle: "preserve-3d",
            transform: `translateZ(-${radius}px) rotateY(${rotateY}deg)`,
            pointerEvents: "none", // disable pointer events here so they don't block buttons
          }}
        >
          {projectList.map((item, index) => {
            // Each card is rotated around the Y-axis and translated forward
            const itemAngle = index * angle;
            return (
              <div
                key={index}
                className="absolute w-64 h-80 bg-gray-700 text-white border-slate-900 rounded-lg shadow-lg overflow-hidden flex flex-col items-center p-6"
                style={{
                  transform: `rotateY(${itemAngle}deg) translateZ(${radius}px)`,
                  pointerEvents: "auto", // re-enable pointer events on each card if needed
                }}
              >
                {/* Show Image Only If Available */}
                {item.project_image?.url && (
                  <img
                    src={item.project_image.url}
                    alt={item.project_image.alt ?? "Project Image"}
                    className="w-32 h-32 object-cover rounded-full border-4 border-yellow-300"
                  />
                )}

                {/* Show Name If Available */}
                {item.project_name && (
                  <h3 className="text-xl font-bold mt-4">
                    {item.project_name}
                  </h3>
                )}

                {/* Show Description If Available */}
                {item.project_description && (
                  <div className="text-sm text-gray-300 text-center mt-2">
                    <PrismicRichText field={item.project_description} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProjectCards;
