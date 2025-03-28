"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card"
import { 
  Zap,
  Code2,
  FileText,
  Image as ImageIcon,
  VideoIcon,
  MessageSquare,
  X,
  LucideIcon,
  Play
} from "lucide-react"
import { AnimatedBanner } from "@/components/quick-hits/AnimatedBanner";
import { SplitSection } from "@/components/quick-hits/SplitSection";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { SpinningRings } from "@/components/ui/icons/SpinningRings";

interface QuickHitItem {
  icon: LucideIcon;
  title: string;
  description: string;
  gradient: string;
  controls: React.ReactNode;
  output: React.ReactNode;
}

export default function QuickHitsPage() {
  const [selectedItem, setSelectedItem] = useState<QuickHitItem | null>(null);

  const quickHits: QuickHitItem[] = [
    {
      icon: Code2,
      title: "Code Snippets",
      description: "Generate code snippets and quick functions.",
      gradient: "from-emerald-500 to-teal-500",
      controls: (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Programming Language</Label>
            <Textarea placeholder="e.g., Python, JavaScript, TypeScript" />
          </div>
          <div className="space-y-2">
            <Label>Function Description</Label>
            <Textarea placeholder="Describe what the function should do" />
          </div>
        </div>
      ),
      output: (
        <div className="space-y-4">
          <Textarea 
            readOnly 
            placeholder="Generated code will appear here..."
            className="font-mono"
          />
        </div>
      )
    },
    {
      icon: FileText,
      title: "Quick Copy",
      description: "Generate marketing copy and short texts.",
      gradient: "from-teal-500 to-amber-500",
      controls: (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Topic</Label>
            <Textarea placeholder="What's the topic of your copy?" />
          </div>
          <div className="space-y-2">
            <Label>Tone</Label>
            <Textarea placeholder="e.g., Professional, Casual, Funny" />
          </div>
        </div>
      ),
      output: (
        <div className="space-y-4">
          <Textarea 
            readOnly 
            placeholder="Generated copy will appear here..."
          />
        </div>
      )
    },
    {
      icon: ImageIcon,
      title: "Image Ideas",
      description: "Quick image prompts and concepts.",
      gradient: "from-amber-500 to-emerald-500",
      controls: (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Prompt Description</Label>
            <Textarea placeholder="Describe the image concept" />
          </div>
        </div>
      ),
      output: (
        <div className="space-y-4">
          <Textarea 
            readOnly 
            placeholder="Generated image description will appear here..."
          />
        </div>
      )
    },
    {
      icon: VideoIcon,
      title: "Video Scripts",
      description: "Short video scripts and storyboards.",
      gradient: "from-emerald-500 to-teal-500",
      controls: (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Video Topic</Label>
            <Textarea placeholder="What's the topic of your video?" />
          </div>
        </div>
      ),
      output: (
        <div className="space-y-4">
          <Textarea 
            readOnly 
            placeholder="Generated video script will appear here..."
          />
        </div>
      )
    },
    {
      icon: MessageSquare,
      title: "Chat Replies",
      description: "Professional response templates.",
      gradient: "from-teal-500 to-amber-500",
      controls: (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>User Message</Label>
            <Textarea placeholder="Type your message here..." />
          </div>
        </div>
      ),
      output: (
        <div className="space-y-4">
          <Textarea 
            readOnly 
            placeholder="Generated reply will appear here..."
          />
        </div>
      )
    },
    {
      icon: Zap,
      title: "Quick Ideas",
      description: "Rapid brainstorming and ideation.",
      gradient: "from-amber-500 to-emerald-500",
      controls: (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Idea Description</Label>
            <Textarea placeholder="Describe your idea" />
          </div>
        </div>
      ),
      output: (
        <div className="space-y-4">
          <Textarea 
            readOnly 
            placeholder="Generated idea will appear here..."
          />
        </div>
      )
    }
  ];

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-2">Quick Hits</h1>
          <p className="text-muted-foreground">Fast, focused AI tools for rapid content generation</p>
        </div>
        {selectedItem && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSelectedItem(null)}
            className="rounded-full"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {selectedItem && (
        <AnimatedBanner
          icon={selectedItem.icon}
          title={selectedItem.title}
          description={selectedItem.description}
          gradient={selectedItem.gradient}
          isVisible={true}
          layoutId={`quick-hit-${selectedItem.title}`}
        />
      )}

      {selectedItem ? (
        <SplitSection
          title={selectedItem.title}
          controls={selectedItem.controls}
          output={selectedItem.output}
          generateButton={
            <Button 
              size="sm" 
              className="rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600"
            >
              <Play className="h-4 w-4 mr-2" />
              Generate
            </Button>
          }
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quickHits.map((item) => (
            <motion.div
              key={item.title}
              layoutId={`quick-hit-${item.title}`}
              onClick={() => setSelectedItem(item)}
              className="cursor-pointer"
            >
              <Card className="p-8 backdrop-blur-xl bg-white/10 border-white/20 hover:bg-white/20 transition-all duration-500 hover:scale-105">
                <motion.div 
                  layout="position"
                  className={`h-12 w-12 rounded-lg bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-6`}
                >
                  <motion.div layout="position">
                    <item.icon className="h-6 w-6 text-white" />
                  </motion.div>
                </motion.div>
                <motion.h3 layout="position" className="text-xl font-semibold mb-3">{item.title}</motion.h3>
                <motion.p layout="position" className="text-muted-foreground mb-4">
                  {item.description}
                </motion.p>
                <motion.div layout="position" className="flex items-center text-muted-foreground">
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