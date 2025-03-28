import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

// Define public routes that can be accessed without authentication
const publicRoutes = ["/", "/sign-in", "/sign-up"]
const isPublicRoute = createRouteMatcher(publicRoutes)

export default clerkMiddleware(async (auth, req) => {
  try {
    const { userId } = await auth()

    // For non-public routes, ensure user is authenticated
    if (!isPublicRoute(req)) {
      if (!userId) {
        const signInUrl = new URL("/sign-in", req.url)
        signInUrl.searchParams.set("redirect_url", req.nextUrl.pathname)
        return NextResponse.redirect(signInUrl)
      }
      return NextResponse.next()
    }

    // For public routes, if user is authenticated and not on home page,
    // redirect to dashboard
    if (userId && req.nextUrl.pathname !== "/") {
      return NextResponse.redirect(new URL("/dashboard", req.url))
    }

    return NextResponse.next()
  } catch (error) {
    console.error("🔍 Error in middleware:", error)
    return NextResponse.next()
  }
})

// Stop Middleware running on static files and API routes
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
}