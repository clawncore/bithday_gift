import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Lock, Circle } from "lucide-react";
import { useEffect, useState } from "react";

interface LockoutScreenProps {
  openedAt: string;
}

export function LockoutScreen({ openedAt }: LockoutScreenProps) {
  const [shouldAnimate, setShouldAnimate] = useState(true);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setShouldAnimate(!prefersReducedMotion);
  }, []);

  const formattedDate = new Date(openedAt).toLocaleString("en-US", {
    dateStyle: "full",
    timeStyle: "short",
  });

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-b from-background via-background to-card">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl w-full text-center"
        data-testid="lockout-screen"
      >
        <motion.div
          className="mb-8 inline-block"
          animate={shouldAnimate ? { rotate: [0, 15, -15, 0] } : {}}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <Circle className="w-36 h-36 text-primary" fill="currentColor" strokeWidth={0} />
        </motion.div>

        <Card className="backdrop-blur-md bg-card/50 border-card-border">
          <CardContent className="p-12">
            <div className="mb-6">
              <Lock className="w-16 h-16 mx-auto text-muted-foreground" strokeWidth={1.5} />
            </div>

            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4 text-foreground">
              This gift was opened
            </h1>

            <p className="text-lg text-muted-foreground mb-2">on</p>

            <p className="text-xl font-medium text-foreground mb-8">{formattedDate}</p>

            <div className="border-t border-border pt-8">
              <p className="text-lg text-muted-foreground italic">
                Thank you for seeing this.
              </p>
            </div>
          </CardContent>
        </Card>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-8 text-sm text-muted-foreground"
        >
          This was a one-time gift, opened with love.
        </motion.p>
      </motion.div>
    </div>
  );
}
