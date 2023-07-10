import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";

// Visible by anybody with or without token no auth logic
const publicUrls = ["/about", "/contact-us"];

// Visible only if the user is logged in
const authenticatedUrls = ["/profile", "/dashboard"];

// Visible only if the user is not logged in
const unauthenticatedUrls = [
  "/auth/signup",
  "/auth/signin",
  "/auth/reset-password",
  "/auth/forgot-password",
  "/auth/google/callback",
];

function startsWithUrl(pathname: string, arrayOfString: string[]) {
  for (let i = 0; i < arrayOfString.length; i += 1) {
    if (pathname.startsWith(arrayOfString[i])) {
      return true;
    }
  }
  return false;
}

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const { token: verifiedToken } = req.nextauth;

    // Visible by anybody with or without token no auth logic
    const isPublic = pathname === "/" || startsWithUrl(pathname, publicUrls);

    // Visible only if the user is not logged in
    const isUnauthenticated = startsWithUrl(pathname, unauthenticatedUrls);

    // Visible only if the user is logged in
    const isAuthenticated = startsWithUrl(pathname, authenticatedUrls);

    // Exception for the root path to display the dashboard if the user is logged in
    if (pathname === "/" && verifiedToken) {
      return NextResponse.rewrite(new URL("/dashboard", req.url));
    }
    if (isPublic) {
      return NextResponse.next();
    }
    if (isUnauthenticated && !verifiedToken) {
      return NextResponse.next();
    }
    if (isUnauthenticated && verifiedToken) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    if (isAuthenticated && verifiedToken) {
      return NextResponse.next();
    }
    if (isAuthenticated && !verifiedToken) {
      return NextResponse.redirect(new URL("/signin", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: () => {
        // we are considering all the routes as public
        // because we are handling the auth logic in the middleware
        // and also because of the "/" route
        return true;
      },
    },
  },
);

export const config = {
  matcher: [
    "/",
    "/profile",
    "/dashboard",
    "/auth/signup",
    "/auth/signin",
    "/auth/reset-password",
    "/auth/forgot-password",
    "/auth/google/callback",
  ],
};
