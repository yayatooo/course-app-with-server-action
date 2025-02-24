import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const cookieStore = req.cookies;
  const token = cookieStore.get("token")?.value;

  // Define protected routes
  const protectedPaths = ["/dashboard", "/admin"];

  // Check if the current path is protected
  const isProtected = protectedPaths.some((path) =>
    req.nextUrl.pathname.startsWith(path)
  );

  if (isProtected && !token) {
    // Redirect to login if no token is found
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Proceed as normal if token exists or route isn’t protected
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"], // Apply middleware to /dashboard and its subroutes
};