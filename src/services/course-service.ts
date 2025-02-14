import { prisma } from "@/utils/prisma";
import { Course, Lesson, Section } from "@prisma/client";
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
              lessons: {
                orderBy: {
                  index: "asc",
                },
              },
            },
            orderBy: {
              index: "asc",
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
      const totalSection = await prisma.section.count({
        where: {
          courseId,
        },
      });
      const createSection = await prisma.section.create({
        data: {
          title: `New Section + ${(totalSection + 1).toString()}`,
          courseId,
          index: totalSection,
        },
      });

      return createSection;
    } catch (error) {
      console.error("Error creating section:", error);
      throw new Error("Failed to create section");
    }
  },

  createLesson: async (sectionId: string) => {
    try {
      const totalLesson = await prisma.lesson.count({
        where: {
          sectionId,
        },
      });
      const addLessonn = await prisma.lesson.create({
        data: {
          sectionId,
          title: `New Lesson + ${(totalLesson + 1).toString()}`,
          slug: slugify(`New Lesson ${totalLesson.toString()}`, {
            lower: true,
          }),
          videoUrl: "-",
          index: totalLesson,
        },
      });

      return addLessonn;
    } catch (error) {
      console.error("Error creating Lesson:", error);
      throw new Error("Failed to create Lesson");
    }
  },

  deleteLesson: async (lessonId: string) => {
    try {
      await prisma.lesson.delete({
        where: {
          id: lessonId,
        },
      });
    } catch (error) {
      console.log(error);
    }
  },

  editLesson: async (lesson: Pick<Lesson, "id" | "title" | "videoUrl">) => {
    try {
      await prisma.lesson.update({
        where: {
          id: lesson.id,
        },
        data: {
          title: lesson.title,
          slug: slugify(lesson.title, {
            lower: true,
          }),
          videoUrl: lesson.videoUrl,
        },
      });
    } catch (error) {
      console.log(error);
    }
  },

  deleteSection: async (sectionId: string) => {
    try {
      await prisma.section.delete({
        where: {
          id: sectionId,
        },
      });
    } catch (error) {
      console.log(error);
    }
  },

  editSection: async (section: Pick<Section, "id" | "title">) => {
    try {
      await prisma.section.update({
        where: {
          id: section.id,
        },
        data: {
          title: section.title,
        },
      });
    } catch (error) {
      console.log(error);
    }
  },
};
