import React from "react";

import Image from "next/image";
import { Button } from "../ui/button";
import { CarouselSlider } from "./course-slider";

export const Banner = () => {
  return (
    <section className="bg-greenPrimary h-[84vh] rounded-t-xl mt-12 p-12">
      <h1 className="text-6xl font-semibold">
        Learn Anytime, Anywhere - Online Courses for Your Future!
      </h1>
      <section className="mt-8 flex justify-evenly gap-8">
        <div className="w-5/12 flex flex-col justify-center gap-y-4">
        <CarouselSlider />
        </div>
        <div className="flex">
          <Image
            src={`${process.env.R2_PUBLIC_URL}/learning-project/group-1.png`}
            width={255}
            height={300}
            alt="banner"
            className=""
          />
          <Image
            src={`${process.env.R2_PUBLIC_URL}/learning-project/group-2.png`}
            width={315}
            height={250}
            alt="banner"
          />
        </div>
      </section>
    </section>
  );
};
