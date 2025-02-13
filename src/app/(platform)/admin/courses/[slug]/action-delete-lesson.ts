"use server"

import { courseService } from "@/services/course-service"
import { revalidatePath } from "next/cache";

export async function actionDeleteLesson(formData:FormData) {
    const lessonId = formData.get("lessonId") as string

    await courseService.deleteLesson(lessonId)
     revalidatePath("admin/courses/[slug]", "page");
}