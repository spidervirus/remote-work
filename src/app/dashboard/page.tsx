import { Metadata } from "next"
import Link from "next/link"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Your Remote Work Dashboard",
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  
  if (!session?.user) {
    redirect("/login")
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-8">Welcome, {session.user.name || "User"}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link href="/projects" 
          className="p-6 bg-card hover:bg-accent rounded-lg shadow transition-colors">
          <h2 className="text-2xl font-semibold mb-2">Projects</h2>
          <p className="text-muted-foreground">Manage your team projects and track progress</p>
        </Link>

        <Link href="/tasks" 
          className="p-6 bg-card hover:bg-accent rounded-lg shadow transition-colors">
          <h2 className="text-2xl font-semibold mb-2">Tasks</h2>
          <p className="text-muted-foreground">View and manage your assigned tasks</p>
        </Link>

        <Link href="/messages" 
          className="p-6 bg-card hover:bg-accent rounded-lg shadow transition-colors">
          <h2 className="text-2xl font-semibold mb-2">Messages</h2>
          <p className="text-muted-foreground">Communicate with your team members</p>
        </Link>
      </div>
    </div>
  )
} 