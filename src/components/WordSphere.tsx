"use client";

import React, { useEffect } from "react";
import TagCloud, { TagCloudOptions } from "TagCloud";

type wordSphereProps = {
  wordList: string[];
}

const WordSphere: React.FC<wordSphereProps> = ({ wordList }) => {
  useEffect(() => {
    const container = document.querySelector(".tagcloud") as HTMLElement | null;
    if (!container) return; // Ensure the element exists

    const options: TagCloudOptions = {
      radius: 300,
      maxSpeed: "slow",
      initSpeed: "normal",
      keep: true,
    };

    // Destroy any existing instance to avoid duplication
    container.innerHTML = "";

    // Initialize the TagCloud
    TagCloud([container], wordList, options);
  }, []);

  return <span className="tagcloud" />;
};

export default WordSphere;
