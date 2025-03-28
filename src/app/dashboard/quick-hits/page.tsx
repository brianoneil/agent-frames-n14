import { Card } from "@/components/ui/card"
import { 
  Zap,
  Code2,
  FileText,
  Image as ImageIcon,
  VideoIcon,
  MessageSquare
} from "lucide-react"

export default function QuickHitsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">Quick Hits</h1>
      <p className="text-muted-foreground mb-6">Fast, focused AI tools for rapid content generation</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            icon: <Code2 className="h-6 w-6 text-white" />,
            title: "Code Snippets",
            description: "Generate code snippets and quick functions.",
            gradient: "from-emerald-500 to-teal-500"
          },
          {
            icon: <FileText className="h-6 w-6 text-white" />,
            title: "Quick Copy",
            description: "Generate marketing copy and short texts.",
            gradient: "from-teal-500 to-amber-500"
          },
          {
            icon: <ImageIcon className="h-6 w-6 text-white" />,
            title: "Image Ideas",
            description: "Quick image prompts and concepts.",
            gradient: "from-amber-500 to-emerald-500"
          },
          {
            icon: <VideoIcon className="h-6 w-6 text-white" />,
            title: "Video Scripts",
            description: "Short video scripts and storyboards.",
            gradient: "from-emerald-500 to-teal-500"
          },
          {
            icon: <MessageSquare className="h-6 w-6 text-white" />,
            title: "Chat Replies",
            description: "Professional response templates.",
            gradient: "from-teal-500 to-amber-500"
          },
          {
            icon: <Zap className="h-6 w-6 text-white" />,
            title: "Quick Ideas",
            description: "Rapid brainstorming and ideation.",
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
              <span className="text-sm">Generate Now →</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
} 