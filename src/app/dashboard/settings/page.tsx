export default function SettingsPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Settings</h1>
      <p className="mt-2 text-muted-foreground">Manage your account and preferences</p>
      
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border p-6">
          <h2 className="font-semibold">Profile Settings</h2>
          <p className="text-sm text-muted-foreground">Update your personal information and preferences</p>
        </div>
        <div className="rounded-lg border p-6">
          <h2 className="font-semibold">Account Settings</h2>
          <p className="text-sm text-muted-foreground">Manage your account security and notifications</p>
        </div>
        <div className="rounded-lg border p-6">
          <h2 className="font-semibold">Team Settings</h2>
          <p className="text-sm text-muted-foreground">Configure team permissions and roles</p>
        </div>
        <div className="rounded-lg border p-6">
          <h2 className="font-semibold">Billing Settings</h2>
          <p className="text-sm text-muted-foreground">Manage your subscription and billing information</p>
        </div>
      </div>
    </div>
  )
} 