"use server";

import { courseService } from "@/services/course-service";
import { revalidatePath } from "next/cache";

export async function editLessonAction(formData: FormData) {
  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const videoUrl = formData.get("videoUrl") as string;

  await courseService.editLesson({ id, title, videoUrl });

  revalidatePath("/admin/course/[slug]", "page");
}
