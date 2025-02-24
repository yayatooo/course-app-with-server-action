import { prisma } from "@/utils/prisma"


export const flashSaleService = {

    getAllFlashSale : async () => {
        return await prisma.flashSale.findMany({
            include : {
                course : true
            }
        })
    },

    deleteFlashSale: async (id: string) => {
        return await prisma.flashSale.delete({
            where : {
                id
            }
        })
    },

    createFlashSale: async (newAmount : number, courseId: string) => {
        await prisma.flashSale.create({
            data : {
                newAmount,
                courseId
            }
        })
    }
}