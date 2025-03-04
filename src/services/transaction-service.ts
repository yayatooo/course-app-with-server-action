import { prisma } from "@/utils/prisma";
import { courseService } from "./course-service";
import { userServices } from "./user-services";

export const transactionService = {
  createTransaction: async (
    courseId: string,
    userId: string,
    amount: number
  ) => {
    const course = await courseService.getCourseDetail(courseId);

    if (!course) {
      return {
        status: "error",
        errors: "Course not found",
      };
    }

    const user = await userServices.findUser(userId);

    if (!user) {
      return {
        status: "error",
        errors: "User not found",
      };
    }

    const res = await fetch("https://api.mayar.id/hl/v1/payment/create", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.MAYAR_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: user.name,
        email: user.email,
        amount: Number(amount),
        description: `Payment for ${course.title}`,
        mobile: "000000000000",
      }),
    });

    const data = (await res.json()) as { data: { link: string; id: string } };

    const transaction = await prisma.transaction.create({
      data: {
        course: {
          connect: {
            id: course.id,
          },
        },
        user: {
          connect: {
            id: user.id,
          },
        },
        paymentStatus: "UNPAID",
        amount,
        paymentLink: data.data.link,
        transactionId: data.data.id,
      },
    });

    return transaction;
  },
};
