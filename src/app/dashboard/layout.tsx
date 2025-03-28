"use client"

import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  LayoutDashboard, 
  FolderKanban,
  FileCode,
  Activity,
  Settings,
  ChevronDown,
  BookOpen,
  MessageSquareCode,
  Zap
} from "lucide-react"
import Image from "next/image"

interface DashboardLayoutProps {
  children: React.ReactNode
}

interface NavItem {
  title: string
  href: string
  icon: React.ReactNode
  isExpandable?: boolean
  subItems?: { title: string; href: string }[]
}

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    title: "Quick Hits",
    href: "/dashboard/quick-hits",
    icon: <Zap className="h-5 w-5" />,
  },
  {
    title: "Projects",
    href: "/dashboard/projects",
    icon: <FolderKanban className="h-5 w-5" />,
  },
  {
    title: "Templates",
    href: "/dashboard/templates",
    icon: <FileCode className="h-5 w-5" />,
  },
  {
    title: "Prompts",
    href: "/dashboard/prompts",
    icon: <MessageSquareCode className="h-5 w-5" />,
  },
  {
    title: "Guides",
    href: "/dashboard/guides",
    icon: <BookOpen className="h-5 w-5" />,
  },
  {
    title: "Activity",
    href: "/dashboard/activity",
    icon: <Activity className="h-5 w-5" />,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: <Settings className="h-5 w-5" />,
  },
]

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname()

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-gradient-to-r from-zinc-900/95 to-zinc-800/90 backdrop-blur-sm text-white shadow-xl">
        {/* Logo/Brand Section */}
        <div className="flex h-16 items-center border-b border-white/10 px-6">
          <span className="text-lg font-semibold">CREATIVE TIM</span>
        </div>

        {/* User Profile Section */}
        <div className="flex items-center gap-3 border-b border-white/10 p-4">
          <div className="relative h-10 w-10 overflow-hidden rounded-full">
            <Image
              src="/avatar-placeholder.jpg"
              alt="User"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex items-center justify-between flex-1">
            <span className="text-sm">Chet Faker</span>
            <ChevronDown className="h-4 w-4 text-zinc-400" />
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const isActive = item.href === "/dashboard" 
                ? pathname === "/dashboard"
                : pathname.startsWith(item.href + "/") || pathname === item.href
              return (
                <li key={item.title} className="relative">
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center justify-between rounded-lg px-4 py-2 text-sm",
                      isActive 
                        ? "bg-white/10 text-white backdrop-blur-sm" 
                        : "text-zinc-400 hover:bg-white/5 hover:text-white",
                      "transition-all duration-200"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      {item.icon}
                      <span>{item.title}</span>
                    </div>
                    {item.isExpandable && (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </Link>
                  {isActive && (
                    <div className="absolute -right-4 top-1/2 h-0 w-0 -translate-y-1/2 border-8 border-transparent border-l-white/10" />
                  )}
                  {item.subItems && (
                    <ul className="ml-12 mt-2 space-y-2">
                      {item.subItems.map((subItem) => {
                        const isSubActive = pathname === subItem.href
                        return (
                          <li key={subItem.title} className="relative">
                            <Link
                              href={subItem.href}
                              className={cn(
                                "text-sm",
                                isSubActive 
                                  ? "text-white" 
                                  : "text-zinc-400 hover:text-white"
                              )}
                            >
                              {subItem.title}
                            </Link>
                            {isSubActive && (
                              <div className="absolute -right-4 top-1/2 h-0 w-0 -translate-y-1/2 border-8 border-transparent border-l-white/10" />
                            )}
                          </li>
                        )
                      })}
                    </ul>
                  )}
                </li>
              )
            })}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 pl-64">
        {children}
      </main>
    </div>
  )
} 