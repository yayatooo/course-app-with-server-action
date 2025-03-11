import { data } from "@/utils/data";
import { prisma } from "@/utils/prisma";
import { NextRequest } from "next/server";

interface ReqBody {
    event: string;
    data: Record<string, string|number>;
}

export async function GET(req:NextRequest) {
    const body = await (req.json()) as ReqBody;


    // update transaction status to PAID
    if (body.event === "payment.received") {
        const updatePayment = await prisma.transaction.update({
            where: {
                transactionId: body.data.productId as string
            }, data : {
                paymentStatus: "PAID"
            }
        })

        await prisma.courseAccess.create({
            data : {
                userId: updatePayment.userId,
                courseId: updatePayment.courseId
            }
        })

        await prisma.certificate.create({
            data : {
                userId: updatePayment.userId,
                courseId: updatePayment.courseId
            }
        })
    }

    return new Response("OK", { status: 200 });

}