import { auth } from "@/auth";

export default auth((req) => {
  // Only protect /admin routes
  if (req.nextUrl.pathname.startsWith("/admin")) {
    //   if (req.auth?.user?.role !== "ADMIN") {
    // const newUrl = new URL("/api/auth/signin", req.nextUrl.origin);
    // return Response.redirect(newUrl);
    //   }
  }
});
