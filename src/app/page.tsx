import Link from "next/link"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Icons } from "@/components/icons"

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/20 via-teal-600/20 to-amber-600/20 -z-10 animate-gradient-shift" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] -z-10 opacity-30" />
      
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-emerald-500/20 rounded-full blur-3xl animate-glow" />
        <div className="absolute top-3/4 right-1/4 w-[300px] h-[300px] bg-teal-500/20 rounded-full blur-3xl animate-glow [animation-delay:2s]" />
        <div className="absolute top-1/2 left-2/3 w-[350px] h-[350px] bg-amber-500/20 rounded-full blur-3xl animate-glow [animation-delay:4s]" />
      </div>

      {/* Hero Section */}
      <div className="relative">
        <div className="container mx-auto px-4 pt-24 pb-32">
          <div className="text-center relative">
            <h1 className="text-4xl md:text-7xl font-bold mb-6 pb-2 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-teal-400 to-amber-400 animate-gradient-shift leading-[1.1]">
              Agent Frames
            </h1>
            <p className="text-2xl font-semibold text-emerald-400 mb-4 opacity-0 animate-slide-up [animation-delay:100ms]">
              Transform Ideas into Production-Ready Projects
            </p>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto opacity-0 animate-slide-up [animation-delay:200ms]">
              Our AI-powered platform turns your project ideas into comprehensive development frameworks, from pitch decks to technical specifications and phased build plans.
            </p>
            <div className="flex justify-center gap-4 opacity-0 animate-slide-up [animation-delay:400ms]">
              <Link href="#" className={cn(
                buttonVariants({ size: "lg" }),
                "bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105"
              )}>
                Get Started
              </Link>
              <Link href="/dashboard" className={cn(
                buttonVariants({ size: "lg", variant: "outline" }),
                "border-white/20 backdrop-blur-xl bg-white/10 hover:bg-white/20"
              )}>
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-24">
        <h2 className="text-3xl font-bold text-center mb-12 opacity-0 animate-slide-up [animation-delay:500ms]">
          Complete Project Framework Generation
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Icons.idea className="h-6 w-6 text-white" />}
            title="Idea Enhancement"
            description="Optional AI-powered refinement of your initial concept, ensuring clarity and completeness before framework generation."
            gradient="from-emerald-500 to-teal-500"
            delay="600ms"
          />
          <FeatureCard
            icon={<Icons.presentation className="h-6 w-6 text-white" />}
            title="Pitch Deck Generation"
            description="Compelling slide ideas and presentation frameworks to effectively communicate your project vision to stakeholders."
            gradient="from-teal-500 to-amber-500"
            delay="700ms"
          />
          <FeatureCard
            icon={<Icons.document className="h-6 w-6 text-white" />}
            title="Structured Requirements"
            description="Hierarchical, numbered requirements documentation with clear categorization and cross-referencing capabilities."
            gradient="from-amber-500 to-emerald-500"
            delay="800ms"
          />
          <FeatureCard
            icon={<Icons.code className="h-6 w-6 text-white" />}
            title="Technical Design"
            description="Automated identification of areas requiring technical specification, with on-demand generation of detailed design documents."
            gradient="from-emerald-500 to-teal-500"
            delay="900ms"
          />
          <FeatureCard
            icon={<Icons.build className="h-6 w-6 text-white" />}
            title="Agentic Build Planning"
            description="Phased implementation roadmap with effort estimation points, optimized for Agentic AI development workflows."
            gradient="from-teal-500 to-amber-500"
            delay="1000ms"
          />
          <FeatureCard
            icon={<Icons.product className="h-6 w-6 text-white" />}
            title="Product Requirements"
            description="Comprehensive PRD generation that translates technical requirements into clear product specifications and user stories."
            gradient="from-amber-500 to-emerald-500"
            delay="1100ms"
          />
        </div>
      </div>

      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </div>
  )
}

function FeatureCard({
  icon,
  title,
  description,
  gradient,
  delay,
}: {
  icon: React.ReactNode
  title: string
  description: string
  gradient: string
  delay: string
}) {
  return (
    <Card className={`p-8 backdrop-blur-xl bg-white/10 border-white/20 hover:bg-white/20 transition-all duration-500 hover:scale-105 opacity-0 animate-slide-up [animation-delay:${delay}]`}>
      <div className={`h-12 w-12 rounded-lg bg-gradient-to-br ${gradient} flex items-center justify-center mb-6`}>
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-muted-foreground">
        {description}
      </p>
    </Card>
  )
}
