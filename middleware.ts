import { auth } from "@/auth";

export default auth((req) => {
  // console.log("req", req.auth);
  if (req.nextUrl.pathname.startsWith("/admin")) {
    if (req.auth?.user?.role !== "ADMIN") {
      const newUrl = new URL("/api/auth/signin", req.nextUrl.origin);
      return Response.redirect(newUrl);
    }
  }

  //if user already authenticated and trying to access sign in page
  if (req.nextUrl.pathname === "/api/auth/signin") {
    console.log("req.auth?.user", req.auth);
    if (req.auth?.user) {
      const newUrl = new URL("/", req.nextUrl.origin);
      return Response.redirect(newUrl);
    }
  }
});
