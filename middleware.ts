import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { verifyAuth } from "./lib/auth";

// eslint-disable-next-line import/prefer-default-export
export async function middleware(req: NextRequest) {
  const token = req.cookies.get("jwt")?.value;

  const verifiedToken =
    token &&
    (await verifyAuth(token).catch((err) => {
      console.log(err);
    }));
  const { pathname } = req.nextUrl;

  // Visible by anybody with or without token no auth logic
  const isPublicUrl =
    pathname === "/" || pathname === "/about" || pathname === "/contact-us";

  // Visible only if the user is not logged in
  const isUnauthenticatedUrl =
    pathname === "/signin" ||
    pathname === "/signup" ||
    pathname === "/forgot-password" ||
    pathname.startsWith("/reset-password") ||
    pathname.startsWith("/auth/google/callback");

  // Visible only if the user is logged in
  const isAuthenticatedUrl =
    pathname === "/profile" || pathname === "/dashboard";

  // Exception for the root path to display the dashboard if the user is logged in
  if (pathname === "/" && verifiedToken) {
    return NextResponse.rewrite(new URL("/dashboard", req.url));
  }
  if (isPublicUrl) {
    return NextResponse.next();
  }
  if (isUnauthenticatedUrl && !verifiedToken) {
    return NextResponse.next();
  }
  if (isUnauthenticatedUrl && verifiedToken) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  if (isAuthenticatedUrl && verifiedToken) {
    return NextResponse.next();
  }
  if (isAuthenticatedUrl && !verifiedToken) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/signin",
    "/signup",
    "/profile",
    "/dashboard",
    "/reset-password",
    "/forgot-password",
    "/auth/google/callback",
  ],
};
