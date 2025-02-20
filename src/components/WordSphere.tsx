"use client";

// WordSphere.tsx
import React, { useEffect } from "react";
import TagCloud, { TagCloudOptions } from "TagCloud";

const WordSphere: React.FC = () => {
  useEffect(() => {
    const container = document.querySelector(".tagcloud") as HTMLElement | null;
    if (!container) return; // Ensure the element exists

    const texts = [
      "HTML5",
      "CSS3",
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Java",
      "Python",
      "Prismic",
      "Firebase",
      "Git",
      "GitHub",
      "MySQL",
      "Vercel",
      "AWS S3",
      "OpenAI",
      "Clerk",
      "Stripe",
      "Material UI",
      "Bootstrap",
      "BitBucket",
      "OpenRouter",
      "Huggingface",
      "Jupyter Notebook",
      "R",
    ];

    const options: TagCloudOptions = {
      radius: 300,
      maxSpeed: "slow", // Ensure it matches the expected type
      initSpeed: "normal", // Ensure it matches the expected type
      keep: true, // Keeps animation running
    };

    // Destroy any existing instance to avoid duplication
    container.innerHTML = "";

    // Initialize the TagCloud
    TagCloud([container], texts, options);
  }, []);

  return <span className="tagcloud" />;
};

export default WordSphere;
