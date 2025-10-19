import { motion, useScroll, useTransform } from "framer-motion";
import { Gift, ChevronDown, Sparkles, Flower } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

interface HeroGiftBoxProps {
  onUnwrap: () => void;
  unwrapped: boolean;
}

export function HeroGiftBox({ onUnwrap, unwrapped }: HeroGiftBoxProps) {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.8]);
  const [showDecorations, setShowDecorations] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowDecorations(true), 1000);
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setShouldAnimate(!prefersReducedMotion);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.section
      style={{ opacity, scale }}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-pink-100 via-pink-50 to-rose-100"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 opacity-10">
          {showDecorations && shouldAnimate && (
            <>
              <Flower className="absolute top-20 left-10 w-16 h-16 text-pink-400 animate-float" style={{ animationDelay: "0s" }} />
              <Sparkles className="absolute top-40 right-20 w-12 h-12 text-yellow-400 animate-float" style={{ animationDelay: "1s" }} />
              <Flower className="absolute bottom-32 left-1/4 w-14 h-14 text-rose-400 animate-float" style={{ animationDelay: "2s" }} />
              <Sparkles className="absolute top-1/3 right-1/4 w-10 h-10 text-yellow-300 animate-float" style={{ animationDelay: "0.5s" }} />
              <Flower className="absolute bottom-1/3 left-1/3 w-12 h-12 text-pink-300 animate-float" style={{ animationDelay: "1.5s" }} />
            </>
          )}
        </div>
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-8"
        >
          {!unwrapped ? (
            <div className="inline-block mb-8 pulse-glow rounded-full p-8 bg-pink-200/30">
              <Gift className="w-24 h-24 text-pink-600" strokeWidth={1.5} />
            </div>
          ) : (
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, type: "spring" }}
              className="mb-4"
            >
              <Gift className="w-32 h-32 text-pink-600" strokeWidth={1.5} />
            </motion.div>
          )}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-pink-700"
        >
          Happy Birthday, Chandrika! 🎂
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-lg md:text-xl text-pink-600 mb-12 font-medium"
        >
          A special birthday surprise just for you — please unwrap! 🎁
        </motion.p>

        {!unwrapped && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
          >
            <Button
              size="lg"
              onClick={onUnwrap}
              data-testid="button-open-gift"
              className="text-lg px-12 py-6 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Unwrap Birthday Surprise
            </Button>
          </motion.div>
        )}

        {!unwrapped && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2"
          >
            <ChevronDown className="w-8 h-8 text-pink-500 animate-bounce" />
          </motion.div>
        )}
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-pink-100/80 to-transparent"></div>
      </div>
    </motion.section>
  );
}