"use client"

import { useState } from "react"
import { toast } from "sonner"

import { NewTaskDialog } from "@/components/new-task-dialog"
import { TaskCard } from "@/components/task-card"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Temporary mock data - replace with actual data fetching
const initialTasks = [
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
  {
    id: "3",
    title: "Fix navigation bug",
    description: "Address the mobile navigation menu issues",
    dueDate: "2024-04-10",
    priority: "high",
    project: "Bug Fixes",
    completed: true,
  },
] as const

export default function TasksPage() {
  const [tasks, setTasks] = useState(initialTasks)

  const handleComplete = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
    toast.success("Task status updated")
  }

  const handleDelete = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id))
    toast.success("Task deleted")
  }

  return (
    <div className="container space-y-8 py-8">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Tasks</h1>
          <p className="text-lg text-muted-foreground">
            Manage your tasks and track your progress.
          </p>
        </div>
        <NewTaskDialog />
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Tasks</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-4">
          <div className="grid gap-6">
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onComplete={handleComplete}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="active" className="mt-4">
          <div className="grid gap-6">
            {tasks
              .filter((task) => !task.completed)
              .map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onComplete={handleComplete}
                  onDelete={handleDelete}
                />
              ))}
          </div>
        </TabsContent>
        <TabsContent value="completed" className="mt-4">
          <div className="grid gap-6">
            {tasks
              .filter((task) => task.completed)
              .map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onComplete={handleComplete}
                  onDelete={handleDelete}
                />
              ))}
          </div>
        </TabsContent>
      </Tabs>

      {tasks.length === 0 && (
        <Card className="flex h-[450px] items-center justify-center text-center">
          <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
            <h3 className="mt-4 text-lg font-semibold">No tasks created</h3>
            <p className="mb-4 mt-2 text-sm text-muted-foreground">
              You haven&apos;t created any tasks yet. Start by creating a new task.
            </p>
            <NewTaskDialog />
          </div>
        </Card>
      )}
    </div>
  )
} 