import { prisma } from "@/utils/prisma";
import { log } from "util";

export const certificateService = {
  getAllSertificate: async () => {
    try {
      const getAllCertificate = await prisma.certificate.findMany({
        include: {
          course: true,
          user: {
            select: {
              name: true,
              email: true,
            },
          },
        },
      });

      return getAllCertificate;
    } catch (error) {
      console.log(error);
    }
  },

  updateCertificate: async (certificateId: string) => {
    try {
      const update = await prisma.certificate.update({
        where: {
          id: certificateId,
        },
        data: {
          status: "APPROVED",
        },
      });

      return update;
    } catch (error) {
      console.log(error);
    }
  },
};
