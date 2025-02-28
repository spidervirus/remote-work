"use client"

import { useState } from "react"
import { toast } from "sonner"
import { ClipboardList, Loader2 } from "lucide-react"

import { NewTaskDialog } from "@/components/new-task-dialog"
import { TaskCard } from "@/components/task-card"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type Task = {
  id: string
  title: string
  description: string
  dueDate: string
  priority: "low" | "medium" | "high"
  project: string
  completed: boolean
}

// Initial tasks as a regular array, not readonly
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
] as Task[]

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [isLoading, setIsLoading] = useState(false)

  const handleComplete = (id: string) => {
    setIsLoading(true)
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
    // Simulate API call delay
    setTimeout(() => {
      setIsLoading(false)
      toast.success("Task status updated")
    }, 500)
  }

  const handleDelete = (id: string) => {
    setIsLoading(true)
    setTasks(tasks.filter(task => task.id !== id))
    // Simulate API call delay
    setTimeout(() => {
      setIsLoading(false)
      toast.success("Task deleted")
    }, 500)
  }

  const handleAddTask = (task: Task) => {
    setIsLoading(true)
    setTasks([task, ...tasks])
    // Simulate API call delay
    setTimeout(() => {
      setIsLoading(false)
      toast.success("Task created successfully")
    }, 500)
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
        <NewTaskDialog onAddTask={handleAddTask} />
      </div>

      {isLoading && (
        <div className="flex items-center justify-center py-4">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      )}

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
          <TabsTrigger value="all">All Tasks</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-4 space-y-4">
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onComplete={handleComplete}
                onDelete={handleDelete}
              />
            ))
          ) : (
            <EmptyState />
          )}
        </TabsContent>
        <TabsContent value="active" className="mt-4 space-y-4">
          {tasks.filter((task) => !task.completed).length > 0 ? (
            tasks
              .filter((task) => !task.completed)
              .map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onComplete={handleComplete}
                  onDelete={handleDelete}
                />
              ))
          ) : (
            <EmptyState message="No active tasks" />
          )}
        </TabsContent>
        <TabsContent value="completed" className="mt-4 space-y-4">
          {tasks.filter((task) => task.completed).length > 0 ? (
            tasks
              .filter((task) => task.completed)
              .map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onComplete={handleComplete}
                  onDelete={handleDelete}
                />
              ))
          ) : (
            <EmptyState message="No completed tasks" />
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

function EmptyState({ message = "No tasks created" }) {
  return (
    <Card className="flex h-[400px] items-center justify-center text-center">
      <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
        <ClipboardList className="h-12 w-12 text-muted-foreground/50" />
        <h3 className="mt-4 text-lg font-semibold">{message}</h3>
        <p className="mb-4 mt-2 text-sm text-muted-foreground">
          {message === "No tasks created" 
            ? "You haven't created any tasks yet. Start by creating a new task."
            : "Tasks you complete will appear here."}
        </p>
        <NewTaskDialog onAddTask={() => {}} />
      </div>
    </Card>
  )
} 