import { userServices } from "@/services/user-services";
import { google } from "@/utils/arctic";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";
import { z } from "zod";
import jwt from "jsonwebtoken";

const codeSchema = z.object({
  code: z.string().min(1),
  codeCookies: z.string().min(1),
});

export async function GET(req: NextRequest) {
  // Parse URL parameters
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  const codeVerifier = (await cookies()).get("code")?.value;

  // Validate input
  const validation = codeSchema.safeParse({
    code,
    codeCookies: codeVerifier,
  });

  if (!validation.success) {
    console.error("Validation failed:", validation.error);
    return redirect("/login");
  }

  // Exchange authorization code for tokens
  const tokens = await google.validateAuthorizationCode(
    validation.data.code,
    validation.data.codeCookies
  );

  // access token should give validation at this because response didn'n get any value
  const accessToken =
    typeof tokens.accessToken === "function"
      ? tokens.accessToken()
      : tokens.accessToken;

  if (!accessToken) {
    console.error("Failed to retrieve access token");
    return redirect("/login");
  }

  // Fetch user data with proper error handling
  const userResponse = await fetch(
    "https://www.googleapis.com/oauth2/v3/userinfo",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!userResponse.ok) {
    console.error("Google API error:", await userResponse.text());
    return redirect("/login");
  }

  const user = await userResponse.json();
  // console.log("User data:", user);

  // validation email
  if (!user.email) {
    console.error("User email not found in Google response");
    return redirect("/login");
  }

  // add function create or find user in db
  const findUser = await userServices.findUser(user.email);

  let payload;

  // if user don't have an account will make new
  if (!findUser) {
    // add try catch to make sure your code is running success
    try {
      const newUser = await userServices.createUser({
        name: user.name,
        email: user.email,
        password: "",
      });

      payload = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        avatarUrl: newUser.avatarUrl,
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET as string);

      const cookieStore = await cookies();
      cookieStore.set("token", token, {
        httpOnly: true,
        path: "/",
      });

      return redirect("/dashboard/my-courses");
    } catch (error) {
      console.log(error);
    }
  }

  // add find user with JWT
  payload = {
    id: findUser?.id,
    name: findUser?.name,
    email: findUser?.email,
    role: findUser?.role,
    avatarUrl: findUser?.avatarUrl,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET as string);

  const cookieStore = await cookies();
  cookieStore.set("token", token, {
    httpOnly: true,
    path: "/",
  });

  redirect("/my-courses");
}
