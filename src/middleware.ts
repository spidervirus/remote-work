import { NextResponse } from "next/server"
import { withAuth } from "next-auth/middleware"

export const runtime = "edge"

export default withAuth(
  async function middleware(req) {
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
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