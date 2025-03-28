export default function TemplatesPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Templates</h1>
      <p className="mt-2 text-muted-foreground">Browse and manage your project templates</p>
      
      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border p-6">
          <h2 className="font-semibold">Web Application</h2>
          <p className="text-sm text-muted-foreground">Basic setup for web applications</p>
        </div>
        <div className="rounded-lg border p-6">
          <h2 className="font-semibold">Mobile App</h2>
          <p className="text-sm text-muted-foreground">Template for mobile applications</p>
        </div>
        <div className="rounded-lg border p-6">
          <h2 className="font-semibold">API Service</h2>
          <p className="text-sm text-muted-foreground">Backend API service template</p>
        </div>
      </div>
    </div>
  )
} 