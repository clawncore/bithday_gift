import { motion } from "framer-motion";
import { Gift, Sparkles } from "lucide-react";
import { useLocation } from "wouter";
import { FallingElements } from "@/components/FallingElements";

export default function HomePage() {
  const [, navigate] = useLocation();

  const handleOpenGift = (e: React.MouseEvent) => {
    e.preventDefault();
    // Navigate to the gift page with the panda word
    navigate("/?word=panda");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-pink-100 via-pink-50 to-rose-100 px-4">
      {/* Falling elements for magical entrance effect */}
      <FallingElements duration={12000} elementCount={30} />

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
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="font-serif text-5xl md:text-7xl font-bold mb-6 text-pink-700"
        >
          Happy Birthday, Chandrika! 🎂
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-lg md:text-xl text-pink-600 mb-8 font-medium"
        >
          A special birthday surprise just for you — please unwrap! 🎁
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mb-8"
        >
          <button
            onClick={handleOpenGift}
            className="px-8 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full hover:from-pink-600 hover:to-rose-600 flex items-center justify-center gap-2 font-medium text-lg shadow-lg hover:shadow-xl transition-all duration-200 mx-auto transform hover:scale-105"
          >
            Unwrap Birthday Surprise
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex justify-center gap-2 text-pink-400"
        >
          <Sparkles className="w-5 h-5 animate-pulse" />
          <Sparkles className="w-5 h-5 animate-pulse delay-300" />
          <Sparkles className="w-5 h-5 animate-pulse delay-700" />
        </motion.div>
      </motion.div>
    </div>
  );
}