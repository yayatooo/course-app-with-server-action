"use server";

import { prisma } from "@/utils/prisma";
import { revalidatePath } from "next/cache";

export async function unBanUserAction(prevState: unknown, formData: FormData) {
  try {
    const userId = formData.get("userId") as string;
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        onBanned: false,
      },
    });
  } catch (error) {
    console.error("Error banning user:", error);
    throw error;
  }

  revalidatePath("/admin/users");
}
