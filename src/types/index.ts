export interface Task {
  id: string
  title: string
  description?: string | null
  status: "TODO" | "IN_PROGRESS" | "IN_REVIEW" | "DONE"
  priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT"
  dueDate?: Date | null
  createdAt: Date
  updatedAt: Date
  projectId: string
  assigneeId?: string | null
  creatorId: string
  project: {
    id: string
    name: string
  }
} 