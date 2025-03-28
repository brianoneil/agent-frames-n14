import { Card } from "@/components/ui/card"
import { 
  MessageSquareCode, 
  Sparkles, 
  Brain,
  Target,
  Workflow,
  History
} from "lucide-react"

export default function PromptsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">Prompts</h1>
      <p className="text-muted-foreground mb-6">Manage and customize your AI prompts</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            icon: <MessageSquareCode className="h-6 w-6 text-white" />,
            title: "Custom Prompts",
            description: "Create and manage your personalized prompts.",
            count: 8,
            gradient: "from-emerald-500 to-teal-500"
          },
          {
            icon: <Sparkles className="h-6 w-6 text-white" />,
            title: "Featured Templates",
            description: "Pre-built prompts for common use cases.",
            count: 12,
            gradient: "from-teal-500 to-amber-500"
          },
          {
            icon: <Brain className="h-6 w-6 text-white" />,
            title: "AI Assistants",
            description: "Specialized AI agents for different tasks.",
            count: 5,
            gradient: "from-amber-500 to-emerald-500"
          },
          {
            icon: <Target className="h-6 w-6 text-white" />,
            title: "Goals & Objectives",
            description: "Task-specific prompt configurations.",
            count: 15,
            gradient: "from-emerald-500 to-teal-500"
          },
          {
            icon: <Workflow className="h-6 w-6 text-white" />,
            title: "Workflows",
            description: "Multi-step prompt sequences and chains.",
            count: 6,
            gradient: "from-teal-500 to-amber-500"
          },
          {
            icon: <History className="h-6 w-6 text-white" />,
            title: "History",
            description: "View and reuse your past prompts.",
            count: 24,
            gradient: "from-amber-500 to-emerald-500"
          }
        ].map((item) => (
          <Card key={item.title} className="p-8 backdrop-blur-xl bg-white/10 border-white/20 hover:bg-white/20 transition-all duration-500 hover:scale-105">
            <div className={`h-12 w-12 rounded-lg bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-6`}>
              {item.icon}
            </div>
            <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
            <p className="text-muted-foreground mb-4">
              {item.description}
            </p>
            <div className="flex items-center text-muted-foreground">
              <span>{item.count} items</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
} 