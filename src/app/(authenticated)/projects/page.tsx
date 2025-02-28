"use client"

import { useState } from "react"
import { CalendarRange, FolderKanban, LayoutDashboard } from "lucide-react"
import { formatDate } from "@/lib/utils"

import { NewProjectDialog } from "@/components/new-project-dialog"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

type Project = {
  id: string
  name: string
  description: string
  startDate: string
  endDate: string
  status: "active" | "completed" | "on-hold"
}

// Initial mock data
const initialProjects: Project[] = [
  {
    id: "1",
    name: "Website Redesign",
    description: "Redesign and rebuild the company website with modern technologies",
    startDate: "2024-04-01",
    endDate: "2024-06-30",
    status: "active",
  },
  {
    id: "2",
    name: "Mobile App Development",
    description: "Develop a new mobile app for both iOS and Android platforms",
    startDate: "2024-05-01",
    endDate: "2024-08-31",
    status: "on-hold",
  },
]

const statusColors = {
  active: "success",
  completed: "secondary",
  "on-hold": "warning",
} as const

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>(initialProjects)

  const handleAddProject = (project: Project) => {
    setProjects([project, ...projects])
  }

  return (
    <div className="container space-y-8 py-8">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <p className="text-lg text-muted-foreground">
            Manage and track your projects
          </p>
        </div>
        <NewProjectDialog onAddProject={handleAddProject} />
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Card key={project.id} className="flex flex-col">
            <CardHeader>
              <div className="flex items-center justify-between">
                <Badge variant={statusColors[project.status]}>
                  {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                </Badge>
                <FolderKanban className="h-5 w-5 text-muted-foreground" />
              </div>
              <CardTitle className="line-clamp-1">{project.name}</CardTitle>
              <CardDescription className="line-clamp-2">
                {project.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 mt-auto">
              <div className="flex items-center text-sm text-muted-foreground">
                <CalendarRange className="mr-2 h-4 w-4" />
                <span>
                  {formatDate(new Date(project.startDate))} -{" "}
                  {formatDate(new Date(project.endDate))}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}

        {projects.length === 0 && (
          <Card className="col-span-full flex h-[450px] items-center justify-center text-center">
            <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
              <LayoutDashboard className="h-12 w-12 text-muted-foreground/50" />
              <h3 className="mt-4 text-lg font-semibold">No projects created</h3>
              <p className="mb-4 mt-2 text-sm text-muted-foreground">
                You haven&apos;t created any projects yet. Start by creating a new project.
              </p>
              <NewProjectDialog onAddProject={handleAddProject} />
            </div>
          </Card>
        )}
      </div>
    </div>
  )
} 