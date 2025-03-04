// src/lib/server-auth.ts
"use server"; // If used in Server Actions, otherwise optional

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt, { JwtPayload } from "jsonwebtoken";

// Define the expected JWT payload structure
interface AuthPayload extends JwtPayload {
  id: string;
  email: string;
  avatarUrl: string | null; // Allow null if optional
  role: "admin" | "user";
}

export default async function serverAuth() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  // Redirect if no token
  if (!token) {
    redirect("/login");
  }

  try {
    // Verify the token instead of signing it
    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as AuthPayload;

    // Optional: Additional validation
    if (!payload.id || !payload.email || !payload.role) {
      throw new Error("Invalid token payload");
    }

    return payload;
  } catch (error) {
    // Log error for debugging (consider a proper logging service in production)
    console.error(
      "Authentication error:",
      error instanceof Error ? error.message : "Unknown error"
    );

    redirect("/login");
  }
}

