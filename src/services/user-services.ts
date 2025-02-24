import { prisma } from "@/utils/prisma";
import { User } from "@prisma/client";

export const userServices = {
  getAllUsers: async () => {
    try {
      const getUsers = await prisma.user.findMany({
        orderBy: {
          name: "asc",
        },
      });

      return getUsers;
    } catch (error) {
      console.log(error);
    }
  },

  // make register user service
  createUser: async (user: Pick<User, "name" | "email" | "password">) => {
    const newUser = await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
      },
    });

    return newUser;
  },

  // make login user service
  findUser: async (email: string) => {
    const findUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    return findUser;
  },
};
