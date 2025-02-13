"use server";

import { courseService } from "@/services/course-service";
import { revalidatePath } from "next/cache";

export async function addLessonAction(formData: FormData) {
    const sectionId = formData.get("sectionId") as string;
  
    // Add a check to ensure sectionId is not null or undefined
    if (!sectionId) {
      throw new Error("sectionId is required");
    }
  
    await courseService.createLesson(sectionId);
  
    revalidatePath("/admin/course/[slug]", "page");
  }