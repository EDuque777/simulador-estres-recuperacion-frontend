import { NextResponse, type NextRequest } from "next/server";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";
const REFRESH_TOKEN_COOKIE = "refreshToken";

const redirectToLogin = (request: NextRequest) => {
  return NextResponse.redirect(new URL("/", request.url));
};

export async function proxy(request: NextRequest) {
  const hasRefreshToken = Boolean(request.cookies.get(REFRESH_TOKEN_COOKIE));

  if (!hasRefreshToken) {
    return redirectToLogin(request);
  }

  try {
    const refreshResponse = await fetch(
      new URL("/auth/refresh-token", API_BASE_URL),
      {
        method: "POST",
        headers: {
          cookie: request.headers.get("cookie") ?? "",
        },
        cache: "no-store",
      },
    );

    if (!refreshResponse.ok) {
      return redirectToLogin(request);
    }

    const response = NextResponse.next();
    const refreshedCookie = refreshResponse.headers.get("set-cookie");

    if (refreshedCookie) {
      response.headers.set("set-cookie", refreshedCookie);
    }

    return response;
  } catch {
    return redirectToLogin(request);
  }
}

export const config = {
  matcher: "/simulacion/:path*",
};
