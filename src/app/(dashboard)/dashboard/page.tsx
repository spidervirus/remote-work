import { Metadata } from "next"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { formatDate } from "@/lib/utils"
import { Task } from "@/types"

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Your workspace overview and recent activity",
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return null

  const [workspaces, projects, tasks] = await Promise.all([
    prisma.workspace.count({
      where: {
        OR: [
          { ownerId: session.user.id },
          { members: { some: { id: session.user.id } } },
        ],
      },
    }),
    prisma.project.count({
      where: {
        members: { some: { id: session.user.id } },
      },
    }),
    prisma.task.count({
      where: {
        assigneeId: session.user.id,
        status: { not: "DONE" },
      },
    }),
  ])

  const recentTasks = await prisma.task.findMany({
    where: {
      assigneeId: session.user.id,
    },
    orderBy: {
      updatedAt: "desc",
    },
    take: 5,
    include: {
      project: true,
    },
  }) as Task[]

  return (
    <div className="container space-y-8 py-8">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border p-4">
          <h3 className="text-lg font-semibold">Workspaces</h3>
          <p className="mt-2 text-3xl font-bold">{workspaces}</p>
        </div>
        <div className="rounded-lg border p-4">
          <h3 className="text-lg font-semibold">Projects</h3>
          <p className="mt-2 text-3xl font-bold">{projects}</p>
        </div>
        <div className="rounded-lg border p-4">
          <h3 className="text-lg font-semibold">Active Tasks</h3>
          <p className="mt-2 text-3xl font-bold">{tasks}</p>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold tracking-tight">Recent Tasks</h2>
        <div className="mt-4 space-y-4">
          {recentTasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between rounded-lg border p-4"
            >
              <div>
                <h3 className="font-semibold">{task.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {task.project.name}
                </p>
              </div>
              <div className="text-sm text-muted-foreground">
                Updated {formatDate(task.updatedAt)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 