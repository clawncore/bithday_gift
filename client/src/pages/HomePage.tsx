import { motion } from "framer-motion";
import { Gift, Sparkles } from "lucide-react";
import { useLocation } from "wouter";

export default function HomePage() {
  const [, navigate] = useLocation();

  const handleOpenGift = (e: React.MouseEvent) => {
    e.preventDefault();
    // Navigate to the gift page with the panda word
    navigate("/?word=panda");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-pink-100 via-pink-50 to-rose-100 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-2xl w-full"
      >
        <motion.div
          animate={{
            rotate: [0, 5, -5, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            scale: {
              duration: 1.5,
              repeat: Infinity,
              repeatType: "reverse"
            }
          }}
          className="inline-block mb-8"
        >
          <div className="relative">
            <Gift className="w-24 h-24 text-pink-500" strokeWidth={1.5} />
            <Sparkles className="w-6 h-6 text-yellow-400 absolute -top-2 -right-2 animate-pulse" />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-pink-700"
        >
          Happy Birthday, <br />
          <span className="text-5xl md:text-7xl lg:text-8xl bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
            Chandrika!
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-pink-600 mb-12 font-medium"
        >
          A special birthday surprise awaits you — click below to unwrap! 🎁
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <button
            onClick={handleOpenGift}
            data-testid="button-open-gift-home"
            className="text-xl md:text-2xl px-12 py-6 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-pink-300"
          >
            Open Birthday Surprise
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-16 text-pink-500"
        >
          <Sparkles className="w-6 h-6 inline mx-2 animate-pulse" />
          <Sparkles className="w-6 h-6 inline mx-2 animate-pulse delay-300" />
          <Sparkles className="w-6 h-6 inline mx-2 animate-pulse delay-700" />
        </motion.div>
      </motion.div>
    </div>
  );
}