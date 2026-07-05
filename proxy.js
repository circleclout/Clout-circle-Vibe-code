import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function proxy(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  
  if (req.nextUrl.pathname.startsWith("/admin") && !req.nextUrl.pathname.startsWith("/admin/login")) {
    if (!token) {
      const url = new URL("/admin/login", req.url);
      return NextResponse.redirect(url);
    }
  }

  // Rate Limiting API Routes
  if (req.nextUrl.pathname.startsWith("/api/admin")) {
    if (!token) {
        return new NextResponse("Unauthorized", { status: 401 });
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
