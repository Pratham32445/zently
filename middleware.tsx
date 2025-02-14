import { NextResponse, type NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const PUBLIC_FILE = /\.(.*)$/;

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/static") ||
    PUBLIC_FILE.test(pathname)
  )
    return NextResponse.next();

  if (
    pathname == "/sign-up" ||
    pathname == "/sign-in" ||
    pathname == "/forget-password"
  ) {
    return NextResponse.next();
  }

  if (pathname != "/") {
    const secret = process.env.NEXTAUTH_SECRET;
    const token = await getToken({ req, secret });
    if (token) return NextResponse.next();
    else return NextResponse.redirect(new URL("/sign-in", req.url));
  }
  return NextResponse.next();
}
