import { auth } from "@/modules/auth/auth";
import { NextResponse } from "next/server";

export const middleware = auth(async (req) => {
  try {
    console.log("[MIDDLEWARE] time", Date.now());
    console.log("[MIDDLEWARE] req.url", req.url);
    const { nextUrl } = req;
    const session = req.auth;
    const isLoggedIn = !!session;
    console.log("[MIDDLEWARE] isLoggedIn:", isLoggedIn);

    console.log("[MIDDLEWARE] user: ", session);
    console.log("[MIDDLEWARE] trying access to url:", nextUrl.pathname);

    return;
  } catch (error) {
    console.error("[MIDDLEWARE] Unexpected error:", error);
    const response = NextResponse.redirect(new URL("/login", req.url));
    response.cookies.set("authjs.csrf-token", "", { maxAge: 0 });
    response.cookies.set("__Secure-authjs.csrf-token", "", { maxAge: 0 });
    response.cookies.set("authjs.session-token", "", { maxAge: 0 });
    response.cookies.set("__Secure-authjs.session-token", "", {
      maxAge: 0,
    });
    return response;
  }
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next|api/auth|trpc).*)"],
};

export default middleware;
