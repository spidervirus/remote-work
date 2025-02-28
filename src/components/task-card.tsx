"use client"

import { useState } from "react"
import { Calendar, CheckCircle2, Circle, Trash2 } from "lucide-react"
import { formatDate } from "@/lib/utils"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

type TaskCardProps = {
  task: {
    id: string
    title: string
    description: string
    dueDate: string
    priority: "low" | "medium" | "high"
    project: string
    completed: boolean
  }
  onComplete: (id: string) => void
  onDelete: (id: string) => void
}

const priorityColors = {
  low: "bg-green-500/10 text-green-500 hover:bg-green-500/20",
  medium: "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20",
  high: "bg-red-500/10 text-red-500 hover:bg-red-500/20",
}

export function TaskCard({ task, onComplete, onDelete }: TaskCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Card
      className={`group relative transform transition-all duration-200 hover:shadow-md ${
        task.completed ? "opacity-75" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader className="grid grid-cols-[1fr_auto] items-start gap-4 space-y-0">
        <div className="space-y-2">
          <CardTitle className={task.completed ? "line-through" : ""}>
            {task.title}
          </CardTitle>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className={priorityColors[task.priority]}>
              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
            </Badge>
            <Badge variant="outline" className="bg-blue-500/10 text-blue-500 hover:bg-blue-500/20">
              {task.project}
            </Badge>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className={`${
            task.completed
              ? "text-green-500 hover:text-green-600"
              : "text-muted-foreground hover:text-foreground"
          }`}
          onClick={() => onComplete(task.id)}
        >
          {task.completed ? (
            <CheckCircle2 className="h-5 w-5" />
          ) : (
            <Circle className="h-5 w-5" />
          )}
        </Button>
      </CardHeader>
      <CardContent>
        <p className={`text-sm text-muted-foreground ${task.completed ? "line-through" : ""}`}>
          {task.description}
        </p>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <div className="flex items-center text-sm text-muted-foreground">
          <Calendar className="mr-2 h-4 w-4" />
          Due {formatDate(new Date(task.dueDate))}
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="opacity-0 transition-opacity group-hover:opacity-100"
          onClick={() => onDelete(task.id)}
        >
          <Trash2 className="h-4 w-4 text-destructive" />
        </Button>
      </CardFooter>
    </Card>
  )
} 