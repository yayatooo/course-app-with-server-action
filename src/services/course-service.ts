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

  getCourseDetail: async (slugOrId: string) => {
    try {
      const getDetailCourse = await prisma.course.findFirst({
        where: {
          OR: [
            {
              slug: slugOrId,
            },
            {
              id: slugOrId,
            },
          ],
        },
        include: {
          sections: {
            include: {
              lessons: true,
            },
          },
        },
      });

      return getDetailCourse;
    } catch (error) {
      console.log(error);
    }
  },

  addSection: async (courseId: string) => {

    try {
      const createSection = await prisma.section.create({
        data: {
          title: "New Section",
          courseId
        },
      });

      return createSection
      
    } catch (error) {
      console.error("Error creating section:", error);
      throw new Error("Failed to create section");
    }
  },
};
