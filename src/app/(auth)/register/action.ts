"use server";
import z from "zod";
import bcrypt from "bcrypt";
import { userServices } from "@/services/user-services";

const registerSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(8, "at least 8 characters long"),
});

export async function registerAction(prevState: unknown, formData: FormData) {
  // define the form input
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // add validation form zod
  const inputValidation = registerSchema.safeParse({ name, email, password });
  if (!inputValidation.success) {
    return {
      status: "error",
      errors: inputValidation.error.flatten().fieldErrors,
      data: {
        name,
        email,
        password,
      },
    };
  }

  //add hashed password and input into databaes
  try {
    const hashedPassword = await bcrypt.hash(password, 13);
    await userServices.createUser({ name, email, password: hashedPassword });
    return {
      status: "Success",
      message: "Register Account Success",
    };
  } catch (error) {
    return {
      status:  error,
      message: "Internal Server Error",
    };
  }
}
