"use server";

import { courseService } from "@/services/course-service";
import { uploadFile } from "@/utils/aws";
import { redirect } from "next/navigation";
import z from "zod";

const courseSchema = z.object({
  title: z.string().min(1, "Title cannot Empty"),
  description: z.string().min(3, "at least 3 charachter"),
  price: z.number(),
  coverImage: z.custom<File>((val) => val instanceof File, {
    message: "Cover image is required and must be a file.",
  }),
});

export async function createCourse(prevState: unknown, formData: FormData) {
  const title = formData.get("title");
  const description = formData.get("description");
  const price = Number(formData.get("price"));
  const coverImage = formData.get("coverImage");

  // Debugging: Log the values

  console.log({ title, description, price, coverImage });

  // validation with zod
  const validation = courseSchema.safeParse({
    title,
    description,
    price,
    coverImage,
  });

  if (!validation.success) {
    console.log(validation.error.flatten().fieldErrors);
    return {
      status: "error",
      errors: validation.error.flatten().fieldErrors,
      data: {
        title,
        description,
        price,
        coverImage,
      },
    };
  }

  // import the data into DB

  const newCourse = await courseService.createCourse({
    title: validation.data.title,
    description: validation.data.description,
    price: validation.data.price,
    coverImage: validation.data.coverImage.name,
  });

  if (!newCourse) {
    return {
      status: "error",
      message: "Error Creating Course",
    };
  }

  // this function for upload image file into cloudflare R2

  await uploadFile({
    key: newCourse.coverImage,
    body: validation.data.coverImage,
    folder: `courses/${newCourse.id}`,
  });

  redirect(`/admin/courses/${newCourse.id}`);
}
