"use server";

import { flashSaleService } from "@/services/flash-sale-service";
import { revalidatePath } from "next/cache";

export async function deleteFlashSaleAction(
    prevState: unknown,
  formData: FormData
) {
  const id = formData.get("id") as string;

  try {
    await flashSaleService.deleteFlashSale(id);
    revalidatePath("/admin/flash-sale");
  } catch (error) {
    console.log(error);
  }
}
