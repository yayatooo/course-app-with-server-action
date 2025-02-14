"use server";

import { courseService } from "@/services/course-service";
import { revalidatePath } from "next/cache";

export async function editSectionAction(formData: FormData) {
  const id = formData.get("id") as string;
  const title = formData.get("title") as string;

  await courseService.editSection({ id, title });
  revalidatePath("/admin/course/[slug]", "page");
}
