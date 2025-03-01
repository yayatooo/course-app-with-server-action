import { Navbar } from "@/components/layout/navbar";
import { courseService } from "@/services/course-service";
import { notFound } from "next/navigation";
import React from "react";
import { CourseDetails } from "./comp.course-detail";

interface Props {
  params: Promise<{ slug: string }>;
}


export default async function page({ params }: Props) {

  const { slug } = await params;

  const course = await courseService.getCourseDetail(slug);
  if (!course) {
    notFound();
  }


  return (
    <section>
      <Navbar />
      <div className="container mx-auto">
        <CourseDetails course={course}/>
      </div>
    </section>
  );
}
