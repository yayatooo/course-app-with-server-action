// import { redirect } from "next/navigation";

import { Banner } from "@/components/layout/banner";
import { CarouselSlider } from "@/components/layout/course-slider";
import { Navbar } from "@/components/layout/navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { courseService } from "@/services/course-service";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const courses = await courseService.getAllCourse();

  return (
    <>
      <main className="max-w-7xl mx-auto">
        <Navbar />
       <Banner />
       {/* <CarouselSlider /> */}
      </main>
    </>
  );
}
