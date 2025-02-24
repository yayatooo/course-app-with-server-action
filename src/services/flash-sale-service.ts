import { prisma } from "@/utils/prisma"


export const flashSaleService = {

    createFlashSale: async (newAmount : number, courseId: string) => {
        await prisma.flashSale.create({
            data : {
                newAmount,
                courseId
            }
        })
    }
}