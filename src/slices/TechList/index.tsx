import React from "react";
import { Content } from "@prismicio/client";
import WordSphere from "@/components/WordSphere";
import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";
import { PrismicRichText } from "@prismicio/react";

export type TechListSliceProps = Content.TechListSlice;

const TechList: React.FC<{ slice: TechListSliceProps }> = ({ slice }) => {
  const wordList = slice.primary.tech_skill
  .map((item) => item.skill)
  .filter((skill): skill is string => typeof skill === "string")
  return (
    <Bounded>
      <div className="grid gap-x-8 gap-y-6 md:grid-cols-2 items-center">
        {/* Left Column - Heading, Text */}
        <div className="flex flex-col space-y-6">
          <Heading as="h2" size="lg">
            {slice.primary.heading}
          </Heading>
          <div className="prose prose-xl prose-slate prose-invert">
            <PrismicRichText field={slice.primary.tech_description}/>
          </div>
        </div>

        {/* Right Column - Sphere */}
        <div style={{ marginTop: "2rem" }}>
        <WordSphere wordList={wordList}/>
      </div>
      </div>
    </Bounded>
  );
};

export default TechList;
