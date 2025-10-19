import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Sparkles, Heart } from "lucide-react";

export function ConfettiEffect() {
  const [confetti, setConfetti] = useState<Array<{ id: number; x: number; delay: number; type: "sparkle" | "heart" }>>([]);
  const [shouldAnimate, setShouldAnimate] = useState(true);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setShouldAnimate(false);
      return;
    }

    const items = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 2,
      type: Math.random() > 0.5 ? "sparkle" : "heart" as "sparkle" | "heart",
    }));
    setConfetti(items);

    const timer = setTimeout(() => {
      setConfetti([]);
    }, 6000);

    return () => clearTimeout(timer);
  }, []);

  if (!shouldAnimate) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden" aria-hidden="true">
      {confetti.map((item) => (
        <motion.div
          key={item.id}
          initial={{ y: -100, x: `${item.x}vw`, rotate: 0, opacity: 1 }}
          animate={{
            y: window.innerHeight + 100,
            rotate: 720,
            opacity: 0,
          }}
          transition={{
            duration: 4,
            delay: item.delay,
            ease: "linear",
          }}
          className="absolute"
          style={{ left: `${item.x}%` }}
        >
          {item.type === "sparkle" ? (
            <Sparkles className="w-8 h-8 text-primary" />
          ) : (
            <Heart className="w-8 h-8 text-primary" fill="currentColor" />
          )}
        </motion.div>
      ))}
    </div>
  );
}
