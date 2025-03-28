import type { Project } from "@/app/api/projects/route"

export async function getProjects(): Promise<Project[]> {
  const res = await fetch("/api/projects")
  if (!res.ok) {
    throw new Error("Failed to fetch projects")
  }
  const data = await res.json()
  return data.projects
}

export async function getProject(id: string): Promise<Project> {
  const res = await fetch(`/api/projects/${id}`)
  if (!res.ok) {
    throw new Error("Failed to fetch project")
  }
  return res.json()
}

export async function createProject(data: Omit<Project, "id" | "createdAt" | "updatedAt">): Promise<Project> {
  const res = await fetch("/api/projects", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
  if (!res.ok) {
    throw new Error("Failed to create project")
  }
  return res.json()
}

export async function updateProject(
  id: string,
  data: Partial<Pick<Project, "title" | "description" | "type">>
): Promise<Project> {
  const res = await fetch(`/api/projects/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
  if (!res.ok) {
    throw new Error("Failed to update project")
  }
  return res.json()
}

export async function deleteProject(id: string): Promise<void> {
  const res = await fetch(`/api/projects/${id}`, {
    method: "DELETE",
  })
  if (!res.ok) {
    throw new Error("Failed to delete project")
  }
} 