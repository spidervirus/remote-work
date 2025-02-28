import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Projects",
  description: "Manage your team projects",
}

export default function ProjectsPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Projects</h1>
        <button className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md">
          New Project
        </button>
      </div>
      
      <div className="grid gap-6">
        <div className="p-6 bg-card rounded-lg shadow">
          <p className="text-muted-foreground text-center">No projects yet. Create your first project to get started!</p>
        </div>
      </div>
    </div>
  )
} 