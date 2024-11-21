import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Check if the user exists in cookies
  const user = request.cookies.get("user"); // Assuming you store user info in cookies

  // Redirect to /dashboard if user is found and trying to access /login or /register
  if (
    user &&
    (request.nextUrl.pathname === "/login" ||
      request.nextUrl.pathname === "/register")
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // If no user is found and trying to access protected routes, redirect to login
  if (
    !user &&
    (request.nextUrl.pathname.startsWith("/absent") ||
      request.nextUrl.pathname.startsWith("/dashboard") ||
      request.nextUrl.pathname.startsWith("/student"))
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If user exists, allow the request to proceed
  return NextResponse.next();
}

// Specify the paths where the middleware should be applied
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/protected/:path*",
    "/login",
    "/register",
    "/absent/:path*",
    "/student/:path*",
  ], // Add your protected routes here
};
