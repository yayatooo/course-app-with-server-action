"use server"

import { courseService } from "@/services/course-service"
import { revalidatePath } from "next/cache";


export async function deleteSectionAction(formData:FormData) {
 const sectionId = formData.get("sectionId") as string  
 
 await courseService.deleteSection(sectionId)
 revalidatePath("/admin/course/[slug]", "page");
}