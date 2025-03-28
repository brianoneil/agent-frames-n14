import { motion, AnimatePresence } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface AnimatedBannerProps {
  icon: LucideIcon;
  title: string;
  description: string;
  gradient: string;
  isVisible: boolean;
  layoutId: string;
}

export function AnimatedBanner({ icon: Icon, title, description, gradient, isVisible, layoutId }: AnimatedBannerProps) {
  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          layoutId={layoutId}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 25,
            mass: 0.8,
            duration: 0.5
          }}
          className="w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg p-6 mb-6"
        >
          <div className="flex items-center gap-4">
            <motion.div 
              layout="position"
              className={`h-12 w-12 rounded-lg bg-gradient-to-br ${gradient} flex items-center justify-center`}
            >
              <motion.div layout="position">
                <Icon className="h-6 w-6 text-white" />
              </motion.div>
            </motion.div>
            <motion.div layout="position">
              <motion.h2 layout="position" className="text-2xl font-semibold">{title}</motion.h2>
              <motion.p layout="position" className="text-muted-foreground">{description}</motion.p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 