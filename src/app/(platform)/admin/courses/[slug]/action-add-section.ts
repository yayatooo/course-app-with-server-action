"use server";

import { courseService } from "@/services/course-service";
import { revalidatePath } from "next/cache";

export async function addSectionAction(formData: FormData) {
  const courseId = formData.get("courseId") as string;

  //service here
  try {
    await courseService.addSection(courseId);
  } catch (error) {
    console.log(error);
  }

  revalidatePath("admin/courses/[slug]", "page");
}
