"use client";

import { useEffect, useRef } from "react";
import { FC } from "react";
import { Content, KeyTextField } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import gsap from "gsap";

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero: FC<HeroProps> = ({ slice }) => {
  const component = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.fromTo(
        ".name-animation",
        {
          opacity: 0,
          x: (i) => {
            const angle = -90 + i * 30; // Start from top (-90 degrees)
            const radians = angle * (Math.PI / 180);
            const radius = 1500; // Start off-screen above
            return radius * Math.cos(radians);
          },
          y: (i) => {
            const angle = -90 + i * 30; // Start descending in a spiral
            const radians = angle * (Math.PI / 180);
            const radius = 1500;
            return radius * Math.sin(radians);
          },
          rotation: 720, // Start with extra rotation for a spiral effect
        },
        {
          opacity: 1,
          x: 0,
          y: 0,
          rotation: 0,
          ease: "power4.out",
          duration: 2,
          stagger: {
            each: 0.1,
            from: "start",
          },
        }
      );
    }, component);
    return () => ctx.revert();
  }, []);

  const renderLetters = (name: KeyTextField, key: string) => {
    if (!name) return null;
    const extraClasses =
      key === "first"
        ? "bg-gradient-to-tr from-yellow-600 via-yellow-200 to-yellow-600 bg-clip-text text-transparent"
        : "";
    return name.split("").map((letter, index) => (
      <span
        key={index}
        className={`name-animation name-animation-${key} inline-block opacity-0 ${extraClasses}`}
      >
        {letter}
      </span>
    ));
  };

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      ref={component}
    >
      <div className="grid min-h-[70vh] grid-cols-1 md:grid-cols-2 items-center">
        <div className="col-start-1 md:row-start-1">
          <h1
            className="mb-8 text-[clamp(3rem,20vmin,20rem)] font-extrabold leading-none tracking-tighter"
            aria-label={slice.primary.first_name + " " + slice.primary.last_name}
          >
            <span className="block">
              {renderLetters(slice.primary.first_name, "first")}
            </span>
            <span className="-mt-[-.2em] block text-slate-500">
              {renderLetters(slice.primary.last_name, "last")}
            </span>
          </h1>
          <span
            className="
              block bg-gradient-to-tr 
              from-yellow-500 
              via-yellow-200 
              to-yellow-500 
              bg-clip-text 
              text-2xl 
              font-bold 
              uppercase 
              tracking-[.2em] 
              text-transparent 
              opacity-100 
              md:text-4xl"
          >
            {slice.primary.tag_line}
          </span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
