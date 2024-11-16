import { NextRequest, NextResponse } from "next/server";

export default function middleware(request: NextRequest): NextResponse {
  const isLoggedIn = request.cookies.has("accessToken");
  const workoutPathRegex = /^\/workout\/\d{4}-\d{2}-\d{2}$/;

  if (!isLoggedIn && request.nextUrl.pathname !== "/") {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  if (!isLoggedIn && request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  if (
    isLoggedIn &&
    !workoutPathRegex.test(request.nextUrl.pathname) &&
    (request.nextUrl.pathname === "/workout" || request.nextUrl.pathname === "/")
  ) {
    const today = new Date().toLocaleDateString("sv-SE");
    return NextResponse.redirect(new URL(`/workout/${today}`, request.url));
  }

  return NextResponse.next();
}
export const config = {
  matcher: ["/", "/ranking", "/workout/:path?"],
};
