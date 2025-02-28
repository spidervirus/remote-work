import { Metadata } from "next"
import { NewProjectDialog } from "@/components/new-project-dialog"
import { Card } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Projects",
  description: "Manage your team projects",
}

export default function ProjectsPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <div className="space-y-1">
          <h1 className="text-4xl font-bold">Projects</h1>
          <p className="text-lg text-muted-foreground">
            Create and manage your team projects.
          </p>
        </div>
        <NewProjectDialog />
      </div>
      
      <div className="grid gap-6">
        <Card className="flex h-[450px] items-center justify-center text-center">
          <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
            <h3 className="mt-4 text-lg font-semibold">No projects created</h3>
            <p className="mb-4 mt-2 text-sm text-muted-foreground">
              You haven&apos;t created any projects yet. Start by creating a new project.
            </p>
            <NewProjectDialog />
          </div>
        </Card>
      </div>
    </div>
  )
} 