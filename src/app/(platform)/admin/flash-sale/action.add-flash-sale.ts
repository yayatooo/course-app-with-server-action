"use server";

import { flashSaleService } from "@/services/flash-sale-service";
import { revalidatePath } from "next/cache";
import z from "zod"

const flashSaleSchema = z.object({
  amount: z.number({ invalid_type_error: "Discount must be a number" }).min(1, "Discount must be at least 1"),
  courseId: z.string().min(1, "Course ID is required"),
})


export async function addFlashSaleAction(prevState: unknown, formData: FormData) {

    const amount = Number(formData.get("amount"));
    const courseId = formData.get("courseId") as string;

    const validation = flashSaleSchema.safeParse({
      amount,
      courseId,
    })

    if (!validation.success) {
      return {
       status: "error",
       errors: validation.error.flatten().fieldErrors,
       data: {
          amount,
          courseId
      }
    }} 

    try {
      const existingFlashSale = await flashSaleService.getFlashSaleById(courseId)
      if (existingFlashSale) {
        return {
          status: "error",
          errors: { courseId: ["The course already has a flash sale"] },
          data: { amount, courseId },
        };
      }

      const newFlashSale = await flashSaleService.createFlashSale(validation.data.amount, validation.data.courseId)
      revalidatePath("/admin/flash-sale")

      return { status: "success", data: newFlashSale };
    } catch (error) {
      return {
        status: "error",
        errors: { server: ["Failed to create flash sale"] },
        data: { amount, courseId },
      };
    }

}