import { cn } from "@/lib/utils";

export function LoadingOverlay({ className }: { className?: string }) {
  return (
    <div className={cn(
      "absolute inset-0 bg-gray-900/70 backdrop-blur-md z-50 flex items-center justify-center overflow-hidden",
      className
    )}>
      {/* Animated orbs */}
      <div className="relative w-full h-full">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-emerald-500/30 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-teal-500/30 rounded-full blur-xl animate-pulse [animation-delay:500ms]" />
        <div className="absolute top-1/2 left-1/2 w-28 h-28 bg-amber-500/30 rounded-full blur-xl animate-pulse [animation-delay:1000ms]" />
      </div>
      
      {/* Loading text */}
      <div className="absolute text-white/90 text-sm font-medium">
        Processing...
      </div>
    </div>
  );
} 