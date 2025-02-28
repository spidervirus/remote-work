import { Metadata } from "next"
import Link from "next/link"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { Icons } from "@/components/icons"

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Your Remote Work Dashboard",
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  return (
    <div className="container mx-auto py-10">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Welcome back, {session?.user?.name?.split(' ')[0] || 'there'}! 👋</h1>
        <p className="text-muted-foreground">Here's what's happening with your projects today.</p>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-6 mb-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <div className="p-6 bg-card rounded-lg border shadow-sm">
          <div className="flex items-center gap-2 mb-2 text-muted-foreground">
            <Icons.folder className="h-4 w-4" />
            <span className="text-sm font-medium">Active Projects</span>
          </div>
          <p className="text-2xl font-bold">0</p>
        </div>
        <div className="p-6 bg-card rounded-lg border shadow-sm">
          <div className="flex items-center gap-2 mb-2 text-muted-foreground">
            <Icons.task className="h-4 w-4" />
            <span className="text-sm font-medium">Pending Tasks</span>
          </div>
          <p className="text-2xl font-bold">0</p>
        </div>
        <div className="p-6 bg-card rounded-lg border shadow-sm">
          <div className="flex items-center gap-2 mb-2 text-muted-foreground">
            <Icons.message className="h-4 w-4" />
            <span className="text-sm font-medium">Unread Messages</span>
          </div>
          <p className="text-2xl font-bold">0</p>
        </div>
        <div className="p-6 bg-card rounded-lg border shadow-sm">
          <div className="flex items-center gap-2 mb-2 text-muted-foreground">
            <Icons.users className="h-4 w-4" />
            <span className="text-sm font-medium">Team Members</span>
          </div>
          <p className="text-2xl font-bold">1</p>
        </div>
      </div>

      {/* Quick Actions */}
      <h2 className="text-2xl font-semibold mb-4">Quick Actions</h2>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <Link href="/projects" 
          className="group p-6 bg-card hover:bg-accent rounded-lg border shadow-sm transition-colors">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-2 rounded-md bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              <Icons.folder className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold">Projects</h3>
          </div>
          <p className="text-muted-foreground">Create and manage your team projects. Track progress and set milestones.</p>
        </Link>

        <Link href="/tasks" 
          className="group p-6 bg-card hover:bg-accent rounded-lg border shadow-sm transition-colors">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-2 rounded-md bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              <Icons.task className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold">Tasks</h3>
          </div>
          <p className="text-muted-foreground">Organize and prioritize your tasks. Stay on top of deadlines.</p>
        </Link>

        <Link href="/messages" 
          className="group p-6 bg-card hover:bg-accent rounded-lg border shadow-sm transition-colors">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-2 rounded-md bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              <Icons.message className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold">Messages</h3>
          </div>
          <p className="text-muted-foreground">Communicate with your team in real-time. Share updates and files.</p>
        </Link>
      </div>
    </div>
  )
} 