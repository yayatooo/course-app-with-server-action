import { Card } from "@/components/ui/card";
import { courseService } from "@/services/course-service";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function Page() {
  const courses = await courseService.getAllCourse();

  return (
    <div className="container mx-auto p-6">
      {/* Header Section */}
      <section className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Courses</h1>
        <Link
          href="/admin/courses/new"
          className="bg-[#92e3a9] text-gray-800 rounded-md px-4 py-2 hover:bg-[#7dcc95] transition-colors duration-200"
        >
          New Course
        </Link>
      </section>

      {/* Empty State or Courses Grid */}
      {!courses || courses.length === 0 ? (
        <div className="flex justify-center items-center py-32">
          <h1 className="text-4xl font-semibold text-gray-600 text-center">
            There is no course yet
          </h1>
        </div>
      ) : (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Card
              key={course.id}
              className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-200"
            >
              {/* Course Cover Image */}
              <div className="relative h-48">
                <Image
                  src={`${process.env.R2_PUBLIC_URL}/learning-project/courses/${course.id}/${course.coverImage}`}
                  alt={course.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Course Details */}
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {course.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {course.description}
                </p>
                <div className="flex gap-3">
                  <Link
                    href={`/admin/courses/${course.slug}`}
                    className="inline-block bg-greenPrimary text-gray-800 rounded-md px-3 py-1 text-sm hover:bg-greenHover transition-colors duration-200"
                  >
                    Edit Content
                  </Link>
                  <Link
                    href={`/admin/courses/${course.id}`}
                    className="inline-block bg-[#28367c] text-white rounded-md px-3 py-1 text-sm hover:bg-[#3b4ba0] transition-colors duration-200"
                  >
                    Stats
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </section>
      )}
    </div>
  );
}
