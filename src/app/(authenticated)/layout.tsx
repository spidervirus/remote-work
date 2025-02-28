"use client"

import { useSession, signOut } from "next-auth/react"
import Link from "next/link"
import { Icons } from "@/components/icons"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { data: session } = useSession()
  
  if (!session?.user) {
    return null // Let middleware handle the redirect
  }

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/dashboard" className="flex items-center space-x-2">
              <Icons.logo className="h-6 w-6" />
              <span className="text-xl font-bold">Remote Work</span>
            </Link>
            <div className="flex items-center gap-6">
              <Link 
                href="/projects"
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                Projects
              </Link>
              <Link 
                href="/tasks"
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                Tasks
              </Link>
              <Link 
                href="/messages"
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                Messages
              </Link>
              <div className="flex items-center gap-2 border-l pl-6">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      {session.user.image ? (
                        <img
                          src={session.user.image}
                          alt={session.user.name || "User avatar"}
                          className="h-8 w-8 rounded-full"
                        />
                      ) : (
                        <Icons.user className="h-4 w-4" />
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end">
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {session.user.name}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {session.user.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/settings" className="flex items-center">
                        <Icons.settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onSelect={() => signOut({ callbackUrl: "/login" })}
                    >
                      <Icons.logout className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <main className="min-h-[calc(100vh-73px)]">{children}</main>
    </div>
  )
} 