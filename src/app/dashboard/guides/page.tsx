"use client"

import { Card } from '@/components/ui/card'
import { 
  Rocket, 
  Zap, 
  CheckCircle2, 
  Code2, 
  GraduationCap, 
  HelpCircle 
} from 'lucide-react'

export default function GuidesPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">Guides</h1>
      <p className="text-muted-foreground mb-6">Learn how to make the most of our platform</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            icon: <Rocket className="h-6 w-6 text-white" />,
            title: "Getting Started",
            description: "New to the platform? Start here for the basics.",
            articles: 12,
            readTime: 10,
            gradient: "from-emerald-500 to-teal-500"
          },
          {
            icon: <Zap className="h-6 w-6 text-white" />,
            title: "Advanced Features",
            description: "Deep dive into advanced functionality and features.",
            articles: 8,
            readTime: 15,
            gradient: "from-teal-500 to-amber-500"
          },
          {
            icon: <CheckCircle2 className="h-6 w-6 text-white" />,
            title: "Best Practices",
            description: "Learn recommended patterns and workflows.",
            articles: 15,
            readTime: 20,
            gradient: "from-amber-500 to-emerald-500"
          },
          {
            icon: <Code2 className="h-6 w-6 text-white" />,
            title: "API Documentation",
            description: "Comprehensive API guides and references.",
            articles: 20,
            readTime: 30,
            gradient: "from-emerald-500 to-teal-500"
          },
          {
            icon: <GraduationCap className="h-6 w-6 text-white" />,
            title: "Tutorials",
            description: "Step-by-step guides for common tasks.",
            articles: 10,
            readTime: 25,
            gradient: "from-teal-500 to-amber-500"
          },
          {
            icon: <HelpCircle className="h-6 w-6 text-white" />,
            title: "FAQs",
            description: "Answers to commonly asked questions.",
            articles: 25,
            readTime: 18,
            gradient: "from-amber-500 to-emerald-500"
          }
        ].map((guide, index) => (
          <Card key={guide.title} className="p-8 backdrop-blur-xl bg-white/10 border-white/20 hover:bg-white/20 transition-all duration-500 hover:scale-105">
            <div className={`h-12 w-12 rounded-lg bg-gradient-to-br ${guide.gradient} flex items-center justify-center mb-6`}>
              {guide.icon}
            </div>
            <h3 className="text-xl font-semibold mb-3">{guide.title}</h3>
            <p className="text-muted-foreground mb-4">
              {guide.description}
            </p>
            <div className="flex items-center text-muted-foreground">
              <span>{guide.articles} articles</span>
              <div className="ml-2 h-1 w-1 rounded-full bg-muted-foreground" />
              <span className="ml-2 text-sm">{guide.readTime} min read</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
} 