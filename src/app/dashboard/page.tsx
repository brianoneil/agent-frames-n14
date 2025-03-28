import { UserButton } from "@clerk/nextjs"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

async function getProjects() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/projects`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: 'no-store',
    })

    if (!response.ok) {
      throw new Error("Failed to fetch projects")
    }

    return response.json()
  } catch (error) {
    console.error("Error fetching projects:", error)
    return { projects: [] }
  }
}

export default async function DashboardPage() {
  const { userId } = await auth()

  if (!userId) {
    console.log("🔍 No user found in dashboard, redirecting to sign-in")
    redirect("/sign-in")
    return null
  }

  console.log("🔍 Loading dashboard for user", { userId })
  const { projects } = await getProjects()

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between px-4">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <UserButton afterSignOutUrl="/sign-in" />
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto py-8 px-4">
        <div className="grid gap-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Your Projects</h2>
            {/* Add project button can be added here */}
          </div>

          {/* Projects Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects?.map((project: any) => (
              <div
                key={project.id}
                className="rounded-lg border bg-card p-6 shadow-sm"
              >
                <h3 className="font-semibold">{project.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {project.description}
                </p>
                <div className="mt-4 flex items-center gap-2">
                  <span className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                    {project.type}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Created {new Date(project.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}

            {(!projects || projects.length === 0) && (
              <p className="col-span-full text-center text-muted-foreground">
                No projects found. Create your first project to get started!
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  )
} 