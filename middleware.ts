import { default as nextAuthMiddleware } from "next-auth/middleware";

export const middleware = nextAuthMiddleware;

export const config = {
  matcher: ["/issues/new", "/issues/edit/:path*"],
};
