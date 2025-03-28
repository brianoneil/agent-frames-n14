import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Play, 
  Copy, 
  Download, 
  RefreshCw,
  Settings,
  Share2
} from "lucide-react";

interface SplitSectionProps {
  title: string;
  controls: React.ReactNode;
  output: React.ReactNode;
  generateButton: React.ReactNode;
}

export function SplitSection({ title, controls, output, generateButton }: SplitSectionProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-16rem)]">
      <Card className="p-6 flex flex-col backdrop-blur-xl bg-white/10 border-white/20">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <div className="flex items-center gap-2">
            {generateButton}
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
              <Settings className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="flex-1 space-y-4 overflow-y-auto">
          {controls}
        </div>
      </Card>
      
      <Card className="p-6 flex flex-col backdrop-blur-xl bg-white/10 border-white/20">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Output</h3>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
              <Copy className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
              <Download className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="flex-1 space-y-4 overflow-y-auto">
          {output}
        </div>
      </Card>
    </div>
  );
} 