export default function ActivityPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Activity</h1>
      <p className="mt-2 text-muted-foreground">Track your recent actions and updates</p>
      
      <div className="mt-8 space-y-4">
        <div className="rounded-lg border p-6">
          <h2 className="font-semibold">Recent Activity</h2>
          <div className="mt-4 space-y-4">
            <div className="flex items-center gap-4">
              <div className="h-2 w-2 rounded-full bg-green-500" />
              <div>
                <p className="text-sm font-medium">Project Created</p>
                <p className="text-sm text-muted-foreground">New project "Website Redesign" created</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-2 w-2 rounded-full bg-blue-500" />
              <div>
                <p className="text-sm font-medium">Template Updated</p>
                <p className="text-sm text-muted-foreground">Mobile App template was updated</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-2 w-2 rounded-full bg-yellow-500" />
              <div>
                <p className="text-sm font-medium">Settings Changed</p>
                <p className="text-sm text-muted-foreground">Profile settings were updated</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 