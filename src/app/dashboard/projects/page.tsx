export default function ProjectsPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Projects</h1>
      <p className="mt-2 text-muted-foreground">Manage your projects and collaborations</p>
      
      <div className="mt-8 grid gap-4">
        <div className="rounded-lg border p-6">
          <h2 className="font-semibold">Project List</h2>
          <p className="text-sm text-muted-foreground">Your active and archived projects will appear here</p>
        </div>
      </div>
    </div>
  )
} 