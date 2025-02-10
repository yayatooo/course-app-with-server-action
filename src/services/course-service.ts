import { prisma } from "@/utils/prisma";
import { Course } from "@prisma/client";
import slugify from "slugify";

export const courseService = {
  createCourse: async (
    courseData: Pick<Course, "title" | "description" | "price" | "coverImage">
  ) => {
    try {
      const slug = slugify(courseData.title, { lower: true });
      const newCourse = await prisma.course.create({
        data: {
          title: courseData.title,
          slug,
          description: courseData.description,
          price: courseData.price,
          coverImage: courseData.coverImage,
        },
      });

      return newCourse;
    } catch (error) {
      console.log(error);
    }
  },

  getAllCourse: async () => {
    try {
      const getAllCourse = await prisma.course.findMany({
        orderBy: {
          title: "asc",
        },
      });

      return getAllCourse;
    } catch (error) {
      console.log(error);
    }
  },
};
