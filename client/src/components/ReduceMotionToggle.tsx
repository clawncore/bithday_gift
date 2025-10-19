import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Zap, ZapOff } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function ReduceMotionToggle() {
  const [motionReduced, setMotionReduced] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setMotionReduced(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setMotionReduced(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  const toggleMotion = () => {
    const newValue = !motionReduced;
    setMotionReduced(newValue);

    if (newValue) {
      document.documentElement.style.setProperty("--animation-duration", "0.01ms");
    } else {
      document.documentElement.style.removeProperty("--animation-duration");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 2.2 }}
      className="fixed bottom-6 left-6 z-40"
    >
      <Button
        size="icon"
        variant="outline"
        onClick={toggleMotion}
        data-testid="button-motion-toggle"
        className="rounded-full w-14 h-14 bg-card/80 backdrop-blur-md border-border hover-elevate active-elevate-2 shadow-lg"
        aria-label={motionReduced ? "Enable animations" : "Reduce animations"}
      >
        <AnimatePresence mode="wait">
          {motionReduced ? (
            <motion.div
              key="reduced"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ duration: 0.2 }}
            >
              <ZapOff className="w-5 h-5" />
            </motion.div>
          ) : (
            <motion.div
              key="normal"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ duration: 0.2 }}
            >
              <Zap className="w-5 h-5" />
            </motion.div>
          )}
        </AnimatePresence>
      </Button>
    </motion.div>
  );
}
