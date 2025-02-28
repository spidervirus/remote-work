import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Tasks",
  description: "Manage your tasks and assignments",
}

export default function TasksPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Tasks</h1>
        <button className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md">
          New Task
        </button>
      </div>
      
      <div className="grid gap-6">
        <div className="p-6 bg-card rounded-lg shadow">
          <p className="text-muted-foreground text-center">No tasks assigned. Create a new task or wait for assignments.</p>
        </div>
      </div>
    </div>
  )
} 