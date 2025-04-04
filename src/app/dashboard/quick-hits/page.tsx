"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card"
import { 
  Sparkles,
  ClipboardList,
  ListChecks,
  Palette,
  Presentation,
  Wrench,
  X,
  LucideIcon,
  Play,
  Bold,
  Italic,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Code,
  Quote
} from "lucide-react"
import { AnimatedBanner } from "@/components/quick-hits/AnimatedBanner";
import { SplitSection } from "@/components/quick-hits/SplitSection";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { SpinningRings } from "@/components/ui/icons/SpinningRings";
import ReactMarkdown from 'react-markdown';
import { LoadingOverlay } from "@/components/ui/loading-overlay-rings";

function IdeaCleanUp() {
  const [ideaContent, setIdeaContent] = useState("");
  const [refinedContent, setRefinedContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sampleIdeas = [
    {
      title: "Social Media App",
      content: `# BookConnect: Social Reading Platform

## Core Concept
A social media platform that transforms reading from a solitary activity into a shared experience by connecting readers based on their literary preferences and reading habits.

## Key Features
* Real-time book progress sharing with friends
* Highlight and share favorite quotes directly from e-books
* Form book clubs with integrated video discussions
* AI-powered book recommendations based on reading history

## Target Audience
* Avid readers aged 18-45
* Book club organizers
* Literature students and teachers
* Reading challenge participants

## Technical Considerations
- Integration with major e-reader platforms
- Privacy controls for sharing reading activity
- Social graph management for reader connections
- Mobile-first design with offline capabilities`
    },
    {
      title: "Fitness Tracker",
      content: `# QuestFit: RPG Fitness Adventure

## Overview
Transform daily workouts into an epic RPG adventure where every exercise contributes to character progression and unlocks new quests and achievements.

## Game Mechanics
* Character classes based on workout preferences
  - Warrior (Strength Training)
  - Ranger (Cardio)
  - Monk (Flexibility/Yoga)
  - Paladin (Mixed Fitness)

## Progression System
1. Experience points from completed workouts
2. Skill trees for different exercise types
3. Daily quests and seasonal events
4. Guild system for group challenges

## Health Integration
- Heart rate monitoring for quest difficulty scaling
- Sleep tracking affects character energy
- Nutrition logging for bonus attributes
- Recovery periods as story elements`
    },
    {
      title: "Recipe Manager",
      content: `# SmartChef: AI Kitchen Assistant

## Primary Features
* Intelligent Inventory Management
  * Automatic fridge inventory using smart cameras
  * Expiration date tracking
  * Shopping list generation

## Recipe Intelligence
* Dynamic recipe adaptation based on:
  * Available ingredients
  * Dietary restrictions
  * Cooking skill level
  * Kitchen equipment

## Meal Planning
* Weekly meal suggestions based on:
  - Nutritional goals
  - Time constraints
  - Seasonal ingredients
  - Budget considerations

## Smart Kitchen Integration
* Connected device control
* Step-by-step cooking guidance
* Voice-activated recipe navigation
* Real-time cooking tips and substitutions`
    }
  ];

  const handleSampleClick = (content: string) => {
    setIdeaContent(content);
  };

  const handleGenerate = async () => {
    if (!ideaContent.trim()) {
      setError("Please enter an idea to refine");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/quick-hits/idea-cleanup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idea: ideaContent }),
      });

      if (!response.ok) {
        throw new Error('Failed to refine idea');
      }

      const data = await response.json();
      console.log('API Response:', {
        output: data.output,
        timestamp: data.timestamp,
        message: data.message
      });
      setRefinedContent(data.output);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative h-[calc(100vh-16rem)]">
      {isLoading && <LoadingOverlay isLoading={isLoading} />}
      <SplitSection
        title="Idea Clean Up"
        controls={
          <div className="flex flex-col h-full">
            <Label className="mb-2">Your Idea</Label>
            <div className="mb-3 flex flex-wrap gap-2">
              <p className="text-sm text-muted-foreground mb-2 w-full">Try these sample ideas:</p>
              {sampleIdeas.map((idea) => (
                <Button
                  key={idea.title}
                  variant="outline"
                  size="sm"
                  className="text-xs"
                  onClick={() => handleSampleClick(idea.content)}
                >
                  {idea.title}
                </Button>
              ))}
            </div>
            <div className="flex-1 min-h-0">
              <Textarea
                value={ideaContent}
                onChange={(e) => setIdeaContent(e.target.value)}
                className="h-full resize-none bg-gray-900/90 text-white placeholder:text-gray-400 font-mono text-sm"
                placeholder="Write your idea here..."
              />
            </div>
            {error && (
              <p className="text-red-500 text-sm mt-2">{error}</p>
            )}
          </div>
        }
        output={
          <div className="flex flex-col h-full">
            <Label className="mb-2">Refined Idea</Label>
            <div className="flex-1 min-h-0 bg-gray-900/90 rounded-lg p-4 overflow-auto">
              <div className="prose prose-sm max-w-none prose-invert">
                <ReactMarkdown
                  components={{
                    h1: ({ children }) => <h1 className="text-lg font-bold mb-2 text-white">{children}</h1>,
                    h2: ({ children }) => <h2 className="text-base font-semibold mb-1.5 text-white">{children}</h2>,
                    p: ({ children }) => <p className="text-xs mb-2 text-gray-200 leading-relaxed">{children}</p>,
                    ul: ({ children }) => <ul className="list-disc pl-4 mb-2 text-xs text-gray-200 space-y-0.5">{children}</ul>,
                    li: ({ children, className }) => {
                      if (className?.includes('task-list-item')) {
                        return (
                          <li className="flex items-center gap-1.5 mb-0.5">
                            <input 
                              type="checkbox" 
                              checked={className.includes('checked')}
                              readOnly
                              className="rounded border-gray-600 bg-gray-800 checked:bg-emerald-500"
                            />
                            <span>{children}</span>
                          </li>
                        );
                      }
                      return <li className="mb-0.5">{children}</li>;
                    },
                  }}
                >
                  {refinedContent}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        }
        generateButton={
          <Button 
            size="sm" 
            className="rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600"
            onClick={handleGenerate}
            disabled={isLoading}
          >
            {isLoading ? (
              <SpinningRings className="h-4 w-4 mr-2" />
            ) : (
              <Sparkles className="h-4 w-4 mr-2" />
            )}
            {isLoading ? 'Generating...' : 'Generate'}
          </Button>
        }
      />
    </div>
  );
}

interface QuickHitItem {
  icon: LucideIcon;
  title: string;
  description: string;
  gradient: string;
  component: React.ReactNode;
}

export default function QuickHitsPage() {
  const [selectedItem, setSelectedItem] = useState<QuickHitItem | null>(null);

  const quickHits: QuickHitItem[] = [
    {
      icon: Sparkles,
      title: "Idea Clean Up",
      description: "Refine and polish your initial ideas into clear concepts.",
      gradient: "from-emerald-500 to-teal-500",
      component: <IdeaCleanUp />
    },
    {
      icon: ClipboardList,
      title: "Idea to Build Plan",
      description: "Transform your idea into a structured development plan.",
      gradient: "from-teal-500 to-amber-500",
      component: (
        <SplitSection
          title="Idea to Build Plan"
          controls={
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Project Overview</Label>
                <Textarea placeholder="Describe your project idea" />
              </div>
              <div className="space-y-2">
                <Label>Technical Requirements</Label>
                <Textarea placeholder="Any specific technical needs or constraints?" />
              </div>
            </div>
          }
          output={
            <div className="space-y-4">
              <Textarea 
                readOnly 
                placeholder="Development plan will appear here..."
              />
            </div>
          }
          generateButton={
            <Button 
              size="sm" 
              className="rounded-full bg-gradient-to-br from-teal-500 to-amber-500 hover:from-teal-600 hover:to-amber-600"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Generate
            </Button>
          }
        />
      )
    },
    {
      icon: ListChecks,
      title: "Idea to Feature List",
      description: "Break down your idea into detailed feature specifications.",
      gradient: "from-amber-500 to-emerald-500",
      component: (
        <SplitSection
          title="Idea to Feature List"
          controls={
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Product Description</Label>
                <Textarea placeholder="Describe your product or service" />
              </div>
              <div className="space-y-2">
                <Label>Core Functionality</Label>
                <Textarea placeholder="What are the main things it should do?" />
              </div>
            </div>
          }
          output={
            <div className="space-y-4">
              <Textarea 
                readOnly 
                placeholder="Feature list will appear here..."
              />
            </div>
          }
          generateButton={
            <Button 
              size="sm" 
              className="rounded-full bg-gradient-to-br from-amber-500 to-emerald-500 hover:from-amber-600 hover:to-emerald-600"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Generate
            </Button>
          }
        />
      )
    },
    {
      icon: Palette,
      title: "Design Help",
      description: "Get guidance on UI/UX design and visual direction.",
      gradient: "from-emerald-500 to-teal-500",
      component: (
        <SplitSection
          title="Design Help"
          controls={
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Design Context</Label>
                <Textarea placeholder="What are you trying to design?" />
              </div>
              <div className="space-y-2">
                <Label>Style Preferences</Label>
                <Textarea placeholder="Any specific style or brand guidelines?" />
              </div>
            </div>
          }
          output={
            <div className="space-y-4">
              <Textarea 
                readOnly 
                placeholder="Design recommendations will appear here..."
              />
            </div>
          }
          generateButton={
            <Button 
              size="sm" 
              className="rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Generate
            </Button>
          }
        />
      )
    },
    {
      icon: Presentation,
      title: "Idea to Pitch Deck",
      description: "Create compelling pitch deck content from your idea.",
      gradient: "from-teal-500 to-amber-500",
      component: (
        <SplitSection
          title="Idea to Pitch Deck"
          controls={
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Business Idea</Label>
                <Textarea placeholder="Describe your business idea" />
              </div>
              <div className="space-y-2">
                <Label>Target Market</Label>
                <Textarea placeholder="Who is your target market?" />
              </div>
            </div>
          }
          output={
            <div className="space-y-4">
              <Textarea 
                readOnly 
                placeholder="Pitch deck content will appear here..."
              />
            </div>
          }
          generateButton={
            <Button 
              size="sm" 
              className="rounded-full bg-gradient-to-br from-teal-500 to-amber-500 hover:from-teal-600 hover:to-amber-600"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Generate
            </Button>
          }
        />
      )
    },
    {
      icon: Wrench,
      title: "Feature Refinement",
      description: "Polish and improve existing feature specifications.",
      gradient: "from-amber-500 to-emerald-500",
      component: (
        <SplitSection
          title="Feature Refinement"
          controls={
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Current Feature</Label>
                <Textarea placeholder="Describe the feature you want to refine" />
              </div>
              <div className="space-y-2">
                <Label>Improvement Goals</Label>
                <Textarea placeholder="What aspects need improvement?" />
              </div>
            </div>
          }
          output={
            <div className="space-y-4">
              <Textarea 
                readOnly 
                placeholder="Refined feature will appear here..."
              />
            </div>
          }
          generateButton={
            <Button 
              size="sm" 
              className="rounded-full bg-gradient-to-br from-amber-500 to-emerald-500 hover:from-amber-600 hover:to-emerald-600"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Generate
            </Button>
          }
        />
      )
    }
  ];

  return (
    <div className="p-6">
      {!selectedItem && (
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-2">Quick Hits</h1>
            <p className="text-muted-foreground">Fast, focused AI tools for rapid content generation</p>
          </div>
        </div>
      )}

      {selectedItem && (
        <AnimatedBanner
          icon={selectedItem.icon}
          title={selectedItem.title}
          description={selectedItem.description}
          gradient={selectedItem.gradient}
          isVisible={true}
          layoutId={`quick-hit-${selectedItem.title}`}
          onClose={() => setSelectedItem(null)}
        />
      )}

      {selectedItem ? (
        selectedItem.component
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quickHits.map((item) => (
            <motion.div
              key={item.title}
              layoutId={`quick-hit-${item.title}`}
              onClick={() => setSelectedItem(item)}
              className="cursor-pointer h-full"
            >
              <Card className="p-8 backdrop-blur-xl bg-white/10 border-white/20 hover:bg-white/20 transition-all duration-500 hover:scale-105 h-full flex flex-col">
                <motion.div 
                  layout="position"
                  className={`h-12 w-12 rounded-lg bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-6`}
                >
                  <motion.div layout="position">
                    <item.icon className="h-6 w-6 text-white" />
                  </motion.div>
                </motion.div>
                <motion.h3 layout="position" className="text-xl font-semibold mb-3">{item.title}</motion.h3>
                <motion.p layout="position" className="text-muted-foreground mb-4 flex-grow">
                  {item.description}
                </motion.p>
                <motion.div layout="position" className="flex items-center text-muted-foreground mt-auto">
                  <span className="text-sm">Generate Now →</span>
                </motion.div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
} 