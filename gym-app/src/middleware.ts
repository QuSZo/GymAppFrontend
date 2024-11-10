import { NextRequest, NextResponse } from "next/server";

export default function middleware(request: NextRequest): NextResponse {
  const isLoggedIn = request.cookies.has("accessToken");

  if (!isLoggedIn) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}
export const config = {
  matcher: ["/", "/ranking", "/workout", "/workout/:path*"],
};
