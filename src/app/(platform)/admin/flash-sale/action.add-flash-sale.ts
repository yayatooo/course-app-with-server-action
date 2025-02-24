"use server";

import { flashSaleService } from "@/services/flash-sale-service";
import { revalidatePath } from "next/cache";

export async function addFlashSaleAction(prevState: unknown, formData: FormData) {
  try {
    const amount = Number(formData.get("amount"));
    const courseId = formData.get("courseId") as string;

    if (!amount || !courseId) {
      return { status: "error", message: "Amount and course ID are required" };
    }

    await flashSaleService.createFlashSale(amount, courseId);
    revalidatePath("/admin/flash-sale");

    return { status: "success" }; // Indicate success
  } catch (error) {
    return { status: "error", message: error || "Failed to create flash sale" };
  }
}