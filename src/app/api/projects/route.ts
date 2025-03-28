import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import { z } from "zod"

// Validation schema for project creation
const createProjectSchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().min(1).max(500),
  type: z.enum(["idea", "technical", "product"]),
})

// Type for project data
export type Project = {
  id: string
  userId: string
  title: string
  description: string
  type: "idea" | "technical" | "product"
  createdAt: string
  updatedAt: string
}

// In-memory store for development (replace with your database)
let projects: Project[] = []

export async function GET() {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const userProjects = projects.filter(p => p.userId === userId)
    return NextResponse.json(
      { projects: userProjects },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    )
  }
}

export async function POST(req: Request) {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const json = await req.json()
    const body = createProjectSchema.parse(json)

    const project: Project = {
      id: crypto.randomUUID(),
      userId,
      title: body.title,
      description: body.description,
      type: body.type,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    projects.push(project)

    return NextResponse.json(project, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid request data", details: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    )
  }
} 