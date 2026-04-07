import { NextRequest, NextResponse } from "next/server";

export const middleware = (request: NextRequest) => {
  const token = request.cookies.get("token")?.value;
  console.log(token, "middlewares");
  if (!token && request.nextUrl.pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: ["/admin/:path*"],
};
