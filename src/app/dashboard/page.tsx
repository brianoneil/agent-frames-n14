import { Metadata } from "next"
import { DashboardStats } from "@/components/dashboard/DashboardStats"
import { DashboardCharts } from "@/components/dashboard/DashboardCharts"
import { GlobalSalesMap } from "@/components/dashboard/GlobalSalesMap"
import { DashboardTasks } from "@/components/dashboard/DashboardTasks"

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Main dashboard overview of your application",
}

export default function DashboardPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="mt-2 text-muted-foreground">Welcome to your dashboard overview</p>
      
      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border p-4">
          <h2 className="font-semibold">Quick Stats</h2>
          <p className="text-sm text-muted-foreground">Overview of your activity</p>
        </div>
        <div className="rounded-lg border p-4">
          <h2 className="font-semibold">Recent Projects</h2>
          <p className="text-sm text-muted-foreground">Your latest work</p>
        </div>
        <div className="rounded-lg border p-4">
          <h2 className="font-semibold">Popular Templates</h2>
          <p className="text-sm text-muted-foreground">Most used templates</p>
        </div>
      </div>
    </div>
  )
} 