"use server";

import z from "zod";
import bcrypt from "bcrypt";
import { userServices } from "@/services/user-services";
import jwt from "jsonwebtoken"
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// schema login form
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "at least 8 characters long"),
});

export async function loginAction(prevState:unknown, formData: FormData) {
  
    // initialize form
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    // add validation input with schema
    const validationInput = loginSchema.safeParse({ email, password });
    if (!validationInput.success) {
      return {
        status: "error",
        errors: validationInput.error.flatten().fieldErrors,
        data: {
          email,
          password,
        },
      };
    }

    // find user for sync into database
    const user = await userServices.findUser(email);

    // validation if user not registered
    if (!user) {
      return {
        status: "error",
        errors: { email: "is Not Found" },
        data: { email, password },
      };
    }

    if (!user.password) {
      return {
        status: "error",
        errors: "Please Login With google",
        data: { email, password },
      };
    }

    // checking password with bcrypt
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    // add validation password
    if (!isPasswordMatch) {
      return {
        status: "error",
        errors: "Invalid Password",
        data: { email, password },
      };
    }

    // inject JWT into login

    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatarUrl: user.avatarUrl,  
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET as string)
    // console.log(token);
    

    const cookiesSet = await cookies();
    cookiesSet.set("token", token, {
      httpOnly: true,
      path: "/"
    });

    redirect("/my-courses")
 
}
