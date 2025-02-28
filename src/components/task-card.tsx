"use client"

import * as React from "react"
import { format } from "date-fns"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Icons } from "@/components/icons"

type Task = {
  id: string
  title: string
  description: string
  dueDate: string
  priority: "low" | "medium" | "high"
  project: string
  completed: boolean
}

type TaskCardProps = {
  task: Task
  onComplete: (id: string) => void
  onDelete: (id: string) => void
}

export function TaskCard({ task, onComplete, onDelete }: TaskCardProps) {
  const priorityColors = {
    low: "bg-green-500/10 text-green-500",
    medium: "bg-yellow-500/10 text-yellow-500",
    high: "bg-red-500/10 text-red-500",
  }

  return (
    <Card className={cn("transition-all", task.completed && "opacity-60")}>
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <h3 className="font-semibold leading-none tracking-tight">
            {task.title}
          </h3>
          <p className="text-sm text-muted-foreground">{task.project}</p>
        </div>
        <Badge className={priorityColors[task.priority]} variant="secondary">
          {task.priority}
        </Badge>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{task.description}</p>
        <p className="mt-2 text-sm text-muted-foreground">
          Due: {new Date(task.dueDate).toLocaleDateString()}
        </p>
      </CardContent>
      <CardFooter className="justify-between">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onComplete(task.id)}
        >
          {task.completed ? "Mark Incomplete" : "Mark Complete"}
        </Button>
        <Button
          variant="destructive"
          size="sm"
          onClick={() => onDelete(task.id)}
        >
          Delete
        </Button>
      </CardFooter>
    </Card>
  )
} 