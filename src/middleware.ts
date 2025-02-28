import { NextResponse } from "next/server"
import { withAuth } from "next-auth/middleware"

export const runtime = "experimental-edge"

export default withAuth(
  function middleware(req) {
    return NextResponse.next()
  },
  {
    pages: {
      signIn: "/login",
    },
  }
)

export const config = {
  matcher: [
    "/dashboard",
    "/settings",
    "/projects",
    "/tasks",
    "/messages",
  ],
} 