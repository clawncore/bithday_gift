import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { HeroGiftBox } from "@/components/HeroGiftBox";
import { ApologyCard } from "@/components/ApologyCard";
import { MediaGallery } from "@/components/MediaGallery";
import { AskSection } from "@/components/AskSection";
import { LockoutScreen } from "@/components/LockoutScreen";
import { AudioControls } from "@/components/AudioControls";
import { ReduceMotionToggle } from "@/components/ReduceMotionToggle";
import { BirthdayMessageCard } from "@/components/BirthdayMessageCard";
import { ClaimResponse } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Loader2, Sparkles, Flower } from "lucide-react";
import { FallingElements } from "@/components/FallingElements";

export default function GiftPage() {
  const [, navigate] = useLocation();
  const [unwrapped, setUnwrapped] = useState(false);
  const [scrolledPastHero, setScrolledPastHero] = useState(false);

  const urlParams = new URLSearchParams(window.location.search);
  const secretWord = urlParams.get("word");

  useEffect(() => {
    if (!secretWord) {
      navigate("/");
    }

    // Try to unmute audio when the page loads
    const unmuteAudio = () => {
      const audioElement = document.querySelector('audio');
      if (audioElement) {
        audioElement.muted = false;
      }
    };

    // Small delay to ensure DOM is ready
    const timer = setTimeout(unmuteAudio, 1000);
    return () => clearTimeout(timer);
  }, [secretWord, navigate]);

  const { data: claimData, isLoading, error } = useQuery<ClaimResponse>({
    queryKey: ["/api/claim", secretWord],
    queryFn: async () => {
      const response = await apiRequest("GET", `/api/claim?word=${encodeURIComponent(secretWord || "")}`);
      return response.json();
    },
    enabled: !!secretWord,
    retry: false,
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolledPastHero(window.scrollY > window.innerHeight * 0.8);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleUnwrap = () => {
    setUnwrapped(true);
    setTimeout(() => {
      window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
    }, 1000);
  };

  const handleReply = async (choice: "yes" | "need_time", message?: string) => {
    try {
      await apiRequest("POST", "/api/reply", {
        choice,
        message: message || "",
      });
    } catch (err) {
      console.error("Failed to send reply:", err);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-pink-100 via-pink-50 to-rose-100">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <Loader2 className="w-16 h-16 animate-spin text-pink-500 mx-auto mb-4" />
          <p className="text-lg text-pink-600">Preparing your birthday surprise...</p>
          <motion.div
            className="flex justify-center gap-2 mt-4"
            animate={{
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Flower className="w-6 h-6 text-pink-400" />
            <Sparkles className="w-6 h-6 text-yellow-400" />
            <Flower className="w-6 h-6 text-rose-400" />
          </motion.div>
        </motion.div>
      </div>
    );
  }

  if (error || !claimData?.ok) {
    // Remove the expiration check and message
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-pink-100 via-pink-50 to-rose-100 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <p className="text-xl text-rose-600 mb-4">Gift not found</p>
          <p className="text-pink-600">
            This gift link may be invalid. Please check the link and try again.
          </p>
        </motion.div>
      </div>
    );
  }

  const content = claimData.content!;

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 via-pink-50 to-rose-100">
      {/* Show falling elements when gift is unwrapped */}
      {unwrapped && <FallingElements duration={15000} elementCount={50} />}

      <HeroGiftBox onUnwrap={handleUnwrap} unwrapped={unwrapped} />

      <AnimatePresence>
        {(unwrapped || scrolledPastHero) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {/* Birthday Message Card - appears after unwrapping */}
            <section className="py-12 px-4 flex justify-center">
              <BirthdayMessageCard />
            </section>

            {/* Timeline of memories */}
            {content.media && content.media.length > 0 && (
              <MediaGallery items={content.media} />
            )}

            {/* Personal messages with apologies */}
            <section className="py-16 md:py-24 px-4">
              <div className="max-w-3xl mx-auto space-y-12">
                <div className="text-center mb-16">
                  <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6 text-pink-700">
                    Messages from Your Friends
                  </h2>
                  <p className="text-lg text-pink-600">
                    With heartfelt apologies and warm birthday wishes
                  </p>
                </div>

                <ApologyCard
                  name="Craig"
                  shortMessage={content.craigApology.shortMessage}
                  fullMessage={content.craigApology.fullMessage}
                  photoUrl={content.craigApology.photoUrl}
                  index={0}
                />

                <ApologyCard
                  name="Simbisai"
                  shortMessage={content.simbisaiApology.shortMessage}
                  fullMessage={content.simbisaiApology.fullMessage}
                  photoUrl={content.simbisaiApology.photoUrl}
                  index={1}
                />
              </div>
            </section>

            <AskSection onReply={handleReply} />

            <footer className="py-12 text-center text-pink-600 border-t border-pink-200 bg-white/30 backdrop-blur-sm">
              <p className="text-lg font-medium">Made with love for {content.recipientName} 💖</p>
              <p className="text-sm mt-2">Happy Birthday! May all your dreams come true! 🎈</p>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>

      <AudioControls />
      <ReduceMotionToggle />
    </div>
  );
}