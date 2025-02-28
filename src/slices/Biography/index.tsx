import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";
import Button from "@/components/Button";
import Avatar from "./Avatar";

/**
 * Props for `Biography`.
 */
export type BiographyProps = SliceComponentProps<Content.BiographySlice>;

/**
 * Component for "Biography" Slices.
 */
const Biography: FC<BiographyProps> = ({ slice }) => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="grid gap-x-8 gap-y-6 md:grid-cols-2 items-center">
        {/* Left Column - Avatar */}
        <div className="flex justify-center">
          <Avatar 
            image={slice.primary.avatar} 
            className="max-w-sm"
          />
        </div>

        {/* Right Column - Heading, Text, Button */}
        <div className="flex flex-col space-y-6">
          <Heading as="h1" size="xl">
            {slice.primary.heading}
          </Heading>
          <div className="prose prose-xl prose-slate prose-invert">
            <PrismicRichText field={slice.primary.description}/>
          </div>
          <Button 
            linkField={slice.primary.button_link} 
            label={slice.primary.button_text}
          />
        </div>
        <div className="h-[20vh]"></div>
      </div>
    </Bounded>
  );
};

export default Biography;