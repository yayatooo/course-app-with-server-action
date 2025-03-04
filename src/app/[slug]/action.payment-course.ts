"use server";

import serverAuth from "@/lib/server-auth";
import { transactionService } from "@/services/transaction-service";
import { redirect } from "next/navigation";


export async function paymentCourse(formData: FormData) {
  const courseId = formData.get("courseId") as string;
  const amount = Number(formData.get("amount"));

  if (!courseId || isNaN(amount)) {
    return;
  }

  const user = await serverAuth();
  const data = await transactionService.createTransaction(courseId, user.id, amount);
  if ('paymentLink' in data) {
    redirect(data.paymentLink);
  } else {
    console.error("Payment link not found in the response data");
  }
  

 
}
