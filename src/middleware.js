import { auth } from "@/auth";

export default auth((req) => {
  // req.auth
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!api/auth|api/products|_next/static|_next/image|favicon.ico).*)"],
};
