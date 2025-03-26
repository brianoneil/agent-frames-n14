import { SiteConfig } from "@/types"

import { env } from "@/env.mjs"

export const siteConfig: SiteConfig = {
  name: "Agent Frames",
  author: "Agent Frames Team",
  description:
    "Transform Ideas into Production-Ready Projects with our AI-powered platform.",
  keywords: [
    "AI",
    "Project Management",
    "Technical Specifications",
    "Requirements Documentation",
    "Build Planning",
  ],
  url: {
    base: env.NEXT_PUBLIC_APP_URL,
    author: "https://agentframes.ai",
  },
  links: {
    github: "https://github.com/agentframes/agentframes",
  },
  ogImage: `${env.NEXT_PUBLIC_APP_URL}/og.jpg`,
}
