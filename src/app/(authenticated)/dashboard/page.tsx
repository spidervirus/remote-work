"use client"

import { useState } from "react"
import Link from "next/link"
import { 
  BarChart3, 
  CheckCircle2, 
  Clock, 
  FileText, 
  FolderKanban, 
  LayoutDashboard, 
  MessageSquare, 
  Plus 
} from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { NewTaskDialog } from "@/components/new-task-dialog"
import { TaskCard } from "@/components/task-card"

type Task = {
  id: string
  title: string
  description: string
  dueDate: string
  priority: "low" | "medium" | "high"
  project: string
  completed: boolean
}

// Temporary mock data
const recentTasks: Task[] = [
  {
    id: "1",
    title: "Design new landing page",
    description: "Create a modern and responsive landing page design",
    dueDate: "2024-04-15",
    priority: "high",
    project: "Website Redesign",
    completed: false,
  },
  {
    id: "2",
    title: "Write documentation",
    description: "Document the new API endpoints and their usage",
    dueDate: "2024-04-20",
    priority: "medium",
    project: "API Development",
    completed: false,
  },
]

export default function DashboardPage() {
  const [tasks, setTasks] = useState<Task[]>(recentTasks)

  const stats = [
    {
      title: "Total Tasks",
      value: "12",
      description: "Active tasks across all projects",
      icon: FileText,
    },
    {
      title: "Completed",
      value: "8",
      description: "Tasks completed this week",
      icon: CheckCircle2,
    },
    {
      title: "In Progress",
      value: "4",
      description: "Tasks currently in progress",
      icon: Clock,
    },
    {
      title: "Projects",
      value: "3",
      description: "Active projects",
      icon: FolderKanban,
    },
  ]

  const quickActions = [
    {
      title: "Tasks",
      description: "View and manage your tasks",
      icon: FileText,
      href: "/tasks",
      color: "text-blue-500",
    },
    {
      title: "Projects",
      description: "Organize work into projects",
      icon: FolderKanban,
      href: "/projects",
      color: "text-green-500",
    },
    {
      title: "Messages",
      description: "Communicate with your team",
      icon: MessageSquare,
      href: "/messages",
      color: "text-purple-500",
    },
  ]

  return (
    <div className="container space-y-8 py-8">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-lg text-muted-foreground">
            Welcome back! Here&apos;s an overview of your workspace.
          </p>
        </div>
        <NewTaskDialog onAddTask={(task: Task) => setTasks([task, ...tasks])} />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground pt-1">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Tasks</CardTitle>
            <CardDescription>
              Your most recent tasks across all projects
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onComplete={(id) => {
                  setTasks(
                    tasks.map((t) =>
                      t.id === id ? { ...t, completed: !t.completed } : t
                    )
                  )
                }}
                onDelete={(id) => {
                  setTasks(tasks.filter((t) => t.id !== id))
                }}
              />
            ))}
            {tasks.length === 0 && (
              <div className="flex h-[200px] items-center justify-center rounded-lg border border-dashed">
                <div className="text-center">
                  <LayoutDashboard className="mx-auto h-8 w-8 text-muted-foreground/30" />
                  <h3 className="mt-2 text-sm font-medium">No tasks yet</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Create a new task to get started
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common actions to help you get started
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            {quickActions.map((action) => (
              <Link
                key={action.title}
                href={action.href}
                className="group block space-y-2"
              >
                <div className="group flex items-center gap-3 rounded-md border p-3 hover:bg-accent">
                  <action.icon className={`h-5 w-5 ${action.color}`} />
                  <div className="space-y-0.5">
                    <h4 className="text-sm font-medium">{action.title}</h4>
                    <p className="text-xs text-muted-foreground">
                      {action.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
            <Button
              variant="outline"
              className="w-full justify-start gap-2"
              asChild
            >
              <Link href="/tasks">
                <Plus className="h-4 w-4" />
                Create New Task
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 