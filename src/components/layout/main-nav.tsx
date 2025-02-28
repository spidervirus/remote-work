"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export function MainNav() {
  const pathname = usePathname()

  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <span className="hidden font-bold sm:inline-block">
          Remote Work
        </span>
      </Link>
      <nav className="flex items-center space-x-6 text-sm font-medium">
        <Link
          href="/dashboard"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname === "/dashboard" ? "text-foreground" : "text-foreground/60"
          )}
        >
          Dashboard
        </Link>
        <Link
          href="/projects"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/projects")
              ? "text-foreground"
              : "text-foreground/60"
          )}
        >
          Projects
        </Link>
        <Link
          href="/tasks"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/tasks")
              ? "text-foreground"
              : "text-foreground/60"
          )}
        >
          Tasks
        </Link>
        <Link
          href="/messages"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/messages")
              ? "text-foreground"
              : "text-foreground/60"
          )}
        >
          Messages
        </Link>
      </nav>
    </div>
  )
} 